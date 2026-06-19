#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const { Supadata, SupadataError } = require("@supadata/js");
require("dotenv").config();

const OUTPUT_DIR = path.join(__dirname, "..", "research", "youtube-transcripts");
const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 20;

function usage() {
  console.error(
    "Usage: node scripts/fetch-youtube-transcript.js <youtube-url> <output-filename.md>"
  );
}

function getOutputPath(filename) {
  const safeName = path.basename(filename);
  const markdownName = safeName.toLowerCase().endsWith(".md")
    ? safeName
    : `${safeName}.md`;

  return path.join(OUTPUT_DIR, markdownName);
}

function formatTimestamp(seconds) {
  const totalSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return [hours, minutes, secs]
      .map((part) => String(part).padStart(2, "0"))
      .join(":");
  }

  return [minutes, secs].map((part) => String(part).padStart(2, "0")).join(":");
}

function transcriptToMarkdown(transcript) {
  if (!transcript || transcript.content == null) {
    throw new Error("The API response did not include transcript content.");
  }

  if (typeof transcript.content === "string") {
    return transcript.content.trim();
  }

  if (Array.isArray(transcript.content)) {
    return transcript.content
      .map((chunk) => `[${formatTimestamp(chunk.offset)}] ${chunk.text}`)
      .join("\n")
      .trim();
  }

  throw new Error("The API returned transcript content in an unknown format.");
}

async function waitForTranscript(supadata, jobId) {
  for (let attempt = 1; attempt <= MAX_POLL_ATTEMPTS; attempt += 1) {
    const job = await supadata.transcript.getJobStatus(jobId);

    if (job.status === "completed") {
      if (!job.result) {
        throw new Error("Transcript job completed without a result.");
      }

      return job.result;
    }

    if (job.status === "failed") {
      const message = job.error?.message || "Transcript job failed.";
      const details = job.error?.details ? ` ${job.error.details}` : "";
      throw new Error(`${message}${details}`);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }

  throw new Error("Transcript job did not complete before the polling timeout.");
}

async function main() {
  const [youtubeUrl, outputFilename] = process.argv.slice(2);

  if (!youtubeUrl || !outputFilename) {
    usage();
    process.exitCode = 1;
    return;
  }

  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) {
    console.error("Missing SUPADATA_API_KEY in .env.");
    process.exitCode = 1;
    return;
  }

  const supadata = new Supadata({ apiKey });
  const result = await supadata.transcript({
    url: youtubeUrl,
    text: true,
    mode: "auto",
  });

  const transcript = "jobId" in result ? await waitForTranscript(supadata, result.jobId) : result;
  const body = transcriptToMarkdown(transcript);
  const outputPath = getOutputPath(outputFilename);
  const markdown = `# YouTube Transcript\n\nSource: ${youtubeUrl}\n\n## Transcript\n\n${body}\n`;

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(outputPath, markdown, "utf8");

  console.log(`Saved transcript to ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((error) => {
  if (error instanceof SupadataError) {
    console.error(`Supadata API error: ${error.message}`);
    if (error.details) {
      console.error(error.details);
    }
  } else {
    console.error(error.message || "Unexpected error while fetching transcript.");
  }

  process.exitCode = 1;
});

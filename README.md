# AI-Powered SEO Content Production Research

## Overview

This repository is a research project about **AI-powered SEO content production**.

The purpose is to study how experienced SEO practitioners, content strategists, and SaaS marketing leaders are adapting content workflows for AI search, generative engines, large language models, changing search behavior, and new visibility metrics.

The research corpus currently includes:

* 10 YouTube transcript files in [`research/youtube-transcripts/`](research/youtube-transcripts/)
* 10 LinkedIn post files in [`research/linkedin-posts/`](research/linkedin-posts/)
* A source index and expert rationale in [`research/sources.md`](research/sources.md)

## Selected Experts

The 10 experts were selected because the existing source index identifies them as practitioners with practical experience, original research, technical knowledge, and direct involvement in SEO or content operations.

1. **Aleyda Solís** - Chosen for practical frameworks and technical guidance on international SEO, AI search visibility, content discoverability, and crawling.
2. **Kevin Indig** - Chosen for research-driven analysis of organic growth, AI search, content strategy, automation, and changing user behavior.
3. **Michael “Mike” King** - Chosen for work connecting technical SEO, content strategy, search measurement, machine learning, and relevance engineering.
4. **Lily Ray** - Chosen for research on Google search changes, AI-generated search experiences, content quality, brand authority, trust, and visibility.
5. **Ross Hudgens** - Chosen for experience building scalable SEO content operations and content-led growth strategies.
6. **Steve Toth** - Chosen for practical SEO experiments, repeatable workflows, content optimization techniques, and AI-assisted processes.
7. **Bernard Huang** - Chosen for work on content optimization, search intent, topical authority, content quality, and AI-assisted SEO workflows.
8. **Patrick Stox** - Chosen for data-driven research on technical SEO, AI search visibility, generative search, crawling, indexing, and performance.
9. **Ryan Law** - Chosen for experience managing SEO content operations and researching how AI changes content marketing, search traffic, and strategy.
10. **Tim Soulo** - Chosen for experience building an SEO-driven content engine and analyzing the business impact of search, AI, content marketing, and product-led growth.

## Methodology

The project uses the existing files as its source of truth:

* YouTube transcripts were collected through the Supadata API using the reusable Node.js script at [`scripts/fetch-youtube-transcript.js`](scripts/fetch-youtube-transcript.js).
* LinkedIn posts were manually collected from public posts and organized by author in [`research/linkedin-posts/`](research/linkedin-posts/).
* Expert selection, source links, publication details, collection methods, and annotations are documented in [`research/sources.md`](research/sources.md).
* Each expert currently has one YouTube transcript file and one LinkedIn post file represented in the research folders.

## Main Research Themes

Across the collected sources, the research repeatedly returns to these themes:

* AI search visibility depends on traditional SEO foundations, but also on citations, brand mentions, retrievable information, and presence across multiple platforms.
* Content production is shifting from manually writing every word toward designing workflows, research inputs, brand guidance, editorial review, and quality control systems.
* Technical SEO still matters because AI crawlers, retrieval systems, structured content, crawlability, and indexability affect whether content can be found and used.
* Website traffic is becoming a less complete measure of SEO value; brand visibility, influence, citations, answer inclusion, and pipeline impact are also important.
* Human judgment remains central for strategy, differentiation, source quality, originality, and deciding when AI should or should not be used.

## Repository Structure

```text
.
|-- README.md
|-- package.json
|-- package-lock.json
|-- scripts/
|   `-- fetch-youtube-transcript.js
`-- research/
    |-- sources.md
    |-- youtube-transcripts/
    |   |-- 10 transcript .md files
    `-- linkedin-posts/
        `-- 10 author .md files
```

Key links:

* [`research/sources.md`](research/sources.md)
* [`research/youtube-transcripts/`](research/youtube-transcripts/)
* [`research/linkedin-posts/`](research/linkedin-posts/)
* [`scripts/fetch-youtube-transcript.js`](scripts/fetch-youtube-transcript.js)

## Running the YouTube Transcript Script

Install dependencies if needed:

```bash
npm install
```

Create a local `.env` file with a Supadata API key placeholder:

```text
SUPADATA_API_KEY=YOUR_SUPADATA_API_KEY
```

Run the transcript script with a YouTube URL and output filename:

```bash
node scripts/fetch-youtube-transcript.js "https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID" "expert-topic.md"
```

The script writes the transcript into `research/youtube-transcripts/`.

`.env` is ignored by Git through [`.gitignore`](.gitignore), and API keys are not committed to the repository.

## Original Tooling Setup

This repository began as a 100Hires portfolio setup project. The original setup documented installing and using:

* Cursor IDE
* Claude Code extension/add-on in Cursor
* Codex extension/add-on in Cursor
* Git
* GitHub

The initial setup included creating a public GitHub repository, cloning it locally, opening it in Cursor, documenting the setup process, committing the README, and pushing it to GitHub.

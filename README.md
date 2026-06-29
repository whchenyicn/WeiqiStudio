# Weiqi SEO Starter Site

A lightweight Next.js starter website for a beginner-friendly Weiqi learning and SEO content site.

## What is included

- Homepage
- Article listing page
- Dynamic article pages from Markdown
- 5 starter articles
- SEO metadata
- JSON-LD Article schema
- Sitemap
- Robots.txt
- Related articles sidebar
- Ad placeholder blocks
- TailwindCSS styling

## How to run

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## How to add articles

Add a new Markdown file inside:

```bash
content/articles
```

Use this format:

```md
---
title: "Your Article Title"
description: "Your SEO meta description."
category: "Rules"
date: "2026-06-29"
---

Your article content here.
```

## Important before publishing

Replace `https://example.com` in:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

with your real domain when you buy one.

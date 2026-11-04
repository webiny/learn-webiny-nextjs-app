# Learn Webiny Next.js app

The companion app for the Headless CMS part of the [Learn Webiny course](https://webiny.com/learn). You clone this repository at the start of the "Learn Webiny Next.js App" lesson and add code to it in the lessons that follow.

The `main` branch is the starting point. It has a Next.js 16 app with TypeScript, Tailwind CSS 4 and `@webiny/sdk` installed, and nothing else. The lessons tell you which files to create.

## Prerequisites

- Node.js 20.9 or higher
- npm
- A Webiny 6.5 project with a few published `product` entries (from the earlier course lessons)

## Getting started

```bash
git clone https://github.com/webiny/learn-webiny-nextjs-app.git learn-webiny-nextjs-app
cd learn-webiny-nextjs-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see an "Our Products" heading.

Then copy the environment file and fill in your API endpoint and token, as described in the lesson:

```bash
cp .env.local.example .env.local
```

## Lessons and branches

| Lesson | What you add | Finished code |
| --- | --- | --- |
| [Learn Webiny Next.js App](https://webiny.com/learn/lessons/headless-cms/learn-webiny-nextjs-app) | `.env.local`, `lib/webiny.ts` | included in `reading-data-completed` |
| [Reading Data](https://webiny.com/learn/lessons/headless-cms/reading-data) | `lib/types.ts`, product list in `app/page.tsx` | [`reading-data-completed`](https://github.com/webiny/learn-webiny-nextjs-app/tree/reading-data-completed) |
| [Writing Data](https://webiny.com/learn/lessons/headless-cms/writing-data) | `ContactSubmission` type, `app/actions/submitContact.ts`, `app/contact/page.tsx` | [`writing-data-completed`](https://github.com/webiny/learn-webiny-nextjs-app/tree/writing-data-completed) |

Each `*-completed` branch contains the code from that lesson and every lesson before it. If you get stuck, compare your files with the branch, or check it out and add your own `.env.local`.

## Project structure

```
learn-webiny-nextjs-app/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage, you replace it in the Reading Data lesson
│   ├── globals.css      # Tailwind styles
│   └── favicon.ico
├── lib/                 # Empty, the lessons add files here
├── .env.local.example   # Environment variable template
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Environment variables

| Variable | Description |
| --- | --- |
| `WEBINY_API_ENDPOINT` | Base URL of your Webiny API, for example `https://d1ud9w3i9i7d77.cloudfront.net` |
| `WEBINY_API_TOKEN` | Token of the API key you create in the lesson |
| `WEBINY_API_TENANT` | Optional. Tenant ID, defaults to `root` |

Never commit `.env.local`. It is already listed in `.gitignore`.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- `@webiny/sdk` 6.5

## Help

- [Webiny docs](https://www.webiny.com/docs)
- [Webiny community Slack](https://www.webiny.com/slack)

## License

MIT

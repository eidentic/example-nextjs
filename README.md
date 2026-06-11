# Eidentic × Next.js — memory-backed chat

A minimal Next.js App Router chat application that uses Eidentic's persistent memory and session store to give the agent context across the entire conversation — and across server restarts. Messages are stored in a local SQLite database via `@eidentic/libsql`, so the agent genuinely remembers what you talked about.

## Prerequisites

- Node.js 18+
- An [OpenAI](https://platform.openai.com/api-keys) API key (or swap for any [AI SDK](https://sdk.vercel.ai/providers/ai-sdk-providers) provider — see below)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Add your API key
cp .env.example .env
# then edit .env and set OPENAI_API_KEY=sk-...

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:3000
```

## How it works

- **`withEidentic` route handler** — `app/api/chat/route.ts` wraps the agent in a single line, producing a streaming POST endpoint that speaks the AI SDK UI wire protocol.
- **`LibsqlStore` persistence** — every turn (user message, assistant reply, memory blocks) is persisted to `eidentic.db`. The agent automatically loads and consolidates memory on each run, so context survives restarts.
- **`useChat` client** — `app/page.tsx` uses the `useChat` hook from `@ai-sdk/react` to stream tokens in real time and render the conversation.

## Swap the AI provider

Any [AI SDK provider](https://sdk.vercel.ai/providers/ai-sdk-providers) works. Edit `lib/agent.ts`:

```ts
// Swap these two lines — everything else stays the same
import { anthropic } from "@ai-sdk/anthropic";
model: new AIModel(anthropic("claude-3-5-haiku-20241022")),
```

Then update your `.env` (`ANTHROPIC_API_KEY=`, etc.).

## Learn more

- GitHub: https://github.com/eidentic/eidentic
- Docs: https://docs.eidentic.dev

## License

Apache-2.0

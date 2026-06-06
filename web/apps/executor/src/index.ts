import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { runGo, checkGoAvailable } from './runners/go.ts';
import { runNode } from './runners/node.ts';
import type { RunRequest } from './runners/types.ts';

const app = new Hono();

app.use('/*', cors());

app.get('/api/health', async (c) => {
  const go = await checkGoAvailable();
  return c.json({
    ok: true,
    go,
    node: { ok: true, runtime: process.version },
  });
});

app.post('/api/run/go', async (c) => {
  const body = (await c.req.json()) as RunRequest;
  if (!body.lessonId || !body.entry || !body.files) {
    return c.json({ error: '缺少 lessonId、entry 或 files' }, 400);
  }
  const result = await runGo(body);
  return c.json(result);
});

app.post('/api/run/node', async (c) => {
  const body = (await c.req.json()) as RunRequest;
  if (!body.lessonId || !body.entry || !body.files) {
    return c.json({ error: '缺少 lessonId、entry 或 files' }, 400);
  }
  const result = await runNode(body);
  return c.json(result);
});

const port = Number(process.env.EXECUTOR_PORT ?? 3001);

serve({ fetch: app.fetch, port }, () => {
  console.log(`executor running at http://localhost:${port}`);
});

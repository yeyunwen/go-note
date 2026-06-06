import type { HealthResponse, RunResult } from './types.ts';

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch('/api/health');
  if (!res.ok) {
    throw new Error('executor 不可用，请确认已运行 pnpm dev');
  }
  return res.json() as Promise<HealthResponse>;
}

export async function runGo(payload: {
  lessonId: string;
  entry: string;
  files: Record<string, string>;
}): Promise<RunResult> {
  const res = await fetch('/api/run/go', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Go 运行失败');
  }
  return res.json() as Promise<RunResult>;
}

export async function runNode(payload: {
  lessonId: string;
  entry: string;
  files: Record<string, string>;
}): Promise<RunResult> {
  const res = await fetch('/api/run/node', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Node 运行失败');
  }
  return res.json() as Promise<RunResult>;
}

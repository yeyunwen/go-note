import { mkdir, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import type { RunRequest, RunResult } from './types.ts';

const TIMEOUT_MS = 5000;

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../../..');

function runCommand(
  cmd: string,
  args: string[],
  cwd: string,
  timeoutMs: number,
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, env: process.env });
    let stdout = '';
    let stderr = '';
    let killed = false;

    const timer = setTimeout(() => {
      killed = true;
      child.kill('SIGKILL');
    }, timeoutMs);

    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      if (killed) {
        stderr += `\n[executor] 超时（${timeoutMs}ms）已终止进程`;
      }
      resolve({ stdout, stderr, exitCode: killed ? 124 : (code ?? 1) });
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ stdout, stderr: stderr + err.message, exitCode: 1 });
    });
  });
}

async function writeFiles(baseDir: string, files: Record<string, string>): Promise<void> {
  for (const [relPath, content] of Object.entries(files)) {
    const full = join(baseDir, relPath);
    await mkdir(dirname(full), { recursive: true });
    await writeFile(full, content, 'utf-8');
  }
}

export async function runNode(req: RunRequest): Promise<RunResult> {
  const started = Date.now();
  const workRoot = join(tmpdir(), `go-note-node-${Date.now()}-${Math.random().toString(36).slice(2)}`);

  try {
    await mkdir(workRoot, { recursive: true });
    const lessonDir = join(workRoot, req.lessonId);
    await writeFiles(lessonDir, req.files);

    const entryPath = join(lessonDir, req.entry);
    const result = await runCommand('pnpm', ['exec', 'tsx', entryPath], repoRoot, TIMEOUT_MS);

    return {
      ...result,
      durationMs: Date.now() - started,
    };
  } finally {
    await rm(workRoot, { recursive: true, force: true });
  }
}

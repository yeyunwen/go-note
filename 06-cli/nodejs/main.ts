// Go: flag 包 + net/http；Node 用 process.argv 解析参数 + fetch 调 GitHub API

import { execSync } from 'node:child_process';

interface Commit {
  sha: string;
  commit: {
    committer: { date: string };
    message: string;
  };
  html_url: string;
}

function resolveToken(explicit: string): string {
  if (explicit) return explicit;
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  try {
    return execSync('gh auth token', { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

function parseArgs(argv: string[]): { repo: string; token: string; json: boolean } {
  let repo = 'facebook/react';
  let token = '';
  let json = false;

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json' || arg === '-json') {
      json = true;
      continue;
    }
    if (arg === '--repo' || arg === '-repo') {
      repo = argv[++i] ?? repo;
      continue;
    }
    if (arg.startsWith('--repo=')) {
      repo = arg.slice('--repo='.length);
      continue;
    }
    if (arg === '--token' || arg === '-token') {
      token = argv[++i] ?? token;
      continue;
    }
    if (arg.startsWith('--token=')) {
      token = arg.slice('--token='.length);
    }
  }

  return { repo, token, json };
}

async function githubGet(url: string, token: string): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'go-note-first-commit',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(url, { headers });
}

async function lastCommitPage(repo: string, token: string): Promise<number> {
  const resp = await githubGet(`https://api.github.com/repos/${repo}/commits?per_page=1`, token);
  if (!resp.ok) {
    throw apiError(resp.status, await resp.text());
  }

  const link = resp.headers.get('link') ?? '';
  const match = link.match(/page=(\d+)>; rel="last"/);
  return match ? Number(match[1]) : 1;
}

async function fetchCommits(repo: string, page: number, token: string): Promise<Commit[]> {
  const resp = await githubGet(
    `https://api.github.com/repos/${repo}/commits?per_page=1&page=${page}`,
    token,
  );
  if (!resp.ok) {
    throw apiError(resp.status, await resp.text());
  }
  return (await resp.json()) as Commit[];
}

function apiError(status: number, body: string): Error {
  const msg = body.slice(0, 512);
  if (status === 403 && msg.toLowerCase().includes('rate limit')) {
    return new Error(`github api 限流（未认证 IP 每小时约 60 次）

请任选其一后再试：
  export GITHUB_TOKEN=$(gh auth token)
  pnpm run 06 -- --token <你的 token>

原始响应: ${msg}`);
  }
  return new Error(`github api: ${status} — ${msg}`);
}

async function firstCommit(repo: string, token: string): Promise<Commit> {
  const page = await lastCommitPage(repo, token);
  const commits = await fetchCommits(repo, page, token);
  if (commits.length === 0) {
    throw new Error(`仓库 ${repo} 没有 commit`);
  }
  return commits[0];
}

function firstLine(s: string): string {
  const i = s.indexOf('\n');
  return i >= 0 ? s.slice(0, i) : s;
}

async function main(): Promise<void> {
  const { repo, token: tokenFlag, json } = parseArgs(process.argv);
  const token = resolveToken(tokenFlag);

  if (!repo.includes('/')) {
    console.error('错误: --repo 必须是 owner/name 格式，例如 facebook/react');
    process.exit(1);
  }

  try {
    const commit = await firstCommit(repo, token);
    const payload = {
      repo,
      date: commit.commit.committer.date,
      sha: commit.sha,
      message: firstLine(commit.commit.message),
      url: commit.html_url,
    };

    if (json) {
      console.log(JSON.stringify(payload, null, 2));
      return;
    }

    console.log(`repo:    ${payload.repo}`);
    console.log(`date:    ${payload.date}`);
    console.log(`sha:     ${payload.sha}`);
    console.log(`message: ${payload.message}`);
    console.log(`url:     ${payload.url}`);
  } catch (err) {
    console.error('错误:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();

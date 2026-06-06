import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { curriculum, type LessonMeta } from '../content/curriculum.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '../..');
const webRoot = join(__dirname, '..');
const outPath = join(webRoot, 'content/lessons.json');

interface FileTree {
  [path: string]: string;
}

interface LessonPayload {
  id: string;
  title: string;
  status: LessonMeta['status'];
  runMode: LessonMeta['runMode'];
  nestHint: string;
  todoDescription?: string;
  go: {
    entry: string;
    files: FileTree;
    demo?: { entry: string; files: FileTree };
  };
  node: {
    entry: string;
    files: FileTree;
    demo?: { entry: string; files: FileTree };
  };
}

function readLessonFile(lessonId: string, relativePath: string): string {
  const full = join(repoRoot, lessonId, relativePath);
  if (!existsSync(full)) {
    throw new Error(`Missing file: ${full}`);
  }
  return readFileSync(full, 'utf-8');
}

function readSnippet(name: string): string {
  const full = join(webRoot, 'content/snippets', name);
  return readFileSync(full, 'utf-8');
}

function collectGoFiles(meta: LessonMeta): FileTree {
  const files: FileTree = {};
  files[meta.goEntry] = readLessonFile(meta.id, meta.goEntry);
  for (const extra of meta.extraGoFiles ?? []) {
    files[extra] = readLessonFile(meta.id, extra);
  }
  return files;
}

function collectNodeFiles(meta: LessonMeta): FileTree {
  const files: FileTree = {};
  if (existsSync(join(repoRoot, meta.id, meta.nodeEntry))) {
    files[meta.nodeEntry] = readLessonFile(meta.id, meta.nodeEntry);
  }
  for (const extra of meta.extraNodeFiles ?? []) {
    files[extra] = readLessonFile(meta.id, extra);
  }
  return files;
}

const lessons: LessonPayload[] = curriculum.map((meta) => {
  const lesson: LessonPayload = {
    id: meta.id,
    title: meta.title,
    status: meta.status,
    runMode: meta.runMode,
    nestHint: meta.nestHint,
    todoDescription: meta.todoDescription,
    go: {
      entry: meta.goEntry,
      files: meta.status === 'ready' ? collectGoFiles(meta) : {},
    },
    node: {
      entry: meta.nodeEntry,
      files: meta.status === 'ready' ? collectNodeFiles(meta) : {},
    },
  };

  if (meta.runMode === 'server-demo') {
    lesson.go.demo = {
      entry: 'main.go',
      files: { 'main.go': readSnippet('01-http-demo.go') },
    };
    lesson.node.demo = {
      entry: 'main.ts',
      files: { 'main.ts': readSnippet('01-http-demo.ts') },
    };
  }

  return lesson;
});

writeFileSync(outPath, JSON.stringify({ lessons }, null, 2) + '\n', 'utf-8');
console.log(`Synced ${lessons.length} lessons -> ${outPath}`);

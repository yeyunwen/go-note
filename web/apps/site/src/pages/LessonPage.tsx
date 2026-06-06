import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHealth, runGo, runNode } from '../api.ts';
import { DualEditor, getInitialCode, type CodeVariant } from '../components/DualEditor.tsx';
import { GoLogo } from '../components/logos/GoLogo.tsx';
import { NodeLogo } from '../components/logos/NodeLogo.tsx';
import { NestCompare } from '../components/NestCompare.tsx';
import { OutputPanel } from '../components/OutputPanel.tsx';
import type { HealthResponse, Lesson, RunResult } from '../types.ts';

interface LessonPageProps {
  lessons: Lesson[];
}

function buildRunPayload(
  lesson: Lesson,
  lang: 'go' | 'node',
  variant: CodeVariant,
  editedEntry: string,
): { lessonId: string; entry: string; files: Record<string, string> } {
  const bundle = lang === 'go' ? lesson.go : lesson.node;
  const active = variant === 'demo' && bundle.demo ? bundle.demo : bundle;
  const files = { ...active.files };
  files[active.entry] = editedEntry;
  return { lessonId: lesson.id, entry: active.entry, files };
}

export function LessonPage({ lessons }: LessonPageProps) {
  const { id } = useParams<{ id: string }>();
  const lesson = lessons.find((l) => l.id === id);

  const [variant, setVariant] = useState<CodeVariant>(
    lesson?.runMode === 'server-demo' ? 'demo' : 'full',
  );
  const [goCode, setGoCode] = useState('');
  const [nodeCode, setNodeCode] = useState('');
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<HealthResponse | null>(null);

  const runnable = lesson?.runMode !== 'coming-soon';
  const readOnly = !runnable;

  const resetCodes = useCallback(() => {
    if (!lesson) return;
    setGoCode(getInitialCode(lesson, 'go', variant));
    setNodeCode(getInitialCode(lesson, 'node', variant));
    setResult(null);
    setError(null);
  }, [lesson, variant]);

  useEffect(() => {
    if (!lesson) return;
    setVariant(lesson.runMode === 'server-demo' ? 'demo' : 'full');
  }, [lesson?.id, lesson?.runMode]);

  useEffect(() => {
    resetCodes();
  }, [resetCodes]);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  const localHint = useMemo(() => {
    if (lesson?.runMode !== 'server-demo') return null;
    return '完整服务器版请在本地运行：go run ./01-http 或 pnpm run 01（监听 :8080）';
  }, [lesson?.runMode]);

  if (!lesson) {
    return <div className="p-8 text-slate-400">未找到课程：{id}</div>;
  }

  async function handleRun(lang: 'go' | 'node') {
    if (!lesson || !runnable) return;
    if (lang === 'go' && health && !health.go.ok) {
      setError(health.go.error ?? '本机未安装 Go，无法运行 Go 代码');
      return;
    }

    setRunning(true);
    setError(null);
    setResult(null);

    try {
      const payload = buildRunPayload(
        lesson,
        lang,
        variant,
        lang === 'go' ? goCode : nodeCode,
      );
      const res = lang === 'go' ? await runGo(payload) : await runNode(payload);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : '运行失败');
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-4 p-4 lg:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xs text-slate-500">{lesson.id}</div>
          <h2 className="text-xl font-semibold text-white">{lesson.title}</h2>
        </div>
        {lesson.runMode === 'server-demo' && (
          <div className="flex rounded-lg border border-slate-700/80 bg-slate-900/50 p-0.5 text-sm">
            <button
              type="button"
              onClick={() => setVariant('demo')}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                variant === 'demo'
                  ? 'bg-linear-to-r from-go/80 to-node/80 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              在线演示版
            </button>
            <button
              type="button"
              onClick={() => setVariant('full')}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                variant === 'full'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              完整服务器版
            </button>
          </div>
        )}
      </header>

      {lesson.todoDescription && (
        <div className="rounded-lg border border-amber-800/60 bg-amber-950/30 px-4 py-3 text-sm text-amber-100">
          {lesson.todoDescription}
        </div>
      )}

      {localHint && variant === 'full' && (
        <div className="rounded-lg border border-slate-700/80 bg-slate-900/40 px-4 py-3 text-sm text-slate-400">
          {localHint}
        </div>
      )}

      <NestCompare hint={lesson.nestHint} />

      <DualEditor
        lesson={lesson}
        variant={variant}
        goCode={goCode}
        nodeCode={nodeCode}
        onGoChange={setGoCode}
        onNodeChange={setNodeCode}
        readOnly={readOnly || (lesson.runMode === 'server-demo' && variant === 'full')}
      />

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!runnable || running || (lesson.runMode === 'server-demo' && variant === 'full')}
          onClick={() => handleRun('go')}
          className="inline-flex items-center gap-2 rounded-md bg-go px-4 py-2 text-sm font-medium text-white shadow-[0_0_16px_rgba(0,173,216,0.25)] hover:bg-go-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <GoLogo size={16} variant="mono" className="text-white" />
          运行 Go
        </button>
        <button
          type="button"
          disabled={!runnable || running || (lesson.runMode === 'server-demo' && variant === 'full')}
          onClick={() => handleRun('node')}
          className="inline-flex items-center gap-2 rounded-md bg-node px-4 py-2 text-sm font-medium text-white shadow-[0_0_16px_rgba(95,160,78,0.25)] hover:bg-node-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <NodeLogo size={16} variant="mono" className="text-white" />
          运行 Node
        </button>
        <button
          type="button"
          disabled={readOnly}
          onClick={resetCodes}
          className="rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          重置代码
        </button>
        {health && !health.go.ok && (
          <span className="text-xs text-amber-400">Go 不可用：{health.go.error}</span>
        )}
      </div>

      <OutputPanel result={result} running={running} error={error} />
    </div>
  );
}

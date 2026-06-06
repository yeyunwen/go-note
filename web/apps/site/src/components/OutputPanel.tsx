import type { RunResult } from '../types.ts';

interface OutputPanelProps {
  result: RunResult | null;
  running: boolean;
  error: string | null;
}

export function OutputPanel({ result, running, error }: OutputPanelProps) {
  const text = error
    ? error
    : result
      ? [result.stdout, result.stderr].filter(Boolean).join('\n') || '(无输出)'
      : running
        ? '运行中…'
        : '点击「运行 Go」或「运行 Node」查看输出';

  const ok = result ? result.exitCode === 0 : !error;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-700/80">
      <div className="flex items-center justify-between border-b border-slate-700/80 bg-slate-900 px-3 py-2">
        <span className="text-xs text-slate-400">输出</span>
        {result && (
          <span
            className={`text-xs ${ok ? 'text-emerald-400' : 'text-rose-400'}`}
          >
            exit {result.exitCode} · {result.durationMs}ms
          </span>
        )}
      </div>
      <pre
        className={`max-h-48 overflow-auto p-3 font-mono text-xs leading-relaxed ${
          error ? 'text-rose-300' : 'text-slate-300'
        }`}
      >
        {text}
      </pre>
    </div>
  );
}

import Editor from '@monaco-editor/react';
import { GoLogo } from './logos/GoLogo.tsx';
import { NodeLogo } from './logos/NodeLogo.tsx';
import type { Lesson } from '../types.ts';

export type CodeVariant = 'full' | 'demo';

interface DualEditorProps {
  lesson: Lesson;
  variant: CodeVariant;
  goCode: string;
  nodeCode: string;
  onGoChange: (value: string) => void;
  onNodeChange: (value: string) => void;
  readOnly: boolean;
}

function getDisplayCode(
  lesson: Lesson,
  lang: 'go' | 'node',
  variant: CodeVariant,
): { code: string; path: string } {
  const bundle = lang === 'go' ? lesson.go : lesson.node;
  const active = variant === 'demo' && bundle.demo ? bundle.demo : bundle;
  const entry = active.entry;
  return { code: active.files[entry] ?? '', path: entry };
}

export function DualEditor({
  lesson,
  variant,
  goCode,
  nodeCode,
  onGoChange,
  onNodeChange,
  readOnly,
}: DualEditorProps) {
  const goMeta = getDisplayCode(lesson, 'go', variant);
  const nodeMeta = getDisplayCode(lesson, 'node', variant);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-2">
      <div className="flex min-h-[320px] flex-col overflow-hidden rounded-lg border border-go/25 shadow-[inset_0_1px_0_rgba(0,173,216,0.12)]">
        <div className="flex items-center gap-2 border-b border-go/20 bg-go-muted px-3 py-2">
          <GoLogo size={18} />
          <span className="text-xs font-medium text-go">Go</span>
          <span className="text-slate-600">·</span>
          <span className="truncate font-mono text-xs text-slate-400">{goMeta.path}</span>
        </div>
        <Editor
          height="100%"
          language="go"
          theme="vs-dark"
          value={goCode || goMeta.code}
          onChange={(v) => onGoChange(v ?? '')}
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="flex min-h-[320px] flex-col overflow-hidden rounded-lg border border-node/25 shadow-[inset_0_1px_0_rgba(95,160,78,0.12)]">
        <div className="flex items-center gap-2 border-b border-node/20 bg-node-muted px-3 py-2">
          <NodeLogo size={18} />
          <span className="text-xs font-medium text-node">Node / TS</span>
          <span className="text-slate-600">·</span>
          <span className="truncate font-mono text-xs text-slate-400">{nodeMeta.path}</span>
        </div>
        <Editor
          height="100%"
          language="typescript"
          theme="vs-dark"
          value={nodeCode || nodeMeta.code}
          onChange={(v) => onNodeChange(v ?? '')}
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}

export function getInitialCode(
  lesson: Lesson,
  lang: 'go' | 'node',
  variant: CodeVariant,
): string {
  return getDisplayCode(lesson, lang, variant).code;
}

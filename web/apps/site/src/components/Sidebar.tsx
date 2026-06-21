import { NavLink } from 'react-router-dom';
import { BrandHeader } from './BrandHeader.tsx';
import type { Lesson } from '../types.ts';

interface SidebarProps {
  lessons: Lesson[];
}

export function Sidebar({ lessons }: SidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-700/80 bg-slate-950/90 backdrop-blur-sm">
      <BrandHeader />
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <NavLink
                to={`/lesson/${lesson.id}`}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'border-go/30 bg-go-muted text-go'
                      : 'border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 hover:text-white',
                  ].join(' ')
                }
              >
                <span className="font-mono text-xs text-slate-500">{lesson.id.split('-')[0]}</span>
                <span className="flex-1 truncate">{lesson.title}</span>
                {lesson.status === 'todo' && (
                  <span className="rounded bg-amber-900/60 px-1.5 py-0.5 text-[10px] text-amber-200">
                    待写
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-slate-700/80 p-4">
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="inline-block h-2 w-2 rounded-full bg-go" />
          <span>Go</span>
          <span className="text-slate-600">·</span>
          <span className="inline-block h-2 w-2 rounded-full bg-node" />
          <span>Node</span>
        </div>
        <p className="mt-1 text-xs text-slate-500">浏览代码 · 本地可运行</p>
      </div>
    </aside>
  );
}

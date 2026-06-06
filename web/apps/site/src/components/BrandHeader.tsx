import { GoLogo } from './logos/GoLogo.tsx';
import { NodeLogo } from './logos/NodeLogo.tsx';

export function BrandHeader() {
  return (
    <div className="border-b border-slate-700/80 px-4 py-5">
      <div className="flex items-center gap-2.5">
        <GoLogo size={28} className="shrink-0 shadow-[0_0_12px_rgba(0,173,216,0.35)]" />
        <span className="text-slate-500" aria-hidden>
          ↔
        </span>
        <NodeLogo size={28} className="shrink-0 shadow-[0_0_12px_rgba(95,160,78,0.35)]" />
      </div>
      <h1 className="mt-3 bg-linear-to-r from-go to-node bg-clip-text text-lg font-semibold text-transparent">
        Go-Note
      </h1>
      <p className="mt-1 text-xs text-slate-400">Go ↔ Node 交互式学习</p>
    </div>
  );
}

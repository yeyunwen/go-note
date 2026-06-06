interface NestCompareProps {
  hint: string;
}

export function NestCompare({ hint }: NestCompareProps) {
  return (
    <div className="rounded-lg border border-slate-700/80 bg-slate-900/50 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="rounded bg-[#e0234e]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#f56580]">
          NestJS
        </span>
        <span className="text-xs text-slate-500">对照备忘</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{hint}</p>
    </div>
  );
}

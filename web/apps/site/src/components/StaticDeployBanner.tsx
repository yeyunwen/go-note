import { isStaticDeploy } from '../env.ts';

export function StaticDeployBanner() {
  if (!isStaticDeploy) return null;

  return (
    <div className="border-b border-amber-800/50 bg-amber-950/40 px-4 py-2.5 text-sm text-amber-100">
      <span className="font-medium">GitHub Pages 静态预览</span>
      <span className="text-amber-200/80">
        {' '}
        — 可浏览与编辑代码；在线运行需本地执行{' '}
        <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">pnpm run web</code>
      </span>
    </div>
  );
}

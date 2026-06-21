import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.tsx';
import { StaticDeployBanner } from './StaticDeployBanner.tsx';
import type { Lesson } from '../types.ts';

interface LayoutProps {
  lessons: Lesson[];
}

export function Layout({ lessons }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar lessons={lessons} />
      <main className="flex min-h-screen flex-1 flex-col">
        <StaticDeployBanner />
        <Outlet />
      </main>
    </div>
  );
}

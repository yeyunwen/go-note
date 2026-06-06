export type RunMode = 'stdout' | 'server-demo' | 'coming-soon';
export type LessonStatus = 'ready' | 'todo';

export interface CodeBundle {
  entry: string;
  files: Record<string, string>;
  demo?: { entry: string; files: Record<string, string> };
}

export interface Lesson {
  id: string;
  title: string;
  status: LessonStatus;
  runMode: RunMode;
  nestHint: string;
  todoDescription?: string;
  go: CodeBundle;
  node: CodeBundle;
}

export interface LessonsData {
  lessons: Lesson[];
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
}

export interface HealthResponse {
  ok: boolean;
  go: { ok: boolean; version?: string; error?: string };
  node: { ok: boolean; runtime: string };
}

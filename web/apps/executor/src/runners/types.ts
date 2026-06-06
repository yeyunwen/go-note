export interface RunRequest {
  lessonId: string;
  entry: string;
  files: Record<string, string>;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
}

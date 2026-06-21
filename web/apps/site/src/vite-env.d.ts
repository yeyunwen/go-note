/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STATIC_ONLY?: string;
  readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

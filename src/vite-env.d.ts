/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAWG_API_KEY: string;
  readonly VITE_GAME_GRID_PREFETCH_ROWS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

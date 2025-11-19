/// <reference types="vite/client" />

interface ImportMetaGlob {
  [key: string]: () => Promise<any>
}

interface ImportMeta {
  glob(pattern: string): ImportMetaGlob
}
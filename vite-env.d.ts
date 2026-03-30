/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY_VERCEL_AI_GATEWAY: string;
    readonly VITE_API_KEY_MERRIAM_WEBSTER_THESAURUS: string;
    readonly VITE_API_KEY_MERRIAM_WEBSTER_DICTIONARY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

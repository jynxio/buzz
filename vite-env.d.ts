/// <reference types="vite/client" />
import './plugins/vite-plugin-shadow-dom.d';

interface ImportMetaEnv {
    readonly VITE_API_KEY_VERCEL_AI_GATEWAY: string;
    readonly VITE_API_KEY_MERRIAM_WEBSTER_THESAURUS: string;
    readonly VITE_API_KEY_MERRIAM_WEBSTER_DICTIONARY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

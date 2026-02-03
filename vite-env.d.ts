/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY_VERCEL_AI_GATEWAY: string;
    readonly VITE_API_KEY_MERRIAM_WEBSTER_THESAURUS: string;
    readonly VITE_API_KEY_MERRIAM_WEBSTER_DICTIONARY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

/**
 * Vite Plugin (CSS Modules)
 */
type CssModules = {
    readonly inline: string;
    readonly module: { readonly [key: string]: string };
};

declare module '*.module.css?inline&module' {
    const _: CssModules;
    export default _;
}

declare module '*.module.scss?inline&module' {
    const _: CssModules;
    export default _;
}

declare module '*.module.sass?inline&module' {
    const _: CssModules;
    export default _;
}

declare module '*.module.less?inline&module' {
    const _: CssModules;
    export default _;
}

declare module '*.module.styl?inline&module' {
    const _: CssModules;
    export default _;
}

declare module '*.module.stylus?inline&module' {
    const _: CssModules;
    export default _;
}

declare module '*.module.pcss?inline&module' {
    const _: CssModules;
    export default _;
}

declare module '*.module.sss?inline&module' {
    const _: CssModules;
    export default _;
}

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

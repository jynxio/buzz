declare module 'virtual:shadow-dom-css' {
    type CssStr = string;
    type Unsubscribe = () => void;
    type Subscribe = (listener: (css: Set<CssStr>) => void) => Unsubscribe;

    export const subscribe: Subscribe;
}

declare module '*.module.css?shadow' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

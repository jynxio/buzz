import { useEffect } from 'react';

const [getRoot, setRoot] = (() => {
    type RootStore = { reactRoot: HTMLElement; shadowRoot: ShadowRoot };

    const rootStore = {} as RootStore;

    return [getRoot, setRoot] as const;

    function setRoot(props?: Partial<RootStore>) {
        if (props?.reactRoot) rootStore.reactRoot = props.reactRoot;
        if (props?.shadowRoot) rootStore.shadowRoot = props.shadowRoot;
    }

    function getRoot() {
        return rootStore;
    }
})();

function adoptStyleSheets(cssText: string) {
    const sheet = new CSSStyleSheet();
    const shadowRoot = getRoot().shadowRoot;
    const abortController = new AbortController();

    sheet.replace(cssText).then(() => {
        if (abortController.signal.aborted) return;

        abortController.abort();
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
    });

    return clean;

    function clean() {
        if (!abortController.signal.aborted) return abortController.abort();

        shadowRoot.adoptedStyleSheets = shadowRoot.adoptedStyleSheets.filter(
            (item) => item !== sheet,
        );
    }
}

function useStyleSheets(cssText: string) {
    useEffect(() => adoptStyleSheets(cssText), [cssText]);
}

export { adoptStyleSheets, getRoot, setRoot, useStyleSheets };

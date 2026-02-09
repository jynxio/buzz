const [getShadowRoot, setShadowRoot] = (() => {
    let shadowRoot: ShadowRoot;

    const getShadowRoot = () => shadowRoot;
    const setShadowRoot = (i: ShadowRoot) => void (shadowRoot = i);

    return [getShadowRoot, setShadowRoot] as const;
})();

export { getShadowRoot, setShadowRoot };

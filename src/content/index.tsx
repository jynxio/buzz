import './_index.css?spy';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { on } from 'virtual:spy';
import { setShadowRoot } from './_helpers';
import { Translator } from './_translator';

const sheetMap = new Map<string, CSSStyleSheet>();
const host = document.body.appendChild(document.createElement('jynxio-buzz'));
const shadowRoot = host.attachShadow({ mode: 'closed' });
const reactRoot = shadowRoot.appendChild(document.createElement('div'));

reactRoot.id = 'root';
host.style.isolation = 'isolate';

on(onCssUpdated);
setShadowRoot(shadowRoot);

createRoot(reactRoot).render(
    <StrictMode>
        <Translator />
    </StrictMode>,
);

function onCssUpdated(cssMap: ReadonlyMap<string, string>) {
    const nextKeySet = new Set(cssMap.keys());
    const currKeySet = new Set(sheetMap.keys());

    const adoptedKeyset = nextKeySet.difference(currKeySet);
    const discardedKeySet = currKeySet.difference(nextKeySet);

    for (const key of discardedKeySet) sheetMap.delete(key);

    for (const key of adoptedKeyset) {
        const css = cssMap.get(key) ?? '';
        const sheet = new CSSStyleSheet();

        sheet.replace(css);
        sheetMap.set(key, sheet);
    }

    shadowRoot.adoptedStyleSheets = Array.from(sheetMap.values());
}

import css from './_index.css?inline';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { subscribe } from 'virtual:shadow-dom-css';
import { setShadowRoot } from './_helpers';
import { Translator } from './_translator';

const sheet = new CSSStyleSheet();
const host = document.body.appendChild(document.createElement('jynxio-buzz'));
const shadowRoot = host.attachShadow({ mode: 'closed' });
const reactRoot = shadowRoot.appendChild(document.createElement('div'));

reactRoot.id = 'root';
host.style.isolation = 'isolate';

sheet.replace(css);
setShadowRoot(shadowRoot);
shadowRoot.adoptedStyleSheets = [sheet];

createRoot(reactRoot).render(
    <StrictMode>
        <Translator />
    </StrictMode>,
);

subscribe((cssSet) => {
    console.log(cssSet);
});

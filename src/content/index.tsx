import { ToastCtx } from '@/content/_toast';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { adoptStyleSheets, setRoot } from './_helpers';
import css from './_index.module.css?inline&module';
import { Translator } from './translator';

const shadowRoot = document.body
    .appendChild(document.createElement('jynxio-buzz'))
    .attachShadow({ mode: 'closed' });
const reactRoot = shadowRoot.appendChild(document.createElement('div'));

setRoot({ reactRoot, shadowRoot });
adoptStyleSheets(css.inline);
reactRoot.classList.add(css.module['container'] ?? '');

createRoot(reactRoot).render(
    <StrictMode>
        <ToastCtx>
            <Translator />
        </ToastCtx>
    </StrictMode>,
);

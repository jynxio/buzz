import { subscribe } from 'virtual:shadow-dom-css';
import shadowClasses from './_shadow.module.css?shadow';

console.log('CSS Module classnames:', shadowClasses);

subscribe((cssSet) => {
    console.log('Shadow CSS updated, count:', cssSet.size);
    cssSet.forEach((css) => console.log('CSS:', css));
});

import './_index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './_app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

export default defineManifest({
    manifest_version: 3,
    name: pkg.name,
    version: pkg.version,
    action: {
        default_popup: 'src/popup/index.html',
    },
    permissions: ['sidePanel', 'contentSettings'],
    content_scripts: [
        {
            js: ['src/content/index.tsx'],
            matches: ['https://*/*'],
        },
    ],
    side_panel: {
        default_path: 'src/sidepanel/index.html',
    },
});

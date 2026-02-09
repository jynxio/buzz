import { init, parse } from 'es-module-lexer';
import { type ModuleNode, type Plugin } from 'vite';

const VIRTUAL_MODULE_ID = 'virtual:shadow-dom-css';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;
const SHADOW_CSS_RE = /\.module\.[^?]+\?shadow$/;

function viteShadowDom(): Plugin[] {
    const virtualModule: Plugin = {
        name: 'vite-shadow-dom:virtual',
        resolveId(id) {
            if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID;
            return undefined;
        },
        load(id) {
            if (id !== RESOLVED_VIRTUAL_MODULE_ID) return;

            return [
                `const registry = new Map();`,
                `const listeners = new Set();`,
                ``,
                `export function _register(id, css) {`,
                `    registry.set(id, css);`,
                `    notify();`,
                `}`,
                ``,
                `export function _unregister(id) {`,
                `    registry.delete(id);`,
                `    notify();`,
                `}`,
                ``,
                `function notify() {`,
                `    const snapshot = new Set(registry.values());`,
                `    listeners.forEach(fn => fn(snapshot));`,
                `}`,
                ``,
                `export function subscribe(listener) {`,
                `    listeners.add(listener);`,
                `    listener(new Set(registry.values()));`,
                `    return () => listeners.delete(listener);`,
                `}`,
            ].join('\n');
        },
    };

    const hmrModule: Plugin = {
        name: 'vite-shadow-dom:hmr',
        handleHotUpdate({ modules, server, timestamp }) {
            // Check if any of the affected modules is a ?shadow CSS module
            const shadowModules = modules.filter((mod) => SHADOW_CSS_RE.test(mod.id ?? ''));

            if (shadowModules.length === 0) return;

            // Invalidate and send HMR update only for ?shadow modules
            const invalidatedModules = new Set<ModuleNode>();
            for (const mod of shadowModules) {
                server.moduleGraph.invalidateModule(mod, invalidatedModules, timestamp, true);
            }

            server.ws.send({
                type: 'update',
                updates: shadowModules.map((mod) => ({
                    type: 'js-update' as const,
                    path: mod.url,
                    acceptedPath: mod.url,
                    timestamp,
                })),
            });

            // Return empty array to prevent default HMR behavior (which would
            // trigger a page reload for the base CSS module)
            return [];
        },
    };

    const transformModule: Plugin = {
        enforce: 'post',
        name: 'vite-shadow-dom:transform',
        transform: {
            filter: { id: SHADOW_CSS_RE },
            handler: async (code, id) => {
                await init;
                const [, exports] = parse(code);

                // Extract __vite__css value (the compiled CSS text)
                const cssMatch = code.match(/const __vite__css = ("(?:[^"\\]|\\.)*")/);
                const cssLiteral = cssMatch?.[1] ?? '""';

                // Extract "export const xxx = ..." and "export default {...}" statements
                const namedExports: string[] = [];
                const namedExportNames: string[] = [];

                for (const exp of exports) {
                    if (exp.n === 'default') continue;
                    // Find the full "export const <name> = <value>;" statement
                    const re = new RegExp(
                        `export\\s+const\\s+${exp.n}\\s*=\\s*"(?:[^"\\\\]|\\\\.)*"\\s*;?`,
                    );
                    const match = code.match(re);
                    if (match) {
                        namedExports.push(match[0]);
                        namedExportNames.push(exp.n);
                    }
                }

                // Build the export default object
                const defaultObj =
                    namedExportNames.length > 0
                        ? `export default {\n${namedExportNames.map((n) => `    ${n}: ${n}`).join(',\n')}\n};`
                        : `export default {};`;

                // Build the new module code
                const lines = [
                    `import { _register, _unregister } from "${VIRTUAL_MODULE_ID}";`,
                    ``,
                    `const __vite__id = ${JSON.stringify(id)};`,
                    `const __vite__css = ${cssLiteral};`,
                    `_register(__vite__id, __vite__css);`,
                    ``,
                    ...namedExports,
                    defaultObj,
                    ``,
                    `if (import.meta.hot) {`,
                    `    import.meta.hot.accept();`,
                    `    import.meta.hot.dispose(() => _unregister(__vite__id));`,
                    `}`,
                ];

                return { map: null, code: lines.join('\n') };
            },
        },
    };

    return [virtualModule, hmrModule, transformModule];
}

export { viteShadowDom };

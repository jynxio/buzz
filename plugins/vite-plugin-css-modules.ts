import { mergeConfig, normalizePath, type Plugin, type UserConfig } from 'vite';

function cssModules(): Plugin[] {
    let $: PatchMeta;

    const prePhase: Plugin = {
        enforce: 'pre',
        name: 'vite-plugin-inline-module-prePhase',
        config: (userConfig) => {
            const [config, meta] = patchConfig(userConfig);

            $ = meta;

            return config;
        },
    };

    const postPhase: Plugin = {
        enforce: 'post',
        name: 'vite-plugin-inline-module-post',
        transform: {
            filter: { id: /\.module\.[^?]+\?inline&module$/ },
            handler: async (code, id) => {
                const dataUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
                const cssText = (await import(dataUrl))?.default;

                if (typeof cssText !== 'string') return;

                const classnamesMap = $.cssModulesClassnamesMap.get(normalizePath(id));
                const output = { inline: cssText, module: classnamesMap };

                // @todo magic-string
                return { map: null, code: `export default ${JSON.stringify(output)}` };
            },
        },
    };

    return [prePhase, postPhase];
}

type PatchMeta = {
    isCssModulesEnabled: boolean;
    processor: 'postcss' | 'lightningcss';
    cssModulesClassnamesMap: Map<string, Record<string, string>>;
};

function patchConfig(userConfig: UserConfig): [UserConfig, PatchMeta] {
    const meta: PatchMeta = {
        isCssModulesEnabled: true,
        processor: userConfig.css?.transformer ?? 'postcss',
        cssModulesClassnamesMap: new Map<string, Record<string, string>>(),
    };
    /**
     * Lightning CSS
     */
    if (meta.processor === 'lightningcss') {
        meta.isCssModulesEnabled = !!userConfig.css?.lightningcss?.cssModules;
        if (!meta.isCssModulesEnabled) return [userConfig, meta];

        // @todo
        return [userConfig, meta];
    }

    /**
     * PostCSS
     */
    meta.isCssModulesEnabled = userConfig.css?.modules !== false;
    if (!meta.isCssModulesEnabled) return [userConfig, meta];

    const userGetJson = (userConfig.css?.modules || {})?.getJSON;
    const overriddenConfig: UserConfig = {
        css: {
            modules: {
                getJSON: (cssFileName, json, outputFileName) => {
                    meta.cssModulesClassnamesMap.set(normalizePath(cssFileName), json);

                    return userGetJson?.(cssFileName, json, outputFileName);
                },
            },
        },
    };
    const patchedConfig = mergeConfig(userConfig, overriddenConfig);

    return [patchedConfig, meta];
}

export { cssModules };
export default cssModules;

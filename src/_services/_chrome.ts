import { makeSafe } from './_helpers';

const safeTranslate = makeSafe(translate); // TSC Error: 参数“text”和“args” 的类型不兼容。

async function translate(
    text: string,
    option: {
        sourceLang: string;
        targetLang: string;
        signal?: AbortSignal;
    },
): Promise<string> {
    const isMethodAvailable = 'Translator' in self;
    if (!isMethodAvailable) throw new Error(`"Translator" is unsupported yet.`);

    const translator = await Translator.create({
        sourceLanguage: option.sourceLang,
        targetLanguage: option.targetLang,
        signal: option.signal,
    });
    const translation = await translator.translate(text, { signal: option.signal });

    return translation;
}

export { safeTranslate as translate };

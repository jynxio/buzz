import z from 'zod';

let detector: undefined | LanguageDetector;
const detectionSchema = z.object({ confidence: z.number(), detectedLanguage: z.string() });

type LangSym = ['zh' | 'unknown'] | ['en', 'word'] | ['en', 'sentence'];

async function detectLang(str: string): Promise<LangSym> {
    const trimStr = str.trim();
    if (isEnglishWord(trimStr)) return ['en', 'word'];

    const detection = (await detectByChromeAPI(trimStr))[0];
    const parsedResult = detectionSchema.safeParse(detection);

    if (!parsedResult.success)
        throw new Error(`"LanguageDetector" can't detectLang the string you selected.`);

    const { confidence, detectedLanguage } = parsedResult.data;

    if (detectedLanguage === 'en' && confidence > 0.5) return ['en', 'sentence'];
    if (detectedLanguage === 'zh' && confidence > 0.5) return ['zh'];

    return ['unknown'];
}

/**
 * Checks if a string is a valid English word.
 * Allows hyphens and apostrophes (e.g., "self-aware", "don't").
 */
function isEnglishWord(str: string) {
    return /^[a-zA-Z]+(['-][a-zA-Z]+)*$/.test(str);
}

async function detectByChromeAPI(str: string) {
    const isMethodAvailable = 'LanguageDetector' in self;

    if (!isMethodAvailable) throw new Error(`"LanguageDetector" is unsupported yet.`);
    if (!detector) detector = await LanguageDetector.create();

    return await detector.detect(str);
}

function makeSafe<Args extends unknown[], R>(
    fn: (...args: Args) => Promise<R>,
): (...args: Args) => Promise<Readonly<[false] | [true, R]>> {
    return function (...args: Args) {
        return fn(...args)
            .then((resolvedR) => [true, resolvedR] as const)
            .catch(() => [false] as const);
    };
}

export { detectLang, makeSafe };

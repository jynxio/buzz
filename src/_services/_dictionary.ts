/**
 * Fetches word definitions and pronunciations.
 *
 * @remarks
 * Uses Merriam-Webster API, which provides non-standard IPA notation ({@link https://dictionaryapi.com/})
 *
 * Alternative services considered:
 * - Oxford Dictionary API: Ideal but expensive with low free tier ({@link https://developer.oxforddictionaries.com/})
 * - WordsAPI: No US/UK pronunciation distinction ({@link https://www.wordsapi.com/})
 * - Wordnik API: Untested ({@link https://developer.wordnik.com/})
 * - Wiktionary API: No US/UK distinction, difficult to use
 * - Free Dictionary API: Wiktionary wrapper ({@link https://dictionaryapi.dev/})
 */
async function translate(word: string) {
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${import.meta.env.VITE_API_KEY_MERRIAM_WEBSTER_DICTIONARY}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

export { translate };

import * as translateApi from '@/_services';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';

// type TranslationResult = WordTranslationResult | SentenceTranslationResult;

// type WordTranslationResult = {
//     type: 'word';
//     input: string;
// } & (
//     | { state: 'pending' }
//     | { state: 'rejected'; error: string }
//     | { state: 'resolved'; output: { translation: string; ipa: { AmE: string; BrE: string } } }
// );

type SentenceTranslationResult = {
    type: 'sentence';
    input: string;
} & (
    | { state: 'pending' }
    | { state: 'rejected'; error: string }
    | { state: 'resolved'; output: { translation: string } }
);

function Translation({ input }: { input: string }) {
    const result = useTranslate(input);

    result.state;

    return (
        <div>
            <section>{result.input}</section>
            <hr />

            <section>State: {result.state}</section>

            {result.state === 'resolved' && (
                <section>Translation: {result.output.translation}</section>
            )}
        </div>
    );
}

function useTranslate(input: string) {
    const [result, setResult] = useImmer<SentenceTranslationResult>({
        type: 'sentence',
        state: 'pending',
        input,
    });

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            await sleep();
            const [isOk, output] = await translateApi.chrome(input, {
                sourceLang: 'en',
                targetLang: 'zh',
                signal: abortController.signal,
            });

            if (abortController.signal.aborted) {
                setResult({ input, type: 'sentence', state: 'rejected', error: 'Aborted' });
                return;
            }

            if (!isOk) {
                setResult({ input, type: 'sentence', state: 'rejected', error: 'Oops' });
                return;
            }

            setResult({
                input,
                type: 'sentence',
                state: 'resolved',
                output: { translation: output },
            });
        })();

        return () => abortController.abort();
    }, [input, setResult]);

    return result;
}

async function sleep() {
    const { resolve, promise } = Promise.withResolvers<number>();

    setTimeout(() => resolve(0), 1000);

    return promise;
}

export { Translation };

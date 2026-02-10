import * as translateApi from '@/_services';
import { Toast } from '@jynxio/ui';

type StatefulData = ['pending', { i: string }] | ['resolved', { i: string; o: string }];

function useTranslate() {
    const { add, close, update } = Toast.useToastManager();

    return translate;

    function translate(i: string) {
        const id = crypto.randomUUID();
        const abortController = new AbortController();
        const cancel = () => (close(id), abortController.abort());

        add<StatefulData>({ id, data: ['pending', { i }] });

        (async () => {
            await sleep();
            const [isOk, o] = await translateApi.chrome(i, {
                sourceLang: 'en',
                targetLang: 'zh',
                signal: abortController.signal,
            });

            if (!isOk) return;
            if (abortController.signal.aborted) return;

            update<StatefulData>(id, { data: ['resolved', { i, o }] });
        })();

        return cancel;
    }
}

async function sleep() {
    return new Promise<undefined>((resolve) => {
        setTimeout(() => resolve(undefined), 1500);
    });
}

export { useTranslate };
export type { StatefulData };

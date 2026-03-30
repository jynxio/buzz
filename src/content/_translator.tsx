import css from './_translator.module.css?spy';

import { Button, Toast } from '@jynxio/ui';
import { getShadowRoot } from './_helpers';
import { useTrigger } from './_hooks/use-trigger';
import { Translation } from './_translation';

function Translator() {
    return (
        <Toast.Provider timeout={0}>
            <Content />
        </Toast.Provider>
    );
}

function Content() {
    const { add, close, toasts } = Toast.useToastManager();

    useTrigger(createToast);

    return (
        <Toast.Portal container={getShadowRoot().getElementById('root')}>
            <Toast.Viewport>
                {toasts.map((item) => {
                    return (
                        <Toast.Root key={item.id} toast={item} className={css['toast']}>
                            <Toast.Content>
                                <Translation input={item.data.input} />
                            </Toast.Content>

                            <Button onClick={() => close(item.id)}>Close</Button>
                        </Toast.Root>
                    );
                })}
            </Toast.Viewport>
        </Toast.Portal>
    );

    function createToast(input: string) {
        add<{ input: string }>({ id: crypto.randomUUID(), data: { input } });
    }
}

export { Translator };

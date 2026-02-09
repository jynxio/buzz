import { Button, Toast } from '@jynxio/ui';
import { getShadowRoot } from './_helpers';
import { useTranslate, useTrigger } from './_hooks';

function Translator() {
    return (
        <Toast.Provider timeout={0}>
            <Content />
        </Toast.Provider>
    );
}

function Content() {
    const { toasts, close } = Toast.useToastManager();

    useTrigger(useTranslate());

    return (
        <Toast.Portal container={getShadowRoot().getElementById('root')}>
            <Toast.Viewport>
                {toasts.map((item) => {
                    return (
                        <Toast.Root key={item.id} toast={item}>
                            <Toast.Content>{JSON.stringify(item.data)}</Toast.Content>

                            <Button onClick={() => close(item.id)}>Close</Button>
                        </Toast.Root>
                    );
                })}
            </Toast.Viewport>
        </Toast.Portal>
    );
}

export { Translator };

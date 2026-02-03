import { Toast as Primitive } from '@base-ui/react/toast';
import { type PropsWithChildren } from 'react';
import { getRoot, useStyleSheets } from './_helpers';
import css from './_toast.module.css?inline&module';

ToastCtx.useToastManager = Primitive.useToastManager;

function ToastCtx({ children }: PropsWithChildren) {
    useStyleSheets(css.inline); // @todo 去重

    return (
        <Primitive.Provider timeout={0}>
            {children}
            <Toast />
        </Primitive.Provider>
    );
}

function Toast() {
    const { toasts } = Primitive.useToastManager();

    return (
        <Primitive.Portal container={getRoot().reactRoot}>
            <Primitive.Viewport className={css.module['container']}>
                {toasts.map((item) => {
                    return (
                        <Primitive.Root key={item.id} toast={item} className={css.module['toast']}>
                            <Primitive.Content className={css.module['content']}>
                                {JSON.stringify(item.data)}

                                <Primitive.Close aria-label="Close">x</Primitive.Close>
                            </Primitive.Content>
                        </Primitive.Root>
                    );
                })}
            </Primitive.Viewport>
        </Primitive.Portal>
    );
}

export { ToastCtx };

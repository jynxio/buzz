import { Button, Toast } from '@jynxio/ui';
import { useState } from 'react';

function ToastPage() {
    return (
        <Toast.Provider>
            <ToastButton />

            <Toast.Portal>
                <Toast.Viewport>
                    <ToastRoot />
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    );
}

function ToastButton() {
    const toastManager = Toast.useToastManager();
    const [count, setCount] = useState(1);

    function createToast() {
        setCount(count + 1);
        toastManager.add({
            title: `# Toast ${count} created`,
            description:
                'From the creators of Radix, Floating UI, and Material UI, Base UI is a comprehensive UI component library for building accessible user interfaces with React.',
        });
    }

    return <Button onClick={createToast}>Create a Toast</Button>;
}

function ToastRoot() {
    const { toasts } = Toast.useToastManager();

    return toasts.map((toast) => (
        <Toast.Root key={toast.id} toast={toast}>
            <Toast.Content>
                <Toast.Title />
                <Toast.Description />
            </Toast.Content>
        </Toast.Root>
    ));
}

export { ToastPage };

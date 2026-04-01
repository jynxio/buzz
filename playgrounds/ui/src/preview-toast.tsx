import { Button, Toast } from "ui";

function ToastPreview() {
    const toastManager = Toast.useToastManager();

    return (
        <>
            <div className="row">
                <Button
                    onClick={() => {
                        toastManager.add({
                            title: "Hello",
                            description: "This is a toast notification.",
                        });
                    }}
                >
                    Show Toast
                </Button>
                <Button
                    onClick={() => {
                        toastManager.add({
                            title: "Auto-close",
                            description: "This toast will close in 3 seconds.",
                            timeout: 3000,
                        });
                    }}
                >
                    Auto-close Toast
                </Button>
            </div>

            <Toast.Portal>
                <Toast.Viewport>
                    {toastManager.toasts.map((toast) => (
                        <Toast.Root key={toast.id} toast={toast}>
                            <Toast.Content>
                                <Toast.Title>{toast.title}</Toast.Title>
                                <Toast.Description>{toast.description}</Toast.Description>
                                <Toast.Close>
                                    <Button>Dismiss</Button>
                                </Toast.Close>
                            </Toast.Content>
                        </Toast.Root>
                    ))}
                </Toast.Viewport>
            </Toast.Portal>
        </>
    );
}

export { ToastPreview };

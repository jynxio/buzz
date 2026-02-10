import { useEffect } from 'react';

// @todo Deduplicate

function useTrigger(action: (i: string) => void) {
    useEffect(() => {
        return subscribe(listener);

        function listener() {
            const str = (getSelection() ?? '').toString().trim();

            str && action(str);
        }
    }, [action]);
}

function subscribe(listener: () => void) {
    let canPublish = false;
    let isMetaKeyPress = false;

    document.addEventListener('keyup', onMetaKeyRelease, { capture: true });
    document.addEventListener('keydown', onMetaKeyPress, { capture: true });
    document.addEventListener('keydown', onOtherKeyPress, { capture: true });

    return destroy;

    function onMetaKeyPress(e: KeyboardEvent) {
        if (e.key.toLowerCase() === 'meta') isMetaKeyPress = canPublish = true;
    }

    function onMetaKeyRelease(e: KeyboardEvent) {
        if (e.key.toLowerCase() !== 'meta') return;

        canPublish && listener();
        isMetaKeyPress = canPublish = false;
    }

    function onOtherKeyPress(e: KeyboardEvent) {
        if (e.key.toLowerCase() !== 'meta' && isMetaKeyPress) canPublish = false;
    }

    function destroy() {
        document.removeEventListener('keyup', onMetaKeyRelease, { capture: true });
        document.removeEventListener('keydown', onMetaKeyPress, { capture: true });
        document.removeEventListener('keydown', onOtherKeyPress, { capture: true });
    }
}

export { useTrigger };

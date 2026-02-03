import { useTranslate, useTrigger } from './_hooks';

function Translator() {
    const translate = useTranslate();

    useTrigger(translate);

    return null;
}

export { Translator };

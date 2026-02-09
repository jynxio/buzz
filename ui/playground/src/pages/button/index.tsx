import css from './_index.module.css';

import { Button } from '@jynxio/ui';

function ButtonPage() {
    return (
        <div className={css['root']}>
            <Button>@jynxio/ui</Button>
            <Button disabled>@jynxio/ui</Button>
        </div>
    );
}

export { ButtonPage };

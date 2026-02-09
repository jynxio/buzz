import css from './_app.module.css';

import { Link, Route, Switch } from 'wouter';
import { ButtonPage } from './pages/button';
import { NotFound } from './pages/not-found';
import { ToastPage } from './pages/toast';

function App() {
    return (
        <div className={css['root']}>
            <Header />
            <Content />
        </div>
    );
}

function Header() {
    return (
        <header className={css['header']}>
            <nav className={css['nav']}>
                <Link href="/button">Button</Link>
                <Link href="/toast">Toast</Link>
            </nav>
        </header>
    );
}

function Content() {
    return (
        <main className={css['content']}>
            <Switch>
                <Route path="/" />
                <Route path="/toast" component={ToastPage} />
                <Route path="/button" component={ButtonPage} />
                <Route component={NotFound} />
            </Switch>
        </main>
    );
}

export { App };

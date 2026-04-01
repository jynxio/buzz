import { Button, Toast } from "ui";
import "ui/style.css";
import { ToastPreview } from "./preview-toast.tsx";
import "./app.css";

function App() {
    return (
        <div className="app">
            <h1>UI Fiddle</h1>

            <Section title="Button">
                <div className="row">
                    <Button>Default</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </Section>

            <Section title="Toast">
                <Toast.Provider>
                    <ToastPreview />
                </Toast.Provider>
            </Section>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="section">
            <h2>{title}</h2>
            <div className="section-body">{children}</div>
        </section>
    );
}

export { App };

import { useState } from "react";

type TranslationResult =
    | { type: "sentence"; translation: string }
    | { type: "word"; translation: string; us: string; uk: string };

function App() {
    const [input, setInput] = useState("");
    const [translating, setTranslating] = useState(false);
    const [result, setResult] = useState<TranslationResult | null>(null);
    const [error, setError] = useState("");

    async function handleTranslate() {
        const text = input.trim();
        if (!text) return;
        setTranslating(true);
        setError("");

        const res = await window.api.translate(text);
        setTranslating(false);
        if (!res.ok) return setError(res.error);
        if (res.data) setResult(res.data);
    }

    return (
        <div style={{ padding: 16, maxWidth: 720, margin: "0 auto" }}>
            <h2>Buzz Translator</h2>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void handleTranslate();
                }}
                placeholder="Enter English text... (Cmd/Ctrl+Enter to translate)"
                rows={4}
                style={{ width: "100%", boxSizing: "border-box" }}
            />

            <button
                onClick={handleTranslate}
                disabled={translating || !input.trim()}
                style={{ marginTop: 8 }}
            >
                {translating ? "Translating..." : "Translate"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {result && (
                <div style={{ marginTop: 12 }}>
                    <p>{result.translation}</p>
                    {result.type === "word" && (
                        <p>
                            US {result.us} / UK {result.uk}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export { App };

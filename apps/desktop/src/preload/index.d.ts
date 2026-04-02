import type { ElectronAPI } from "@electron-toolkit/preload";

type IpcResult<T> = { ok: true; data: T } | { ok: false; error: string };

type TranslationResult =
    | { type: "sentence"; translation: string }
    | { type: "word"; translation: string; us: string; uk: string };

interface BuzzAPI {
    translate(input: string): Promise<IpcResult<TranslationResult | undefined>>;
}

declare global {
    interface Window {
        electron: ElectronAPI;
        api: BuzzAPI;
    }
}

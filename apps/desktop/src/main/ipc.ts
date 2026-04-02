import { ipcMain } from "electron";

import { translate } from "./services/ai";

function registerIpcHandlers(): void {
    ipcMain.handle("ai:translate", async (_event, input: string) => {
        try {
            return { ok: true as const, data: await translate(input) };
        } catch (error) {
            return { ok: false as const, error: String(error) };
        }
    });
}

export { registerIpcHandlers };

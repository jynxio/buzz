import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const candidates = [
    resolve(process.cwd(), ".env"),
    resolve(__dirname, "../../.env"),
    resolve(__dirname, "../../../../.env"),
];

for (const filepath of candidates) {
    try {
        for (const line of readFileSync(filepath, "utf-8").split("\n")) {
            const m = line.match(/^([\w.-]+)=(.*)$/);
            if (m?.[1] && !(m[1]! in process.env)) {
                process.env[m[1]!] = m[2] ?? "";
            }
        }
        break;
    } catch {
        continue;
    }
}

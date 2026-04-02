export class FetchError extends Error {
    readonly status: number | undefined;
    readonly data: unknown;

    constructor(message: string, options?: { status?: number; data?: unknown }) {
        super(message);
        this.name = "FetchError";
        this.status = options?.status;
        this.data = options?.data;
    }
}

export class ValidationError extends Error {
    readonly issues: ReadonlyArray<{ message: string; path?: ReadonlyArray<PropertyKey> }>;

    constructor(issues: ReadonlyArray<{ message: string; path?: ReadonlyArray<PropertyKey> }>) {
        super(issues.map((i) => i.message).join("; "));
        this.name = "ValidationError";
        this.issues = issues;
    }
}

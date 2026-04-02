type Awaitable<T> = T | Promise<T>;
type ValueOrGetter<T> = T | (() => Awaitable<T>);

export type AuthConfig =
    | { type: "bearer"; token: ValueOrGetter<string | null | undefined> }
    | { type: "basic"; username: ValueOrGetter<string>; password: ValueOrGetter<string> }
    | { type: "custom"; scheme: string; credential: ValueOrGetter<string | null | undefined> };

async function unwrap<T>(value: ValueOrGetter<T>): Promise<T> {
    return typeof value === "function" ? await (value as () => Awaitable<T>)() : value;
}

/**
 * Resolve an `AuthConfig` into an `Authorization` header value.
 * Returns `null` when the required credential is missing / empty.
 */
export async function resolveAuthHeader(auth: AuthConfig): Promise<string | null> {
    switch (auth.type) {
        case "bearer": {
            const token = await unwrap(auth.token);
            return token ? `Bearer ${token}` : null;
        }
        case "basic": {
            const [user, pass] = await Promise.all([unwrap(auth.username), unwrap(auth.password)]);
            return `Basic ${btoa(`${user}:${pass}`)}`;
        }
        case "custom": {
            const credential = await unwrap(auth.credential);
            return credential ? `${auth.scheme} ${credential}` : null;
        }
    }
}

export type RetryConfig =
    | number
    | {
          /** Maximum number of retry attempts (not counting the initial request). */
          attempts: number;
          /**
           * Delay in ms between retries. Pass a function for custom strategies
           * (exponential back-off, jitter, etc.). Defaults to 1 000 ms.
           */
          delay?: number | ((attempt: number) => number);
          /**
           * Called before each retry to decide whether to continue. Receives the
           * error and, when available, the raw `Response`. Return `false` to
           * stop retrying. Defaults to retrying on network errors and 5xx.
           */
          shouldRetry?: (ctx: { status?: number }) => boolean | Promise<boolean>;
      };

export type ResolvedRetry = {
    attempts: number;
    getDelay: (attempt: number) => number;
    shouldRetry: (ctx: { status?: number }) => boolean | Promise<boolean>;
};

const defaultShouldRetry = ({ status }: { status?: number }) =>
    status === undefined || (status >= 500 && status < 600);

export function resolveRetry(config: RetryConfig): ResolvedRetry {
    if (typeof config === "number") {
        return { attempts: config, getDelay: () => 1000, shouldRetry: defaultShouldRetry };
    }

    const { attempts, delay = 1000, shouldRetry = defaultShouldRetry } = config;

    return {
        attempts,
        getDelay: typeof delay === "function" ? delay : () => delay,
        shouldRetry,
    };
}

export const linearDelay = (ms: number) => () => ms;

export const exponentialDelay =
    (base = 1000, max = 30_000) =>
    (attempt: number) =>
        Math.min(max, base * 2 ** attempt);

export const exponentialDelayWithJitter =
    (base = 1000, max = 30_000) =>
    (attempt: number) =>
        Math.min(max, base * 2 ** attempt) * (0.5 + Math.random() * 0.5);

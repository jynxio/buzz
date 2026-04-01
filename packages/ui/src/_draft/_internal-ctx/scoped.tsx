import { createContext, use, useInsertionEffect } from "react";

type InternalCtxProps = { adopt: (key: unknown, css: string) => () => void };

const InternalCtx = createContext<undefined | InternalCtxProps>(undefined);

function useInternalCtx(key: unknown, css: string) {
    const { adopt } = use(InternalCtx) ?? {};
    if (!adopt) throw new Error("@todo");

    useInsertionEffect(() => adopt(key, css), [adopt]);
}

// eslint-disable-next-line react-refresh/only-export-components
export { InternalCtx, useInternalCtx };

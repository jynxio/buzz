type BaseUIClassName<State> = undefined | string | ((state: State) => undefined | string);

function mergeClassNames<State>(...classNames: BaseUIClassName<State>[]): BaseUIClassName<State> {
    return classNameFn;

    function classNameFn(state: State) {
        return classNames
            .map((item) => (typeof item === 'function' ? item(state) : item))
            .filter((item) => !!item)
            .join(' ');
    }
}

export { mergeClassNames };

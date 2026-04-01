import css from "./_index.module.css";

import { mergeClassNames } from "../../_utils";
import * as $ from "@base-ui/react/button";

function Button(props: $.ButtonProps) {
    return <$.Button {...props} className={mergeClassNames(props.className, css["root"])} />;
}

export type * from "@base-ui/react/button";
export { Button };

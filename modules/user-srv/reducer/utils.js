import { assocPath, dissocPath, split, useWith, identity } from "ramda";

export const set = useWith(assocPath, [split("."), identity, identity]);
export const unset = useWith(dissocPath, [split("."), identity]);

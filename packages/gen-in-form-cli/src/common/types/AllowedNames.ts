import { FilterFlags } from "./FilterFlags";

/**
 * https://www.piotrl.net/typescript-condition-subset-types/
 */
export type AllowedNames<Base, Condition> = FilterFlags<
    Base,
    Condition
>[keyof Base];

/**
 * https://www.piotrl.net/typescript-condition-subset-types/
 */

export type FilterFlags<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

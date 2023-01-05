/**
 * I am just a helper type to resolve a Parameter of a promise. Might be solved similary for arrays btw ;)
 * Idea according to https://github.com/eggheadio-projects/practical-advanced-typescript-features/blob/12-infer-keyword/index.ts
 */
export type PromiseGenericParameter<TPromise> = TPromise extends Promise<
    infer TGenericParameter
>
    ? TGenericParameter
    : never;

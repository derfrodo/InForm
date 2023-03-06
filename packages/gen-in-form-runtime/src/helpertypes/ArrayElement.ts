/**
 * Returns the type of an element of the given array. Will probably work best with arrays with only one type of elements like string[]
 *
 * see also https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
 */
export type ArrayElement<TArray extends readonly unknown[]> =
    TArray extends readonly (infer TElement)[] ? TElement : never;

export type DefaultValues<TInput extends {}> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in keyof TInput]?: TInput[key];
};

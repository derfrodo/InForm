// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationFunction<TInput extends {}, TValidationResult = any> =
    // | AsyncValidationFunction<TInput, TValidationResult>
    // |
    SyncValidationFunction<TInput, TValidationResult>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export type AsyncValidationFunction<TInput extends {}, TValidationResult = any> = (
//     input: TInput
// ) => Promise<TValidationResult>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SyncValidationFunction<TInput extends {}, TValidationResult = any> = (
    input: TInput
) => TValidationResult;

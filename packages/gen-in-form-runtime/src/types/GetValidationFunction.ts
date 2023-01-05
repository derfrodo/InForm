import { SyncValidationFunction, ValidationFunction } from "./ValidationFunction";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetValidationFunction<TValidationRules, TInput extends {}, TValidationResult = any> = (
    rules: TValidationRules
) => ValidationFunction<TInput, TValidationResult>;

// export type GetAsyncValidationFunction<
//     TValidationRules,
//     TInput extends {},
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     TValidationResult = any
// > = (rules: TValidationRules) => AsyncValidationFunction<TInput, TValidationResult>;

export type GetSyncValidationFunction<
    TValidationRules,
    TInput extends {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TValidationResult = any
> = (rules: TValidationRules) => SyncValidationFunction<TInput, TValidationResult>;

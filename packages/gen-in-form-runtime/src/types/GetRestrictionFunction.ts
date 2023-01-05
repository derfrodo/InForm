import { SyncRestrictionFunction } from "./RestrictionFunction";

export type GetRestrictionFunction<
    TInputRestrictions,
    TInput extends {},
    TInputParameter extends TInput | keyof TInput = TInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TValidationResult = any
> = GetSyncRestrictionFunction<TInputRestrictions, TInput, TInputParameter, TValidationResult>;
// | GetAsyncRestrictionFunction<TInputRestrictions, TInput, TInputParameter, TValidationResult>;

export type GetSyncRestrictionFunction<
    TInputRestrictions,
    TInput extends {},
    TInputParameter extends TInput | keyof TInput = TInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TValidationResult = any
> = (
    rules: TInputRestrictions
) => SyncRestrictionFunction<TInput, TInputParameter, TValidationResult>;

// export type GetAsyncRestrictionFunction<
//     TInputRestrictions,
//     TInput extends {},
//     TInputParameter extends TInput | keyof TInput = TInput,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     TValidationResult = any
// > = (
//     rules: TInputRestrictions
// ) => AsyncRestrictionFunction<TInput, TInputParameter, TValidationResult>;

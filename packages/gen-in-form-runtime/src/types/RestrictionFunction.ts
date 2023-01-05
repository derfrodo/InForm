export type RestrictionFunction<
    TInput extends {},
    TInputParameter extends TInput | keyof TInput = TInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TValidationResult = any
> = SyncRestrictionFunction<TInput, TInputParameter, TValidationResult>;

export type SyncRestrictionFunction<
    TInput extends {},
    TInputParameter extends TInput | keyof TInput = TInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TValidationResult = any
> = (input: TInputParameter) => TValidationResult;

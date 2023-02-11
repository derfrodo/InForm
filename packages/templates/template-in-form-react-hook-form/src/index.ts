import { Control, Path, FieldPath, RegisterOptions, FieldValues, UseFormReturn } from "react-hook-form";
import { useMemo } from "react";

export type FormValidationRules<T extends FieldValues = FieldValues> = {
    [key in FieldPath<T>]?: Omit<RegisterOptions<T, key>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export type RhfFieldRestriction = {
    readonly?: boolean;
    required?: boolean;
    hidden?: boolean;
};

export type FormRestrictions<T extends FieldValues = FieldValues, TRestriction extends RhfFieldRestriction = RhfFieldRestriction> = {
    [key in FieldPath<T>]?: TRestriction
}

export type RhfInputProps<T extends FieldValues, TKey extends Path<T>, TRestriction extends RhfFieldRestriction = RhfFieldRestriction> = {
    formReturn: UseFormReturn<T, any>,
    control: Control<T, any>,
    path: TKey,
    rules?: FormValidationRules<T>;
    restrictions?: FormRestrictions<T, TRestriction>;
}

export type RhfInputField<T extends FieldValues, TKey extends Path<T>, TRestriction extends RhfFieldRestriction = RhfFieldRestriction> = React.FC<RhfInputProps<T, TKey, TRestriction>>;
export type RhfInputFieldResult<T extends FieldValues, TKey extends Path<T>, TRestriction extends RhfFieldRestriction = RhfFieldRestriction> = ReturnType<RhfInputField<T, TKey, TRestriction>>;

export function useFieldRestriction<T extends FieldValues, TKey extends Path<T>, TRestriction extends RhfFieldRestriction = RhfFieldRestriction>(props: RhfInputProps<T, TKey, TRestriction>) {
    const { restrictions, path } = props;
    return useMemo(() => (restrictions && restrictions[path]) ?? null, [path, restrictions]);
}

export function useValidationRule<T extends FieldValues, TKey extends Path<T>, TRestriction extends RhfFieldRestriction = RhfFieldRestriction>(props: RhfInputProps<T, TKey, TRestriction>) {
    const { rules, path } = props;
    return useMemo(() => (rules && rules[path]) ?? null, [path, rules]);
}

export function useUseFormReturnContext<TFormObj extends FieldValues = FieldValues, TContext = any>(formReturn: UseFormReturn<TFormObj, TContext>) {
    return formReturn.control._options.context;
}
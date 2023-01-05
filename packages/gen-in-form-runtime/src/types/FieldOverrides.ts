import { FieldOverride } from "./FieldOverride";

export type FieldOverrides<TInput extends {}> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in keyof TInput]?: FieldOverride;
};

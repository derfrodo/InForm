import { InFormCliArguments } from "@src/common/types/InFormCliArguments";
import { LogLevel } from "@src/common/types/LogLevel";

type KeysOfType<T, TProp> = {
    [P in keyof T]: T[P] extends TProp ? P : never;
}[keyof T] & string;

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];


type InFormCliArgumentsKeysOfType<T> = KeysOfType<InFormCliArguments, T>
type InFormCliArgumentsPropertyType<TKey extends keyof InFormCliArguments> = PropType<InFormCliArguments, TKey>

type ValidatePropertyFunction<T> = <
    TKey extends keyof InFormCliArgumentsKeysOfType<T>
>(
    obj: any,
    propertyName: TKey
) => obj is { [key in TKey]: InFormCliArgumentsPropertyType<TKey> };


export function validateLoglevel<TKey extends InFormCliArgumentsKeysOfType<LogLevel>>(
    obj: any,
    propertyName: TKey
): obj is {
    [key in typeof propertyName]: InFormCliArgumentsPropertyType<
        typeof propertyName
    >;
} {
    return false;
}

const o: any = {};

if (validateLoglevel(o, "loglevel")) {
    const d = o;
}

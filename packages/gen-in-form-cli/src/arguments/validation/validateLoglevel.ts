import { InFormCliArguments } from "@src/common/types/InFormCliArguments";
import { LogLevel } from "@src/common/types/LogLevel";


type InFormCliArgumentsKeysOfType<T> = KeysOfType<InFormCliArguments, T>
type InFormCliArgumentsPropertyType<TKey extends keyof InFormCliArguments> = PropType<InFormCliArguments, TKey>

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

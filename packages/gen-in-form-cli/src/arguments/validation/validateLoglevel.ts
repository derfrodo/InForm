import { KeysOfType, PropType } from "@derfrodo/gen-in-form-runtime";
import { InFormCliArguments } from "@src/common/types/InFormCliArguments";
import { LogLevel } from "@src/common/types/LogLevel";


type InFormCliArgumentsKeysOfType<T> = KeysOfType<InFormCliArguments, T> & string
type InFormCliArgumentsPropertyType<TKey extends keyof InFormCliArguments> = PropType<InFormCliArguments, TKey>



export declare type StringKeysOfType<T extends {}, TProp, TKeyType extends string | number | symbol = string> = Required<{
    [P in keyof T]: T[P] extends TProp ? P extends string ? P : never : never;
}[keyof T]> & TKeyType;


type logleveltype = StringKeysOfType<InFormCliArguments, LogLevel, number>

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

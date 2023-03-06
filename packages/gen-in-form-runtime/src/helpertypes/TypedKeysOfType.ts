import { KeysOfType } from "./KeysOfType";

/**
 * All keys of an object which points to a specified type. also type of key is filtered afterwards
 *
 * e.g.
 *
 * type User = {
 *     name: string;
 *     surname: string;
 *     age: number;
 * };
 * type StringProps = KeysOfType<User, string>;
 * // leads to type StringProps = "name" | "surname"
 *
 */
export type TypedKeysOfType<
    T extends {},
    TProp,
    TKeyType extends string | number | symbol | undefined = string
> = KeysOfType<T, TProp> & TKeyType;

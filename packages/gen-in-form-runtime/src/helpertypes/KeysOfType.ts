/**
 * All keys of an object which points to a specified type
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
export type KeysOfType<T extends {}, TProp> = Required<
    {
        [P in keyof T]: T[P] extends TProp ? P : never;
    }[keyof T]
>;

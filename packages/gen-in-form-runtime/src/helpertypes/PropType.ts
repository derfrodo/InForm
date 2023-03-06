/**
 * Returns type of a given Property of an object
 */

export type PropType<TObj extends {}, TProp extends keyof TObj> = TObj[TProp];

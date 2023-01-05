import { KeyToKeyMap } from "./KeyToKeyMap";

export type PartialKeyToKeyMap<TypeForKeys extends {}, TypeForValues extends {}> = Partial<
    KeyToKeyMap<TypeForKeys, TypeForValues>
>;

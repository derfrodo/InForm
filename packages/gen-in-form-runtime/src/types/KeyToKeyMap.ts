export type KeyToKeyMap<TypeForKeys extends {}, TypeForValues extends {}> = {
    [key in keyof TypeForKeys]?: keyof TypeForValues;
};

export interface GroupAndOrderTypes<
    TDataType extends {},
    TDataKeys extends keyof Required<TDataType> & string = keyof Required<TDataType> & string /*,
    TGroupnames extends string = string*/
> {
    // this property might be usefull later - but not during bachelor degree ;)
    // groups?: GroupAndOrderGroups<TGroupnames>;
    fields: GroupAndOrderFields<TDataType, TDataKeys /*TGroupnames*/>;
}

export type GroupAndOrderFields<
    TDataType extends {},
    TDataKeys extends keyof Required<TDataType> & string = keyof Required<TDataType> & string /*,
    TGroupnames extends string = string*/
> = {
    [key in TDataKeys]: FormFieldGroupOrderInfo; // FormFieldGroupOrderInfo<TGroupnames>;
};

// export type FormFieldGroupOrderInfo<TGroupname extends string = string> = {
export type FormFieldGroupOrderInfo = {
    ordinal?: number;
    isHidden?: boolean;
    /**
     * NO GROUPNAMES FOR NOW
     * if set for the first time, all other fields with same group will be added "directly" - so we get a group ;)
     * */
    // groupName?: TGroupname;
};

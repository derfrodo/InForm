export function isGetInterfacesOfTypeOptions(
    p: any
): p is GetInterfacesOfTypeOptions<string> {
    return (
        typeof p === "object" &&
        typeof p.moduleName === "string" &&
        typeof p.baseInterfaceName === "string"
    );
}

export type GetInterfacesOfTypeOptions<TInterface extends string> = {
    moduleName: string;
    baseInterfaceName: TInterface;
};

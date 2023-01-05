import ts from "typescript";
import { MappedMember } from "./MappedMember";

/**
 * Property which has been mapped using stuff 😅
 */
export type MappedProperty = MappedMember & {
    propertySymbol: ts.Symbol;
};

export function isMappedProperty(
    member: MappedMember
): member is MappedProperty {
    return (
        typeof member === "object" &&
        (member as MappedProperty).propertySymbol !== undefined
    );
}

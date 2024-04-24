import ts from "typescript";
import { MappedSymbolForPropertyFromGeneralSetting as MappedSymbolForMemberOrPropertyFromGeneralSetting } from "./MappedSymbolForPropertyFromGeneralSetting";

/**
 * Member which has been mapped using stuff 😅
 */
export type MappedMember = {
    name: string | null;
    /**
     * valueDeclaration of @see {@link MappedProperty.propertySymbol}
     */
    signature: ts.PropertySignature | ts.PropertyDeclaration;
    mapped: MappedSymbolForMemberOrPropertyFromGeneralSetting[];
};

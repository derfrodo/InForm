import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { getSyntaxKindString } from "@src/steps/searchMappings/utils/visitors/getSyntaxKindString";
import ts from "typescript";

export function findMemberFromInterface(
    node: ts.InterfaceDeclaration,
    memberName: string,
    onlyIfPropertySignature?: true
): ts.PropertySignature | null;
export function findMemberFromInterface(
    node: ts.InterfaceDeclaration,
    memberName: string,
    onlyIfPropertySignature?: false
): ts.TypeElement | null;

export function findMemberFromInterface(
    node: ts.InterfaceDeclaration,
    memberName: string,
    onlyIfPropertySignature = true
): ts.PropertySignature | ts.TypeElement | null {
    const log = getGeneratorLogger();
    const member = node.members.find(
        (member) => member?.name?.getText() === memberName
    );

    if (!member) {
        return null;
    }
    if (!onlyIfPropertySignature) {
        return member;
    }
    if (member && !ts.isPropertySignature(member)) {
        log.warn(
            `Member with name ${memberName} found in interface ${node.name.getText()}. But expected it to be PropertySignature instead of ${getSyntaxKindString(
                member
            )}`
        );
        return null;
    }
    return member;
}

import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";
import { findMemberFromInterface } from "./findMemberFromInterface";

export function resolveMemberFromInterface(
    node: ts.InterfaceDeclaration,
    memberName: string,
    onlyIfPropertySignature?: true
): ts.PropertySignature;
export function resolveMemberFromInterface(
    node: ts.InterfaceDeclaration,
    memberName: string,
    onlyIfPropertySignature?: false
): ts.TypeElement;

export function resolveMemberFromInterface(
    node: ts.InterfaceDeclaration,
    memberName: string,
    onlyIfPropertySignature = true
): ts.PropertySignature | ts.TypeElement {
    const member = findMemberFromInterface(node, memberName);
    if (!member) {
        throw logAndError(
            `Member with name ${memberName} not found in interface ${node.name.getText()}`
        );
    }

    if (!onlyIfPropertySignature) {
        return member;
    }
    return member;
}

import ts from "typescript";
import { isModule } from "./isModule";

jest.mock("@src/logging/getGeneratorLogger");

describe("isModule module tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("given isModule first test", () => {
        const decModifiers: ts.Modifier[] = [
            ts.factory.createModifier(ts.SyntaxKind.DefaultKeyword),
        ];

        const node = ts.factory.createImportDeclaration(
            decModifiers,
            ts.factory.createImportClause(false, undefined, undefined),
            ts.factory.createStringLiteral("othermodule"),
            undefined
        );

        const result = isModule(
            {
                declaration: node,
                fileReference: null,
                resolvedModule: null,
            },
            "modname"
        );

        expect(result).toBe(false);
    });
    
    it("given isModule first test when called with matching module name then returns true", () => {
        const decModifiers: ts.Modifier[] = [
            ts.factory.createModifier(ts.SyntaxKind.DefaultKeyword),
        ];

        const node = ts.factory.createImportDeclaration(
            decModifiers,
            ts.factory.createImportClause(false, undefined, undefined),
            ts.factory.createStringLiteral("modname"),
            undefined
        );

        const result = isModule(
            {
                declaration: node,
                fileReference: null,
                resolvedModule: null,
            },
            "modname"
        );

        expect(result).toBe(true);
    });
});

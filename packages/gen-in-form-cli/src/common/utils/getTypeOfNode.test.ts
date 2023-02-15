import ts from "typescript";
import { getTypeOfNode } from "./getTypeOfNode";

jest.mock("@src/logging/getGeneratorLogger");
import { getInFormProgramFromStore } from "../getInFormProgramFromStore";
jest.mock("../getInFormProgramFromStore", () => {
    const act = jest.requireActual("../getInFormProgramFromStore");
    return {
        ...act,
        getInFormProgramFromStore: jest.fn(),
    };
});

const getInFormProgramFromStoreMock =
    getInFormProgramFromStore as jest.MockedFunction<
        typeof getInFormProgramFromStore
    >;

describe("getTypeOfNode module tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getInFormProgramFromStoreMock.mockImplementation(() => {
            const options: ts.CompilerOptions = {
                allowJs: true,
            };
            const host = ts.createCompilerHost(options);
            const program = ts.createProgram([], options, host);
            return { program, host };
        });
    });

    it("given getTypeOfNode first test", () => {
        const decModifiers: ts.Modifier[] = [
            ts.factory.createModifier(ts.SyntaxKind.DefaultKeyword),
        ];

        const node = ts.factory.createImportDeclaration(
            decModifiers,
            ts.factory.createImportClause(false, undefined, undefined),
            ts.factory.createStringLiteral("othermodule"),
            undefined
        );

        const result = getTypeOfNode(node);

        expect(result).toBe(null);
    });



});

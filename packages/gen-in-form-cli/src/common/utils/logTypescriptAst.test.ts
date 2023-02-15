import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logTypescriptAst } from "./logTypescriptAst";
import ts from "typescript";

jest.mock("@src/logging/getGeneratorLogger");

describe("logTypescriptAst module tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("given logTypescriptAst first test", () => {
        const sf = ts.createSourceFile(
            "testfile",
            `export {};
`,
            {
                languageVersion: ts.ScriptTarget.ES2015,
            }
        );

        logTypescriptAst(sf);

        const info = getGeneratorLogger().info;
        expect(info).toBeCalled();
    });
});

// import { join } from "path";
// import ts from "typescript";
import { readFileAsStringSync } from "./readFileAsStringSync";

import { parseTsConfig } from "./parseTsConfig";

jest.mock("./readFileAsStringSync", () => {
    return {
        readFileAsStringSync: jest.fn(),
    };
});

const readFileAsStringSyncMock = readFileAsStringSync as jest.MockedFunction<
    typeof readFileAsStringSync
>;

// export function parseTsConfig(
//     pathToTsconfig?: string | null,
//     baseProjectPath?: string | null,
//     encoding: BufferEncoding = "utf8"
// ): ts.ParsedCommandLine {
//     const cwd = process.cwd();
//     const content = readFileAsStringSync(
//         pathToTsconfig ?? join(cwd, "tsconfig.json"),
//         encoding
//     );

//     const tsConfigObject = ts.parseJsonConfigFileContent(
//         JSON.parse(content),
//         ts.sys,
//         baseProjectPath ?? cwd
//     );
//     return tsConfigObject;
// }

describe("parseTsConfig module tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        readFileAsStringSyncMock.mockImplementation(() => {
            return `{
                "include": [
                    "TESTCONFIGINCLUDEPATH"
                ]
            }`;
        });
    });

    it("given parsTsConfig first test", () => {
        readFileAsStringSyncMock.mockImplementation(() => {
            return `{
                "include": [
                    "TESTCONFIGINCLUDEPATH"
                ]
            }`;
        });

        const result = parseTsConfig("testpath");

        expect(result).toMatchObject({
            raw: { include: ["TESTCONFIGINCLUDEPATH"] },
        });
    });
});

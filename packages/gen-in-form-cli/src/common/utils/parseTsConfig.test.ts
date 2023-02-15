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

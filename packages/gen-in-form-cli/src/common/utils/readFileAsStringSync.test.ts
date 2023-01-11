import { readFileSync } from "fs";
import { readFileAsStringSync } from "./readFileAsStringSync";

jest.mock("fs", () => {
    return {
        readFileSync: jest.fn(),
    };
});

const readFileSyncMock = readFileSync as jest.MockedFunction<
    typeof readFileSync
>;

describe("readFileAsStringSync module tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        readFileSyncMock.mockImplementation(() => {
            return Buffer.from("DEFAULT_TESTSTRING");
        });
    });

    it("given readFileAsStringSync when it is called then readFileSyncMock is called with given parameters", () => {
        readFileAsStringSync("test");
        expect(readFileSyncMock).toBeCalledWith("test");
    });

    it("given readFileAsStringSync when it is called then returned buffer is stringified", () => {
        readFileSyncMock.mockImplementation(() => {
            return Buffer.from("testdata_ä", "utf8");
        });

        const uut = readFileAsStringSync("test");
        expect(uut).toBe("testdata_ä");
    });

    it("given readFileAsStringSync when it is called and different encoding has been passed then returned buffer is stringified with this encoding", () => {
        readFileSyncMock.mockImplementation(() => {
            return Buffer.from("testdata_ä", "utf8");
        });

        const uut = readFileAsStringSync("test", "latin1");
        expect(uut).not.toBe("testdata_ä");
    });
});

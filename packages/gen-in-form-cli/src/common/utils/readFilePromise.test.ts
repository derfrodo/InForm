import { readFile } from "fs";
import { promisify } from "util";
import { readFileAsStringPromise, readFilePromise } from "./readFilePromise";

jest.mock("fs", () => {
    return {
        readFile: jest.fn(),
    };
});

jest.mock("util", () => {
    return {
        promisify: jest.fn().mockImplementation((foo) => foo),
    };
});

const readFileMock = readFile as jest.MockedFunction<typeof readFile>;
const promisifyMock = promisify as jest.MockedFunction<typeof promisify>;

describe("readFilePromise module tests", () => {
    beforeAll(() => {
        // make sure, readFilePromise is just a wrapped call for readFile by promisify
        expect(promisifyMock).toBeCalledWith(readFile);
        expect(promisifyMock).toBeCalledTimes(1);
    });

    beforeEach(() => {
        jest.clearAllMocks();

        readFileMock.mockImplementation(() => {
            return new Promise<void>((r) => r());
        });
        promisifyMock.mockImplementation(() => {
            throw new Error("promisify is not expected to be called any more");
        });
    });

    it("given promisify is used as expected in module (test will fail if beforeAll fails)", async () => {
        // Test will fail if beforeAll fails
        expect(true).toBeTruthy();
    });

    it("given readFilePromise when it is called then readFileMock is called with given parameters", async () => {
        await readFilePromise("test");
        expect(readFileMock).toBeCalledWith("test");
    });

    it("given readFileAsStringPromise when it is called then readFileMock is called with given parameters", async () => {
        readFileMock.mockImplementation(() => {
            return Promise.resolve(Buffer.from(""));
        });

        await readFileAsStringPromise("test");
        expect(readFileMock).toBeCalledWith("test");
    });

    it("given readFileAsStringPromise when it is called then returned buffer is stringified", async () => {
        readFileMock.mockImplementation(() => {
            return Promise.resolve(Buffer.from("testdata_ä", "utf8"));
        });

        const uut = await readFileAsStringPromise("test");
        expect(uut).toBe("testdata_ä");
    });

    it("given readFileAsStringPromise when it is called and different encoding has been passed then returned buffer is stringified with this encoding", async () => {
        readFileMock.mockImplementation(() => {
            return Promise.resolve(Buffer.from("testdata_ä", "utf8"));
        });

        const uut = await readFileAsStringPromise("test", "latin1");
        expect(uut).not.toBe("testdata_ä");
    });
});

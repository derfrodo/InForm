import { getTypescriptFilesPatterns } from "@src/arguments/FilePatterns";
import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { CliArgsValues } from "@src/common/types/CliArgsValues";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { performSteps } from "@src/steps";

jest.mock("@src/logging/getGeneratorLogger");
jest.mock("@src/arguments/getDefaultArgs", () => {
    const actuals = jest.requireActual("@src/arguments/getDefaultArgs");
    return {
        ...actuals,
        getDefaultArgs: jest.fn(),
    };
});

const getDefaultArgsBaseTests: typeof getDefaultArgs = () => {
    const result: ReturnType<typeof getDefaultArgs> = {
        loglevel: "info",
        srcFolder: "./testdata/graphqlTests",
        mappingFilesPattern: getTypescriptFilesPatterns(),
        globalSettingsFilesPattern: getTypescriptFilesPatterns(),
        programFilesPattern: getTypescriptFilesPatterns(),
        logAsts: false,
        fileEncoding: "utf-8",

        templatePartialsRecursive: true,
        templatePartialsPath: "./src/templates/muiDemoForms/partials",
        templatesPath: "./src/templates/muiDemoForms",
        templateGenerateOncePath: [],
        templateScaffoldPath: [],
        templateScaffoldOncePath: [],
    };
    return result;
};

const getDefaultArgsMock = getDefaultArgs as jest.MockedFunction<
    typeof getDefaultArgs
>;

describe("performSteps integtration tests", () => {
    // beforeAll(async () => {});

    beforeEach(async () => {
        jest.clearAllMocks();
        getDefaultArgsMock.mockImplementation(getDefaultArgsBaseTests);
    });

    it("Given performSteps exists When called Then it performs", async () => {
        const vargs: CliArgsValues = {
            ...getDefaultArgsBaseTests(),
        } as unknown as CliArgsValues;
        await performSteps(vargs);
    }, 15_000);

    it("Given performSteps exists When called Then it sends a greeting for creating modells", async () => {
        const vargs: CliArgsValues = {
            ...getDefaultArgsBaseTests(),
        } as unknown as CliArgsValues;
        await performSteps(vargs);
        expect(getGeneratorLogger().info).toBeCalledWith("Create modells...");
    }, 15000);

    it("Given performSteps exists When called Then it sends a greeting for initializing template", async () => {
        const vargs: CliArgsValues = {
            ...getDefaultArgsBaseTests(),
        } as unknown as CliArgsValues;
        await performSteps(vargs);
        expect(getGeneratorLogger().info).toBeCalledWith(
            expect.stringContaining("Hi from template initialization!")
        );
    }, 15000);

    it("Given performSteps exists When called Then it sends a greeting for applying magic", async () => {
        const vargs: CliArgsValues = {
            ...getDefaultArgsBaseTests(),
        } as unknown as CliArgsValues;
        await performSteps(vargs);
        expect(getGeneratorLogger().info).toBeCalledWith(
            expect.stringContaining("🧙‍♂️🧙‍♀️")
        );
    }, 15000);
});

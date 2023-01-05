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
        templatePartialsPath: ["./testdata/testTemplates/partials"],
        templatesPath: "./testdata/testTemplates",
        templateGenerateOncePath: [],
        templateScaffoldPath: [],
        templateScaffoldOncePath: [],
    };
    return result;
};
const getDefaultArgsMock = getDefaultArgs as jest.MockedFunction<
    typeof getDefaultArgs
>;

describe("performSteps integtration tests for templates", () => {
    // beforeAll(async () => {});

    beforeEach(async () => {
        jest.clearAllMocks();
        getDefaultArgsMock.mockImplementation(getDefaultArgsBaseTests);
    });

    it("Given performSteps exists When called AND nested partials shall be resolved Then nested partials will be resolved", async () => {
        const vargs: CliArgsValues = {
            ...getDefaultArgsBaseTests(),
        } as unknown as CliArgsValues;
        await performSteps(vargs);
        expect(getGeneratorLogger().info).toBeCalledWith(
            'Found template "nesttest" in file "testdata\\testTemplates\\partials\\nesttest\\nesttest.handlebars".'
        );
    }, 15000);
});

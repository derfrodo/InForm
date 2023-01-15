import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { getDefaultPerformStepsIntegrationTestsArgsBaseTests } from "@src/arguments/testDefaults/getDefaultPerformStepsIntegrationTestsArgsBaseTests";
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
const getDefaultArgsMock = getDefaultArgs as jest.MockedFunction<
    typeof getDefaultArgs
>;

describe("performSteps integtration tests for templates", () => {
    // beforeAll(async () => {});

    beforeEach(async () => {
        jest.clearAllMocks();
        getDefaultArgsMock.mockImplementation(
            getDefaultPerformStepsIntegrationTestsArgsBaseTests
        );
    });

    it("Given performSteps exists When called AND nested partials shall be resolved Then nested partials will be resolved", async () => {
        const vargs: CliArgsValues = {
            ...getDefaultPerformStepsIntegrationTestsArgsBaseTests(),
        } as unknown as CliArgsValues;
        await performSteps(vargs);
        const info = getGeneratorLogger().info;

        expect(info).toBeCalledWith(
            'Found template "nesttest" in file "testdata\\testTemplates\\partials\\nesttest\\nesttest.handlebars".'
        );
    }, 15000);
});

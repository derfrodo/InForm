import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { getDefaultPerformStepsIntegrationTestsArgsBaseTests } from "@src/arguments/testDefaults/getDefaultPerformStepsIntegrationTestsArgsBaseTests";
import { CliArgsValues } from "@src/common/types/CliArgsValues";
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

describe("performSteps aliasTests test", () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        getDefaultArgsMock.mockImplementation(() => ({
            ...getDefaultPerformStepsIntegrationTestsArgsBaseTests(),
            srcFolder: "./testdataWithAdditionalTests/aliasTests",
            templatesPath: "./testdataWithAdditionalTests/aliasTests/templates",
        }));
    });

    it("Given performSteps exists When called Then it performs", async () => {
        const vargs: CliArgsValues = {
            ...getDefaultArgs(),
        } as unknown as CliArgsValues;
        await performSteps(vargs);
    }, 15_000);
});

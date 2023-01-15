import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests } from "@src/arguments/testDefaults/getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests";
import { PromiseGenericParameter } from "@src/common/types/PromiseGenericParameter";
import { createInFormTypescriptProgram } from "@src/common/utils/createInFormProgram";
import { createStateStepsDefaults } from "@src/globalState/createStateStepsDefaults";
import { GeneratorState } from "@src/globalState/GeneratorState";
import { store } from "@src/globalState/store";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { searchGeneralSettings } from "@src/steps/searchGeneralSettings";
import { SEARCH_GENERAL_SETTINGS_ACTIONS } from "@src/steps/searchGeneralSettings/redux";

jest.mock("@src/logging/getGeneratorLogger");
jest.mock("@src/globalState/store");
const storeMock = store as jest.Mocked<typeof store>;


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

let program: PromiseGenericParameter<
    ReturnType<typeof createInFormTypescriptProgram>
> | null = null;
const argv = getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests();
const fsHelper = new FileSystemHelper();

describe("performGeneralSettingsSearch integtration tests", () => {
    beforeAll(async () => {
        program = await createInFormTypescriptProgram(argv, fsHelper);
    });

    beforeEach(async () => {
        jest.clearAllMocks();
        storeMock.getState.mockImplementation(() => {
            const result: GeneratorState = {
                common: {
                    cliArgs: argv,
                    programm: program,
                    inFormSourceFiles: null,
                },
                steps: {
                    ...createStateStepsDefaults(),
                },
            };
            return result;
        });
        getDefaultArgsMock.mockImplementation(getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests);
    });

    it("Given performGeneralSettingsSearch exists When called Then logger should be called with welcome message", async () => {
        await searchGeneralSettings();

        expect(getGeneratorLogger().info).toBeCalledWith(
            "Search for generalSettings..."
        );
    });

    it("Given performGeneralSettingsSearch exists When called Then it finds expected files as candidates", async () => {
        await searchGeneralSettings();

        const debug = getGeneratorLogger().debug;

        expect(debug).toBeCalledWith(
            `Files candidates resolved: `,
            expect.any(String)
        );

        const debugMock = debug as jest.MockedFunction<typeof debug>;
        const jsonizedData = debugMock.mock.calls[1][1];
        const data = JSON.parse(jsonizedData);
        const loggedcandidates = JSON.parse(data.fileCandidates);

        expect(loggedcandidates).toEqual(
            expect.arrayContaining([
                "./testdata/graphqlTests/formMappings/CreateUserMapping.ts",
                "./testdata/graphqlTests/formMappings/CreateUserMapping2.ts",
                "./testdata/graphqlTests/formMappings/FakeUserMapping.ts",
                "./testdata/graphqlTests/formMappings/UserMapping.ts",
                "./testdata/graphqlTests/formMappings/UserMapping2.ts",
                "./testdata/graphqlTests/generalSettings/FormGeneralSettings.ts",
                "./testdata/graphqlTests/graphql/generated.ts",
            ])
        );
    });

    it("Given performGeneralSettingsSearch exists When called Then it finds 16 files", async () => {
        await searchGeneralSettings();

        const info = getGeneratorLogger().info;

        expect(info).toBeCalledWith(
            "1 files contains general settings for in form."
        );
    });
    
    it("Given performGeneralSettingsSearch exists When called Then it saves a setting in store", async () => {
        const settings = await searchGeneralSettings();

        expect(storeMock.dispatch).toBeCalledWith(
            expect.objectContaining({
                type: SEARCH_GENERAL_SETTINGS_ACTIONS.SEARCH_GENERAL_SETTINGS_SET_GENERAL_SETTINGS,
                next: settings,
            })
        );
    });
});

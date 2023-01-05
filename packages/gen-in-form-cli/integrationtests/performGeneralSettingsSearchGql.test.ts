import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { getTypescriptFilesPatterns } from "@src/arguments/FilePatterns";
import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
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
const argv = getDefaultArgsBaseTests();
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
        getDefaultArgsMock.mockImplementation(getDefaultArgsBaseTests);
    });

    it("Given performGeneralSettingsSearch exists When called Then logger should be called with welcome message", async () => {
        await searchGeneralSettings();

        expect(getGeneratorLogger().info).toBeCalledWith(
            "Search for generalSettings..."
        );
    });

    it("Given performGeneralSettingsSearch exists When called Then it finds three files", async () => {
        await searchGeneralSettings();

        expect(getGeneratorLogger().info).toBeCalledWith(
            `Found ${16} files which may contain general settings for forms.`
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

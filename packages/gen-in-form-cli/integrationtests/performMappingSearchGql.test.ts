import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { getTypescriptFilesPatterns } from "@src/arguments/FilePatterns";
import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { PromiseGenericParameter } from "@src/common/types/PromiseGenericParameter";
import { createInFormTypescriptProgram } from "@src/common/utils/createInFormProgram";
import { LogTypescriptNodePrefix } from "@src/common/utils/logTypescriptNode";
import { createStateStepsDefaults } from "@src/globalState/createStateStepsDefaults";
import { store } from "@src/globalState/store";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { searchMappings } from "@src/steps/searchMappings";
import { InFormMappingInterfaceName } from "@src/steps/searchMappings/constants";

jest.mock("@src/logging/getGeneratorLogger");
jest.mock("@src/globalState/store");
const storeMock = store as jest.Mocked<typeof store>;

const getDefaultArgsBaseTests: typeof getDefaultArgs = () => {
    const result: ReturnType<typeof getDefaultArgs> = {
        loglevel: "info",
        srcFolder: "./testdata/graphqlTests",
        mappingFilesPattern: ["Mapping.ts"],
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

describe("performMappingSearch Gql integtration tests", () => {
    beforeAll(async () => {
        program = await createInFormTypescriptProgram(argv, fsHelper);
    });

    beforeEach(async () => {
        jest.clearAllMocks();
        storeMock.getState.mockImplementation(() => {
            return {
                common: {
                    cliArgs: argv,
                    programm: program,
                    inFormSourceFiles: null,
                },
                steps: {
                    ...createStateStepsDefaults(),
                },
            };
        });
        getDefaultArgsMock.mockImplementation(getDefaultArgsBaseTests);
    });

    it("Given performMappingSearch exists When called Then logger should be called with welcome message", async () => {
        await searchMappings();

        expect(getGeneratorLogger().info).toBeCalledWith(
            `Search for files with interfaces which extend ${InFormMappingInterfaceName} from runtime...`
        );
    });

    it("Given performMappingSearch exists When called Then it finds three files", async () => {
        await searchMappings();

        expect(getGeneratorLogger().info).toBeCalledWith(
            `Found ${3} files which may contain maps for forms.`
        );
    });

    it("Given performMappingSearch exists When called And logging ast is set to true Then it logs ast", async () => {
        const info = getGeneratorLogger().info as jest.MockedFunction<
            ReturnType<typeof getGeneratorLogger>["info"]
        >;

        info.mockImplementation((...args) => {
            if (args[0] === LogTypescriptNodePrefix) {
                console.log(...args, new Error().stack);
            }
        });

        await searchMappings();
    });
});

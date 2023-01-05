import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { getTypescriptFilesPatterns } from "@src/arguments/FilePatterns";
import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { commonActionCreators } from "@src/common/redux";
import { PromiseGenericParameter } from "@src/common/types/PromiseGenericParameter";
import { createInFormTypescriptProgram } from "@src/common/utils/createInFormProgram";
import { store } from "@src/globalState/store";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { searchMappings } from "@src/steps/searchMappings";
import { InFormMappingInterfaceName } from "@src/steps/searchMappings/constants";

jest.mock("@src/logging/getGeneratorLogger");

const getDefaultArgsBaseTests: typeof getDefaultArgs = () => {
    const result: ReturnType<typeof getDefaultArgs> = {
        loglevel: "info",
        srcFolder: "./testdata/graphqlComplexerTests",
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

describe("performMappingSearch Gql complexer integtration tests", () => {
    beforeAll(async () => {
        program = await createInFormTypescriptProgram(argv, fsHelper);
    });

    beforeEach(async () => {
        jest.clearAllMocks();
        getDefaultArgsMock.mockImplementation(getDefaultArgsBaseTests);
    });

    it("Given performMappingSearch exists When called Then logger should be called with welcome message", async () => {
        store.dispatch(commonActionCreators.setCliArgs(argv));
        store.dispatch(commonActionCreators.setProgramm(program));

        await searchMappings();

        const currentState = store.getState();

        console.log("Proceed here! ", currentState);
        expect(getGeneratorLogger().info).toBeCalledWith(
            `Search for files with interfaces which extend ${InFormMappingInterfaceName} from runtime...`
        );
    });
});

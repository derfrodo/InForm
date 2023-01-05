import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { getTypescriptFilesPatterns } from "@src/arguments/FilePatterns";
import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { InFormRuntimeModuleName } from "@src/common/constants";
import { PromiseGenericParameter } from "@src/common/types/PromiseGenericParameter";
import { createInFormTypescriptProgram } from "@src/common/utils/createInFormProgram";
import { getOrCreateInFormsSourceFile } from "@src/common/utils/getOrCreateInFormsSourceFile";
import { getInterfacesOfTypeFromSourceFile } from "@src/common/utils/resolveInterfacesOfType/getInterfacesOfTypeFromSourceFile";
import { store } from "@src/globalState/store";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { getSearchMappingsDefaultState } from "@src/steps/searchMappings/redux";
import { InFormMappingInterfaceName } from "../constants";
import { getFormMappingsFromFile } from "./getFormMappingsFromFile";

jest.mock("@src/logging/getGeneratorLogger");
jest.mock("@src/globalState/store");
const storeMock = store as jest.Mocked<typeof store>;

const getDefaultArgsBaseTests: typeof getDefaultArgs = () => {
    const result: ReturnType<typeof getDefaultArgs> = {
        loglevel: "info",
        templatePartialsRecursive: true,
        srcFolder: "./testdata/graphqlTests",
        mappingFilesPattern: ["Mapping.ts"],
        globalSettingsFilesPattern: getTypescriptFilesPatterns(),
        programFilesPattern: getTypescriptFilesPatterns(),
        logAsts: false,
        fileEncoding: "utf-8",
        templatePartialsPath: [],
        templatesPath: [],
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

describe("getFormMappingsFromFile Gql integtration tests", () => {
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
                    mappingSearch: getSearchMappingsDefaultState(),
                },
            };
        });
        getDefaultArgsMock.mockImplementation(getDefaultArgsBaseTests);
    });

    it("GIVEN program has been prepared AND state is initialized WHEN getFormMappingsFromFile is called with testfilepath THEN logger debug the checking of the file", async () => {
        const filepath = "testdata/graphqlTests/formMappings/UserMapping.ts";
        const file = await getOrCreateInFormsSourceFile(filepath);

        await getFormMappingsFromFile(file);

        expect(getGeneratorLogger().debug).toBeCalledWith(
            `Check if file ${filepath} contains forms map ...`
        );
    });

    it("GIVEN program has been prepared AND state is initialized WHEN getFormMappingsFromFile is called with UserMapping THEN it resolves 1 interfaces.", async () => {
        const filepath = "testdata/graphqlTests/formMappings/UserMapping.ts";
        const file = await getOrCreateInFormsSourceFile(filepath);
        await getFormMappingsFromFile(file);

        expect(getGeneratorLogger().debug).toBeCalledWith(
            `File ${filepath} contains ${1} interfaces which extend ${InFormMappingInterfaceName} ...`
        );
    });

    describe.each([
        ["testdata/graphqlTests/formMappings/UserMapping.ts", 1],
        ["testdata/graphqlTests/formMappings/FakeUserMapping.ts", 0],
    ])("Check for mapping interfaces in %s", (filepath, numberOfInterfaces) => {
        it(`GIVEN program has been prepared AND state is initialized WHEN getFormMappingsFromFile is called with ${filepath} THEN it resolves ${numberOfInterfaces} interfaces.`, async () => {
            const file = await getOrCreateInFormsSourceFile(filepath);
            await getFormMappingsFromFile(file);

            expect(getGeneratorLogger().debug).toBeCalledWith(
                numberOfInterfaces === 0
                    ? `File ${filepath} does not import ${InFormMappingInterfaceName}. Therefore it can not contain any declarations.`
                    : `File ${filepath} contains ${numberOfInterfaces} interfaces which extend ${InFormMappingInterfaceName} ...`
            );
        });

        it(`GIVEN program has been prepared AND state is initialized WHEN getFormMappingsFromFile is called with ${filepath} THEN it resolves ${numberOfInterfaces} interfaces.`, async () => {
            const file = await getOrCreateInFormsSourceFile(filepath);
            const fileMappings = await getFormMappingsFromFile(file);

            const fileMappings0 = await getInterfacesOfTypeFromSourceFile(
                file,
                {
                    baseInterfaceName: InFormMappingInterfaceName,
                    moduleName: InFormRuntimeModuleName,
                }
            );

            expect(fileMappings.mappings.length).toBe(
                fileMappings0.data.length
            );
        });
    });
});

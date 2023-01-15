import { getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests } from "@src/arguments/testDefaults/getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { resolveFileCandidates } from "./resolveFileCandidates";

jest.mock("@src/logging/getGeneratorLogger");

describe("resolveFileCandidates module tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("given FileSystemHelper is not mocked when called with default patterns for search integration tests when resolveFileCandidates is called then logs that files are resolved", async () => {
        const argv =
            getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests();
        await resolveFileCandidates(
            argv.srcFolder,
            argv.globalSettingsFilesPattern
        );
        const debug = getGeneratorLogger().debug;

        expect(debug).toBeCalledWith(
            `Files candidates resolved: `,
            expect.any(String)
        );
    });

    it("given FileSystemHelper is not mocked when called with default patterns for search integration tests when resolveFileCandidates is called then logged files matches expectation", async () => {
        const argv =
            getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests();
        await resolveFileCandidates(
            argv.srcFolder,
            argv.globalSettingsFilesPattern
        );
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

    it("given FileSystemHelper is not mocked when called with default patterns for search integration tests when resolveFileCandidates is called then candidates match expectation", async () => {
        const argv =
            getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests();
        const candidates = await resolveFileCandidates(
            argv.srcFolder,
            argv.globalSettingsFilesPattern
        );

        expect(candidates).toEqual(
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
});

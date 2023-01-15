import { getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests } from "@src/arguments/testDefaults/getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { resolveFileCandidates } from "./resolveFileCandidates";

jest.mock("@src/logging/getGeneratorLogger");

describe("resolveFileCandidates module tests", () => {
    beforeAll(() => {});

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("given FileSystemHelper is not mocked when called with default patterns for search integration tests when resolveFileCandidates is called then files according to existing files in testdata are resolved", async () => {
        const argv =
            getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests();
        const candidates = await resolveFileCandidates(
            argv.srcFolder,
            argv.globalSettingsFilesPattern
        );
        const debug = getGeneratorLogger().debug;

        // Test will fail if beforeAll fails
        expect(debug).toBeCalledWith(
            `Files candidates resolved: `,
            '{"fileCandidates":"[\\"./testdata/graphqlTests/formMappings/CreateUserMapping.ts\\",\\"./testdata/graphqlTests/formMappings/CreateUserMapping2.ts\\",\\"./testdata/graphqlTests/formMappings/FakeUserMapping.ts\\",\\"./testdata/graphqlTests/formMappings/UserMapping.ts\\",\\"./testdata/graphqlTests/formMappings/UserMapping2.ts\\",\\"./testdata/graphqlTests/generalSettings/FormGeneralSettings.ts\\",\\"./testdata/graphqlTests/graphql/generated.ts\\",\\"./testdata/graphqlTests/formMappings/CreateUserMapping2.generated.tsx\\",\\"./testdata/graphqlTests/formMappings/CreateUserMapping2Types.generated.tsx\\",\\"./testdata/graphqlTests/formMappings/CreateUserMapping2mui.generated.tsx\\",\\"./testdata/graphqlTests/formMappings/UserMapping.generated.tsx\\",\\"./testdata/graphqlTests/formMappings/UserMapping2.generated.tsx\\",\\"./testdata/graphqlTests/formMappings/UserMapping2Types.generated.tsx\\",\\"./testdata/graphqlTests/formMappings/UserMapping2mui.generated.tsx\\",\\"./testdata/graphqlTests/formMappings/UserMappingTypes.generated.tsx\\",\\"./testdata/graphqlTests/formMappings/UserMappingmui.generated.tsx\\"]"}'
        );
    });
});

import { getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests } from "@src/arguments/testDefaults/getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { resolveFileCandidates } from "./resolveFileCandidates";

jest.mock("@src/logging/getGeneratorLogger");

describe("resolveFileCandidates module tests", () => {
    beforeAll(() => {});

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("given FileSystemHelper is not mocked when called with default patterns for search integration tests when resolveFileCandidates is called then magic happens", async () => {
        const argv =
            getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests();
        const candidates = await resolveFileCandidates(
            argv.srcFolder,
            argv.globalSettingsFilesPattern
        );
        const debug = getGeneratorLogger().debug;

        // Test will fail if beforeAll fails
        expect(debug).toBeCalledWith(`Files candidates resolved: `);
    });
});

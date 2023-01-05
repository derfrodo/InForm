import { CliArgsValues } from "@src/common/types/CliArgsValues";
import { createFormModells } from "./createFormModells";
import { doMagic } from "./doMagic";
import { initializeStore } from "./initializeStore";
import { initializeTemplates } from "./initializeTemplating";
import { resolveTemplateModels } from "./resolveTemplateModels";
import { searchGeneralSettings } from "./searchGeneralSettings";
import { searchMappings } from "./searchMappings";

export async function performSteps(argv: CliArgsValues): Promise<void> {
    await initializeStore(argv);

    // Step 1:
    // Search for general settings
    await searchGeneralSettings();

    // Step 2:
    // Search for matching types & Interfaces
    await searchMappings();

    // Step 3:
    // Create model (TODO: Filter mappings...)
    await createFormModells();

    // Step 4:
    // Initialize Templating Engine
    await initializeTemplates();

    // Step 5:
    // Transfer Model in Metamodell
    await resolveTemplateModels();

    // Step 6:
    // Generate Code using Metamodell (5) and Templating Engine (5)
    await doMagic();

    // Step 7:
    // Say Bye
}

import type { CliArgs } from "@src/common/types/CliArgs";
import type { InFormTypescriptProgram } from "@src/common/types/InFormTypescriptProgram";
import { ResolvedSourceFiles } from "../types/ResolvedSourceFiles";

export interface State {
    cliArgs: CliArgs | null;
    programm: InFormTypescriptProgram | null;

    inFormSourceFiles: ResolvedSourceFiles | null;
}

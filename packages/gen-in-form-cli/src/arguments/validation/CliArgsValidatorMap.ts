import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import { InFormCliArguments } from "../../common/types/InFormCliArguments";

export interface CliArgsValidatorMap extends InFormMapping<InFormCliArguments> {
    name: "CliArgsValidator";
}

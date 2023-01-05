import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import type { Details1 } from "./Details1";
import type { Input1 } from "./Input1";

export interface Map1a extends InFormMapping<Details1, Input1> {
    detailsToInputMappings: {};
}

export type Map1b = InFormMapping<Details1, Input1>;

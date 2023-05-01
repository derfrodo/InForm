import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import { TestObj } from "./TestObj";

export interface SimpleTestMap extends InFormMapping<TestObj> {
    name: "TestObj";
}

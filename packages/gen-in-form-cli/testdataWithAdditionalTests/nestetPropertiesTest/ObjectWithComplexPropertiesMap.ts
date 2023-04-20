import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import { ObjectWithComplexProperties } from "./ObjectWithComplexProperties";

export interface AliasForTestObjMap extends InFormMapping<ObjectWithComplexProperties> {
    name: "ObjectWithComplexProperties";
}

import {
    GroupAndOrderTypes,
    InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import { TestDetailsObj, TestObj } from "./TestObj";

const groupAndOrderFields: GroupAndOrderTypes<TestObj> = {
    fields: {
        hideMe: { isHidden: true },
        name0: { ordinal: 1 },
        name: { ordinal: 10 },
    },
};

export interface SimpleTestMap extends InFormMapping<TestObj> {
    name: "TestObj";
    groupAndOrderFields: typeof groupAndOrderFields;
}

export interface SimpleTestMap2 extends InFormMapping<TestObj, TestDetailsObj> {
    name: "TestObjWDetails";
    groupAndOrderFields: typeof groupAndOrderFields;
}

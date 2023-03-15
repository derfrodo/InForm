import { InFormMapping } from "@derfrodo/gen-in-form-runtime";

type SomeType = {
    prop1: string;
    prop2: string;
};

type PickType = Pick<SomeType, "prop1">;

export interface PickMap extends InFormMapping<PickType> {
    name: "PickMapped";
}

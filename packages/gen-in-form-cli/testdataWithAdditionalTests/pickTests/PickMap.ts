import { InFormMapping } from "@derfrodo/gen-in-form-runtime";

type SomeType = {
    prop1: string;
    prop2: string;
    prop3: string;
};

type PickType = Pick<SomeType, "prop1" | "prop2">;

export interface PickMap extends InFormMapping<PickType> {
    name: "PickMapped";
}

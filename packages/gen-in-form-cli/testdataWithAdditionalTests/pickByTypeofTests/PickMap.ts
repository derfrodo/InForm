import { InFormMapping } from "@derfrodo/gen-in-form-runtime";

type SomeType = {
    prop1: string;
    prop2: string;
    prop3: string;
};

type PickByTypeofType = Pick<SomeType, "prop1" | "prop2">;

function doWithReturn(): PickByTypeofType {
    return {
        prop1: "DA",
        prop2: "d"
    }
}

type MapType= ReturnType<typeof doWithReturn>;
export interface PickMap extends InFormMapping<MapType> {
    name: "PickMapped";
}

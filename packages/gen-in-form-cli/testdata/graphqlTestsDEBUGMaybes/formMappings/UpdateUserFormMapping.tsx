import {
    InFormMapping,
    GroupAndOrderTypes,
} from "@derfrodo/gen-in-form-runtime";
import { GetUserDetailQuery, UpdateUserInput } from "../graphql/generated";

const test: GroupAndOrderTypes<UpdateUserInput> = {
    fields: {
        id: { ordinal: 1, isHidden: true },
        firstName: { ordinal: 2 },
        lastName: { ordinal: 3 },
        gender: { ordinal: 3 },
        birthday: { ordinal: 4 },
        identityCardExpires: { ordinal: 5 },
        weight: { ordinal: 6 },
    },
};

export interface UpdateUserFormMapping
    extends InFormMapping<
        UpdateUserInput,
        GetUserDetailQuery["userDetail"] & {}
    > {
    name: "UpdateUser";
    groupAndOrderFields: typeof test;
}

import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import { CreateUserInput } from "../graphql/generated";

export interface UserMapping extends InFormMapping<CreateUserInput> {
    detailsToInputMappings: {};
}

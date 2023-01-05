import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import { User, CreateUserInput } from "../graphql/generated";

export interface UserMapping extends InFormMapping<CreateUserInput, User> {
    detailsToInputMappings: {};
}
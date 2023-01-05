import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import { CreateUserInput, GetMeQuery } from "../../graphqlComplexerTests/graphql/generated";

export interface UserMapping2 extends InFormMapping<CreateUserInput, GetMeQuery["me"] & {}> {
    detailsToInputMappings: {};
}

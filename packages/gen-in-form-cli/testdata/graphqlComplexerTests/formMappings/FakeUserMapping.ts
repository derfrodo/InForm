import { User, CreateUserInput } from "../graphql/generated";

interface InFormMapping<T, T2> {
    iAmJustAFakeInterfaceWithSameName: "And I should be ignored";
}

export interface FakeUserMapping extends InFormMapping<CreateUserInput, User> {
    detailsToInputMappings: {};
}

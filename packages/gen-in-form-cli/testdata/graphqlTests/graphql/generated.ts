import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type Contact = {
    __typename?: "Contact";
    displayName: Scalars["String"];
    firstName: Scalars["String"];
    id: Scalars["String"];
    lastName: Scalars["String"];
};

export type CreateUserInput = {
    displayName: Scalars["String"];
    firstName: Scalars["String"];
    gender: Genders;
    id?: Scalars["String"];
    lastName: Scalars["String"];
};

export enum Genders {
    D = "D",
    M = "M",
    None = "NONE",
    W = "W",
}

export type Mutation = {
    __typename?: "Mutation";
    createUser?: Maybe<User>;
};

export type MutationCreateUserArgs = {
    user: CreateUserInput;
};

export type Query = {
    __typename?: "Query";
    contact?: Maybe<Contact>;
    contacts?: Maybe<Array<Maybe<Contact>>>;
    me?: Maybe<User>;
    user?: Maybe<User>;
    users?: Maybe<Array<Maybe<User>>>;
};

export type QueryContactArgs = {
    id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUserArgs = {
    id?: InputMaybe<Scalars["ID"]>;
};

export type User = {
    __typename?: "User";
    displayName: Scalars["String"];
    firstName: Scalars["String"];
    gender: Genders;
    id: Scalars["String"];
    lastName: Scalars["String"];
};

export type CreateUserMutationVariables = Exact<{
    input: CreateUserInput;
}>;

export type CreateUserMutation = {
    __typename?: "Mutation";
    newUser?: {
        __typename?: "User";
        displayName: string;
        id: string;
        lastName: string;
        firstName: string;
    } | null;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
    __typename?: "Query";
    me?: { __typename?: "User"; displayName: string } | null;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
    __typename?: "Query";
    allUsers?: Array<{
        __typename?: "User";
        displayName: string;
        id: string;
    } | null> | null;
};

export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
        newUser: createUser(user: $input) {
            displayName
            id
            lastName
            firstName
        }
    }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
    CreateUserMutation,
    CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateUserMutation,
        CreateUserMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
        CreateUserDocument,
        options
    );
}
export type CreateUserMutationHookResult = ReturnType<
    typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
    Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
    CreateUserMutation,
    CreateUserMutationVariables
>;
export const GetMeDocument = gql`
    query getMe {
        me: me {
            displayName
        }
    }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
    baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
        GetMeDocument,
        options
    );
}
export function useGetMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
        GetMeDocument,
        options
    );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<
    GetMeQuery,
    GetMeQueryVariables
>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
        allUsers: users {
            displayName
            id
        }
    }
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetAllUsersQuery,
        GetAllUsersQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
        GetAllUsersDocument,
        options
    );
}
export function useGetAllUsersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAllUsersQuery,
        GetAllUsersQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
        GetAllUsersDocument,
        options
    );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
    typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersQueryResult = Apollo.QueryResult<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
>;

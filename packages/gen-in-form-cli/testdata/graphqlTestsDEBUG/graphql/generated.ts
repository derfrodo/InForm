import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  contact?: Maybe<Contact>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryContactArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  /** The Id of the user. */
  id: Scalars['String'];
  firstName: Scalars['String'];
  /** The name of the user. */
  lastName: Scalars['String'];
  gender: Genders;
  birthday: Scalars['DateTime'];
  identityCardExpires: Scalars['DateTime'];
  street: Scalars['String'];
  streetNumber: Scalars['Int'];
  weight: Scalars['Int'];
  /** How old is the user? */
  age?: Maybe<Scalars['Int']>;
  /** The user is called like... */
  displayName?: Maybe<Scalars['String']>;
};

export enum Genders {
  None = 'NONE',
  M = 'M',
  W = 'W',
  D = 'D'
}

export type Contact = {
  __typename?: 'Contact';
  /** The Id of the Contact. */
  id: Scalars['String'];
  /** The name of the Contact. */
  displayName: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  birthday: Scalars['DateTime'];
  gender: Genders;
  /** How old is the Contact? */
  age?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  createContact?: Maybe<Contact>;
  updateContact?: Maybe<Contact>;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};


export type MutationCreateContactArgs = {
  contact: CreateContactInput;
};


export type MutationUpdateContactArgs = {
  contact: UpdateContactInput;
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Genders;
  birthday: Scalars['DateTime'];
  identityCardExpires: Scalars['DateTime'];
  street: Scalars['String'];
  streetNumber: Scalars['Int'];
  weight: Scalars['Int'];
};

export type UpdateUserInput = {
  id?: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Genders;
  birthday: Scalars['DateTime'];
  identityCardExpires: Scalars['DateTime'];
  street: Scalars['String'];
  streetNumber: Scalars['Int'];
  weight: Scalars['Int'];
};

export type CreateContactInput = {
  displayName: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  birthday: Scalars['DateTime'];
  gender: Genders;
};

export type UpdateContactInput = {
  id?: Scalars['String'];
  displayName: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  birthday: Scalars['DateTime'];
  gender: Genders;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', newUser?: { __typename?: 'User', birthday: any, displayName?: string | null, id: string, lastName: string, firstName: string, identityCardExpires: any } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers?: Array<{ __typename?: 'User', id: string, age?: number | null, displayName?: string | null, birthday: any, gender: Genders, identityCardExpires: any } | null> | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', age?: number | null, birthday: any, displayName?: string | null, street: string, id: string, gender: Genders, lastName: string, firstName: string, identityCardExpires: any } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updatedUser?: { __typename?: 'User', birthday: any, displayName?: string | null, id: string, lastName: string, firstName: string, identityCardExpires: any } | null };


export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  newUser: createUser(user: $input) {
    birthday
    displayName
    id
    lastName
    firstName
    identityCardExpires
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

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
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  allUsers: users {
    id
    age
    displayName
    birthday
    gender
    identityCardExpires
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
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetMeDocument = gql`
    query getMe {
  me: me {
    age
    birthday
    displayName
    street
    id
    gender
    lastName
    firstName
    identityCardExpires
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
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updatedUser: updateUser(user: $input) {
    birthday
    displayName
    id
    lastName
    firstName
    identityCardExpires
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
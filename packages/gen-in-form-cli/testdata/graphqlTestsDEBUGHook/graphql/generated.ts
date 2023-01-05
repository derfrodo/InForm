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

export type Adress = {
  __typename?: 'Adress';
  id: Scalars['String'];
  street: Scalars['String'];
  number: Scalars['Int'];
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  birthday: Scalars['DateTime'];
  gender: Genders;
};

export type CreateAdressInput = {
  street: Scalars['String'];
  number: Scalars['Int'];
};

export type CreateContactInput = {
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  birthday: Scalars['DateTime'];
  gender: Genders;
  adress?: InputMaybe<CreateAdressInput>;
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Genders;
  birthday?: InputMaybe<Scalars['DateTime']>;
  identityCardExpires?: InputMaybe<Scalars['DateTime']>;
  weight: Scalars['Float'];
};

export enum Genders {
  None = 'NONE',
  M = 'M',
  W = 'W',
  D = 'D'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  createContact?: Maybe<Contact>;
  updateContact?: Maybe<Contact>;
  updateAdress?: Maybe<Adress>;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
  adress: CreateAdressInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
  adress: UpdateAdressInput;
};


export type MutationCreateContactArgs = {
  contact: CreateContactInput;
};


export type MutationUpdateContactArgs = {
  contact: UpdateContactInput;
};


export type MutationUpdateAdressArgs = {
  adress: UpdateAdressInput;
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

export type UpdateAdressInput = {
  id: Scalars['String'];
  street: Scalars['String'];
  number: Scalars['Int'];
};

export type UpdateContactInput = {
  id?: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  birthday: Scalars['DateTime'];
  gender: Genders;
};

export type UpdateUserInput = {
  id?: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Genders;
  birthday?: InputMaybe<Scalars['DateTime']>;
  identityCardExpires?: InputMaybe<Scalars['DateTime']>;
  weight: Scalars['Float'];
  adress?: InputMaybe<CreateAdressInput>;

};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Genders;
  birthday?: Maybe<Scalars['DateTime']>;
  identityCardExpires?: Maybe<Scalars['DateTime']>;
  weight: Scalars['Float'];
  age?: Maybe<Scalars['Int']>;
  adress?: Maybe<Adress>;
  displayName?: Maybe<Scalars['String']>;
};

export type CreateContactMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact?: { __typename?: 'Contact', id: string, lastName: string, firstName: string, birthday: any, gender: Genders } | null };

export type GetContactQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetContactQuery = { __typename?: 'Query', contact?: { __typename?: 'Contact', id: string, lastName: string, firstName: string, birthday: any, gender: Genders } | null };

export type GetContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContactsQuery = { __typename?: 'Query', contacts?: Array<{ __typename?: 'Contact', id: string, lastName: string, firstName: string, birthday: any, gender: Genders } | null> | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
  adress: CreateAdressInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', newUser?: { __typename?: 'User', birthday?: any | null, displayName?: string | null, id: string, lastName: string, firstName: string, identityCardExpires?: any | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
  adress: UpdateAdressInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updatedUser?: { __typename?: 'User', birthday?: any | null, displayName?: string | null, id: string, lastName: string, firstName: string, identityCardExpires?: any | null } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers?: Array<{ __typename?: 'User', id: string, age?: number | null, displayName?: string | null, birthday?: any | null, gender: Genders, identityCardExpires?: any | null } | null> | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, age?: number | null, birthday?: any | null, displayName?: string | null, gender: Genders, lastName: string, firstName: string, identityCardExpires?: any | null } | null };

export type GetUserDetailQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetUserDetailQuery = { __typename?: 'Query', userDetail?: { __typename?: 'User', id: string, firstName: string, lastName: string, weight: number, gender: Genders, birthday?: any | null, identityCardExpires?: any | null, age?: number | null, displayName?: string | null } | null };


export const CreateContactDocument = gql`
    mutation createContact($input: CreateContactInput!) {
  createContact(contact: $input) {
    id
    lastName
    firstName
    birthday
    gender
  }
}
    `;
export type CreateContactMutationFn = Apollo.MutationFunction<CreateContactMutation, CreateContactMutationVariables>;

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContactMutation, CreateContactMutationVariables>(CreateContactDocument, options);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = Apollo.MutationResult<CreateContactMutation>;
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<CreateContactMutation, CreateContactMutationVariables>;
export const GetContactDocument = gql`
    query getContact($id: ID) {
  contact(id: $id) {
    id
    lastName
    firstName
    birthday
    gender
  }
}
    `;

/**
 * __useGetContactQuery__
 *
 * To run a query within a React component, call `useGetContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetContactQuery(baseOptions?: Apollo.QueryHookOptions<GetContactQuery, GetContactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactQuery, GetContactQueryVariables>(GetContactDocument, options);
      }
export function useGetContactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContactQuery, GetContactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactQuery, GetContactQueryVariables>(GetContactDocument, options);
        }
export type GetContactQueryHookResult = ReturnType<typeof useGetContactQuery>;
export type GetContactLazyQueryHookResult = ReturnType<typeof useGetContactLazyQuery>;
export type GetContactQueryResult = Apollo.QueryResult<GetContactQuery, GetContactQueryVariables>;
export const GetContactsDocument = gql`
    query getContacts {
  contacts {
    id
    lastName
    firstName
    birthday
    gender
  }
}
    `;

/**
 * __useGetContactsQuery__
 *
 * To run a query within a React component, call `useGetContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContactsQuery(baseOptions?: Apollo.QueryHookOptions<GetContactsQuery, GetContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactsQuery, GetContactsQueryVariables>(GetContactsDocument, options);
      }
export function useGetContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContactsQuery, GetContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactsQuery, GetContactsQueryVariables>(GetContactsDocument, options);
        }
export type GetContactsQueryHookResult = ReturnType<typeof useGetContactsQuery>;
export type GetContactsLazyQueryHookResult = ReturnType<typeof useGetContactsLazyQuery>;
export type GetContactsQueryResult = Apollo.QueryResult<GetContactsQuery, GetContactsQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!, $adress: CreateAdressInput!) {
  newUser: createUser(user: $input, adress: $adress) {
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
 *      adress: // value for 'adress'
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
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!, $adress: UpdateAdressInput!) {
  updatedUser: updateUser(user: $input, adress: $adress) {
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
 *      adress: // value for 'adress'
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
    id
    age
    birthday
    displayName
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
export const GetUserDetailDocument = gql`
    query getUserDetail($id: ID) {
  userDetail: user(id: $id) {
    id
    firstName
    lastName
    weight
    gender
    birthday
    identityCardExpires
    age
    displayName
  }
}
    `;

/**
 * __useGetUserDetailQuery__
 *
 * To run a query within a React component, call `useGetUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserDetailQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
      }
export function useGetUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
        }
export type GetUserDetailQueryHookResult = ReturnType<typeof useGetUserDetailQuery>;
export type GetUserDetailLazyQueryHookResult = ReturnType<typeof useGetUserDetailLazyQuery>;
export type GetUserDetailQueryResult = Apollo.QueryResult<GetUserDetailQuery, GetUserDetailQueryVariables>;
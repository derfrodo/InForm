import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
Prepme
Pre me, too
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
  __typename?: 'Contact';
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type CreateUserInput = {
  age: Scalars['Int'];
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  gender: Genders;
  id?: Scalars['String'];
  lastName: Scalars['String'];
};

export enum Genders {
  D = 'D',
  M = 'M',
  None = 'NONE',
  W = 'W'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  contact?: Maybe<Contact>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryContactArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int'];
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  gender: Genders;
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', newUser?: { __typename?: 'User', displayName: string, id: string, lastName: string, firstName: string } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', displayName: string } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers?: Array<{ __typename?: 'User', displayName: string, id: string } | null> | null };


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
{"kind":"Document","definitions":[{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"author","loc":{"start":11,"end":17}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email","loc":{"start":18,"end":23}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":25,"end":31}},"loc":{"start":25,"end":31}},"loc":{"start":25,"end":32}},"directives":[],"loc":{"start":18,"end":32}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name","loc":{"start":34,"end":38}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":40,"end":46}},"loc":{"start":40,"end":46}},"directives":[],"loc":{"start":34,"end":46}}],"repeatable":false,"locations":[{"kind":"Name","value":"FIELD_DEFINITION","loc":{"start":51,"end":67}}],"loc":{"start":0,"end":67}},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"inFormLength","loc":{"start":80,"end":92}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"max","loc":{"start":93,"end":96}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":98,"end":101}},"loc":{"start":98,"end":101}},"directives":[],"loc":{"start":93,"end":101}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"min","loc":{"start":103,"end":106}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":108,"end":111}},"loc":{"start":108,"end":111}},"directives":[],"loc":{"start":103,"end":111}}],"repeatable":false,"locations":[{"kind":"Name","value":"FIELD_DEFINITION","loc":{"start":116,"end":132}},{"kind":"Name","value":"INPUT_FIELD_DEFINITION","loc":{"start":135,"end":157}}],"loc":{"start":69,"end":157}},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"inFormRange","loc":{"start":170,"end":181}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"max","loc":{"start":182,"end":185}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":187,"end":190}},"loc":{"start":187,"end":190}},"directives":[],"loc":{"start":182,"end":190}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"min","loc":{"start":192,"end":195}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":197,"end":200}},"loc":{"start":197,"end":200}},"directives":[],"loc":{"start":192,"end":200}}],"repeatable":false,"locations":[{"kind":"Name","value":"INPUT_FIELD_DEFINITION","loc":{"start":205,"end":227}}],"loc":{"start":159,"end":227}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Contact","loc":{"start":234,"end":241}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"displayName","loc":{"start":246,"end":257}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":259,"end":265}},"loc":{"start":259,"end":265}},"loc":{"start":259,"end":266}},"directives":[],"loc":{"start":246,"end":266}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"firstName","loc":{"start":269,"end":278}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":280,"end":286}},"loc":{"start":280,"end":286}},"loc":{"start":280,"end":287}},"directives":[],"loc":{"start":269,"end":287}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":290,"end":292}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":294,"end":300}},"loc":{"start":294,"end":300}},"loc":{"start":294,"end":301}},"directives":[],"loc":{"start":290,"end":301}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"lastName","loc":{"start":304,"end":312}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":314,"end":320}},"loc":{"start":314,"end":320}},"loc":{"start":314,"end":321}},"directives":[],"loc":{"start":304,"end":321}}],"loc":{"start":229,"end":323}},"a: \"[object Object]\", b: \"4\", c: \"[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]\"",{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"Genders","loc":{"start":471,"end":478}},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"D","loc":{"start":483,"end":484}},"directives":[],"loc":{"start":483,"end":484}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"M","loc":{"start":487,"end":488}},"directives":[],"loc":{"start":487,"end":488}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"NONE","loc":{"start":491,"end":495}},"directives":[],"loc":{"start":491,"end":495}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"W","loc":{"start":498,"end":499}},"directives":[],"loc":{"start":498,"end":499}}],"loc":{"start":466,"end":501}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation","loc":{"start":508,"end":516}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createUser","loc":{"start":521,"end":531}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"user","loc":{"start":532,"end":536}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput","loc":{"start":538,"end":553}},"loc":{"start":538,"end":553}},"loc":{"start":538,"end":554}},"directives":[],"loc":{"start":532,"end":554}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":557,"end":561}},"loc":{"start":557,"end":561}},"directives":[],"loc":{"start":521,"end":561}}],"loc":{"start":503,"end":563}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":570,"end":575}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"contact","loc":{"start":580,"end":587}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":588,"end":590}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":592,"end":594}},"loc":{"start":592,"end":594}},"directives":[],"loc":{"start":588,"end":594}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Contact","loc":{"start":597,"end":604}},"loc":{"start":597,"end":604}},"directives":[],"loc":{"start":580,"end":604}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"contacts","loc":{"start":607,"end":615}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Contact","loc":{"start":618,"end":625}},"loc":{"start":618,"end":625}},"loc":{"start":617,"end":626}},"directives":[],"loc":{"start":607,"end":626}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"me","loc":{"start":629,"end":631}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":633,"end":637}},"loc":{"start":633,"end":637}},"directives":[],"loc":{"start":629,"end":637}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"user","loc":{"start":640,"end":644}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":645,"end":647}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":649,"end":651}},"loc":{"start":649,"end":651}},"directives":[],"loc":{"start":645,"end":651}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":654,"end":658}},"loc":{"start":654,"end":658}},"directives":[],"loc":{"start":640,"end":658}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"users","loc":{"start":661,"end":666}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":669,"end":673}},"loc":{"start":669,"end":673}},"loc":{"start":668,"end":674}},"directives":[],"loc":{"start":661,"end":674}}],"loc":{"start":565,"end":676}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User","loc":{"start":683,"end":687}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"age","loc":{"start":692,"end":695}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":697,"end":700}},"loc":{"start":697,"end":700}},"loc":{"start":697,"end":701}},"directives":[],"loc":{"start":692,"end":701}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"displayName","loc":{"start":704,"end":715}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":717,"end":723}},"loc":{"start":717,"end":723}},"loc":{"start":717,"end":724}},"directives":[],"loc":{"start":704,"end":724}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"firstName","loc":{"start":727,"end":736}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":738,"end":744}},"loc":{"start":738,"end":744}},"loc":{"start":738,"end":745}},"directives":[],"loc":{"start":727,"end":745}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"gender","loc":{"start":748,"end":754}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Genders","loc":{"start":756,"end":763}},"loc":{"start":756,"end":763}},"loc":{"start":756,"end":764}},"directives":[],"loc":{"start":748,"end":764}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":767,"end":769}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":771,"end":777}},"loc":{"start":771,"end":777}},"loc":{"start":771,"end":778}},"directives":[],"loc":{"start":767,"end":778}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"lastName","loc":{"start":781,"end":789}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":791,"end":797}},"loc":{"start":791,"end":797}},"loc":{"start":791,"end":798}},"directives":[],"loc":{"start":781,"end":798}}],"loc":{"start":678,"end":800}}],"loc":{"start":0,"end":801}}
APPENDME
Also me
import GraphQLClient from '@/lib/GraphQLClient';
import * as gql from './graphql/userQueries';

// mutations
export const login = async (email, password) => {
  const { login: result } = await GraphQLClient.query({
    query: gql.LOGIN_MUTATION, variables: { email, password },
  });
  return result;
};

export const signup = async (input) => {
  const { signup: result } = await GraphQLClient.query({
    query: gql.SIGNUP_MUTATION, variables: { input },
  });
  return result;
};

export const editProfile = async (input) => {
  const { editProfile: result } = await GraphQLClient.query({
    query: gql.EDIT_PROFILE_MUTATION, variables: { input },
  });
  return result;
};

export const changePassword = async (input) => {
  const { changePassword: result } = await GraphQLClient.query({
    query: gql.CHANGE_PASSWORD_MUTATION, variables: { input },
  });
  return result;
};

// queries
export const getCurrent = async () => {
  const { current } = await GraphQLClient.query({ query: gql.CURRENT_QUERY });
  return current;
};

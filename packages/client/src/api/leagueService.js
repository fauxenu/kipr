import GraphQLClient from '@/lib/GraphQLClient';
import * as gql from './graphql/leagueQueries';

// mutations
export const createLeague = async (input) => {
  const { addLeague: result } = await GraphQLClient.query({
    query: gql.CREATE_LEAGUE_MUTATION, variables: { input },
  });
  return result;
};

export const editLeague = async (input) => {
  const { editLeague: result } = await GraphQLClient.query({
    query: gql.EDIT_LEAGUE_MUTATION, variables: { input },
  });
  return result;
};

export const deleteLeague = async (id) => {
  const { deleteLeague: result } = await GraphQLClient.query({
    query: gql.DELETE_LEAGUE_MUTATION, variables: { id },
  });
  return result;
};

// queries
export const leagues = async ({ name, ownerId }) => {
  const { leagues: result } = await GraphQLClient.query({
    query: gql.LEAGUES_QUERY, variables: { name, ownerId },
  });
  return result;
};

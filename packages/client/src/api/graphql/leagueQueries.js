const LEAGUE_FIELDS = 'id, name, description, logo';

export const LEAGUES_QUERY = `
  query LeaguesQuery($name: String, $ownerId: String) {
    leagues(name: $name, ownerId: $ownerId) {
      ${LEAGUE_FIELDS}
    }
  }
`;

export const CREATE_LEAGUE_MUTATION = `
  mutation CreateLeague($input: CreateLeagueInput!) {
    addLeague(input: $input) {
      ${LEAGUE_FIELDS}
    }
  }
`;

export const EDIT_LEAGUE_MUTATION = `
  mutation EditLeague($input: EditLeagueInput!) {
    editLeague(input: $input) {
      ${LEAGUE_FIELDS}
    }
  }
`;

export const DELETE_LEAGUE_MUTATION = `
  mutation DeleteLeague($id: String!) {
    deleteLeague(id: $id) {
      ${LEAGUE_FIELDS}
    }
  }
`;

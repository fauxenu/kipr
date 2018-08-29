const FILTERS = ['position', 'team', 'bye'];

export default {
  byPosition: ({ players }) => (...positions) => (
    players.filter(player => positions.includes(player.position))
  ),

  byByeWeek: ({ players }) => (...weeks) => (
    players.filter(player => weeks.includes(player.byeWeek))
  ),

  byId: ({ players }) => (...ids) => (
    players.filter(player => ids.includes(player.id))
  ),

  withoutId: ({ players }) => (...ids) => (
    players.filter(player => !ids.includes(player.id))
  ),

  byTeam: ({ players }) => (...teams) => players.filter(player => teams.includes(player.team)),

  byName: ({ players }) => name => (
    players.filter(player => player.name.toLowerCase().includes(name.toLowerCase()))
  ),

  withFilters: ({ players }) => (filters) => {
    let result = [...players];
    const keys = Object.keys(filters).filter(item => FILTERS.includes(item));
    keys.forEach((key) => {
      const values = filters[key];
      result = result.filter(item => values.includes(item[key]));
    });

    return result;
  },
};

import {
  DRAFTS_PLAYERS_ADD,
  DRAFTS_PLAYERS_REMOVE,
  DRAFTS_ROSTER_ADD,
  DRAFTS_ROSTER_REMOVE,
  DRAFTS_FAVORITES_ADD,
  DRAFTS_FAVORITES_REMOVE,
} from 'store/action-types';

const PLAYER_ACTIONS = {
  add: { label: 'Add to Roster', action: DRAFTS_ROSTER_ADD, icon: 'fas fa-user-plus' },
  remove: { label: 'Remove from Roster', action: DRAFTS_ROSTER_REMOVE, icon: 'fas fa-user-minus' },
  flag: { label: 'Taken', action: DRAFTS_PLAYERS_ADD, icon: 'fas fa-times' },
  unflag: { label: 'Available', action: DRAFTS_PLAYERS_REMOVE, icon: 'fas fa-check' },
  favorite: { label: 'Add to Favorites', action: DRAFTS_FAVORITES_ADD, icon: 'fas fa-star' },
  unfavorite: { label: 'Remove from Favorites', action: DRAFTS_FAVORITES_REMOVE, icon: 'far fa-star' },
};

export default {
  activeDraft: ({ active, drafts }) => drafts.find(({ slug }) => active === slug),

  playerState: (state, getters) => (playerId) => {
    const active = getters.activeDraft || {};
    const { roster = [], draftedPlayers = [], favorites } = active;
    const onRoster = roster.includes(playerId);
    const isFavorite = favorites.includes(playerId);
    const available = !draftedPlayers.includes(playerId);
    return { onRoster, available, isFavorite };
  },

  playerActions: (state, getters) => (playerId) => {
    const { onRoster, available, isFavorite } = getters.playerState(playerId);
    const actions = [];

    if (onRoster) {
      actions.push(PLAYER_ACTIONS.remove);
    } else if (!available) {
      actions.push(PLAYER_ACTIONS.unflag);
    } else {
      actions.push(PLAYER_ACTIONS.add, PLAYER_ACTIONS.flag);
    }

    actions.push(isFavorite ? PLAYER_ACTIONS.unfavorite : PLAYER_ACTIONS.favorite);
    return actions;
  },
};

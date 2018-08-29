import {
  DRAFTS_PLAYERS_ADD,
  DRAFTS_PLAYERS_REMOVE,
  DRAFTS_ROSTER_ADD,
  DRAFTS_ROSTER_REMOVE,
} from 'store/action-types';

export default {
  activeDraft: ({ active, drafts }) => drafts.find(({ slug }) => active === slug),

  playerState: (state, getters) => (playerId) => {
    const active = getters.activeDraft || {};
    const { roster = [], draftedPlayers = [] } = active;
    const onRoster = roster.includes(playerId);
    const available = !draftedPlayers.includes(playerId);
    return { onRoster, available };
  },

  playerActions: (state, getters) => (playerId) => {
    const { onRoster, available } = getters.playerState(playerId);

    if (onRoster) {
      return [{
        label: 'Remove from Roster',
        action: DRAFTS_ROSTER_REMOVE,
        icon: 'fas fa-user-minus',
      }];
    }

    if (!available) {
      return [{ label: 'Available', action: DRAFTS_PLAYERS_REMOVE, icon: 'fas fa-check' }];
    }

    return [
      { label: 'Add to Roster', action: DRAFTS_ROSTER_ADD, icon: 'fas fa-user-plus' },
      { label: 'Taken', action: DRAFTS_PLAYERS_ADD, icon: 'fas fa-times' },
    ];
  },
};

import { createNamespacedHelpers } from 'vuex';
import {} from 'store/action-types';

const { mapGetters } = createNamespacedHelpers('drafts');

export default {
  computed: {
    ...mapGetters(['activeDraft', 'playerState', 'playerActions']),

    isAvailable() {
      const { available } = this.playerState(this.player.id);
      return available;
    },

    actions() {
      return this.playerActions(this.player.id);
    },
  },
  methods: {
    dispatchDraftAction(action) {
      const { slug } = this.activeDraft;
      return this.$store.dispatch(`drafts/${action}`, { slug, playerId: this.player.id });
    },
  },
};

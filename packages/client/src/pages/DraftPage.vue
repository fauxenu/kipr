<template>
  <div class="dashboard container-fluid bg-dark">
    <draft-nav-bar />
    <div v-if="!loading" class="dashboard-content row">
      <div class="col-md-8">
        <players-list />
      </div>
      <div class="col-md-4 pl-0">
        <draft-panel :draft="activeDraft" />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { PLAYERS_FETCH, DRAFTS_START } from 'store/action-types';
import DraftNavBar from 'components/DraftNavBar';
import PlayersList from 'components/PlayersList';
import DraftPanel from 'components/DraftPanel';

const { mapActions: playerActions } = createNamespacedHelpers('players');
const { mapActions: draftActions, mapGetters: draftGetters } = createNamespacedHelpers('drafts');

export default {
  components: { DraftNavBar, PlayersList, DraftPanel },
  data() {
    return { loading: true };
  },
  computed: {
    ...draftGetters(['activeDraft']),
  },
  methods: {
    ...playerActions([PLAYERS_FETCH]),
    ...draftActions([DRAFTS_START]),
  },

  beforeMount() {
    const { slug } = this.$route.params;
    const promises = [this[PLAYERS_FETCH](), this[DRAFTS_START](slug)];
    return Promise.all(promises)
      .catch(() => {
        this.$router.push('/'); // draft not found; redirect to the homepage
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding-top: 15px;
  padding-bottom: 15px;

  &-content {
    padding-top: 63px;
    max-height: calc(100vh - 30px);
  }
}
</style>

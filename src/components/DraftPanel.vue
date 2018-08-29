<template>
  <div class="draft-panel card bg-light">
    <header class="card-header">
      <nav-list class="nav-pills card-header-pills" :items="tabs" @change="setActiveTab" />
    </header>
    <div class="card-body p-0">
      <component :is="active.component" v-bind="activeProps" @remove="removePlayer" />
    </div>
    <footer class="card-footer">
      <position-totals :players="players" />
    </footer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { DRAFTS_ROSTER_REMOVE, DRAFTS_FAVORITES_REMOVE } from 'store/action-types';
import NavList from './NavList';
import Roster from './Roster';
import Favorites from './Favorites';
import PositionTotals from './PositionTotals';

const { mapActions } = createNamespacedHelpers('drafts');
const { mapGetters } = createNamespacedHelpers('players');

export default {
  components: {
    NavList,
    Roster,
    Favorites,
    PositionTotals,
  },
  props: {
    draft: { type: Object, required: true },
  },
  data() {
    const tabs = [
      { label: 'Roster', component: 'Roster' },
      { label: 'Favorites', component: 'Favorites' },
    ];

    return { tabs, active: tabs[0] };
  },
  computed: {
    ...mapGetters(['byId']),

    players() {
      const { roster } = this.draft;
      return this.byId(...roster);
    },

    favorites() {
      const { favorites } = this.draft;
      return this.byId(...favorites);
    },

    activeProps() {
      const { component } = this.active;
      return { players: component === 'Favorites' ? this.favorites : this.players };
    },
  },
  methods: {
    ...mapActions([DRAFTS_ROSTER_REMOVE, DRAFTS_FAVORITES_REMOVE]),

    setActiveTab(tab) {
      this.active = tab;
    },

    async removePlayer(playerId, action) {
      const { slug } = this.draft;
      return this[action]({ slug, playerId });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-height: 100%;
  overflow: hidden;

  &-body {
    overflow-y: auto;
  }
}
</style>

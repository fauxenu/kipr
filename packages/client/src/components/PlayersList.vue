<template>
  <div class="player-list card bg-light">
    <header class="card-header">
      <nav-list class="nav-pills card-header-pills" :items="filters" @change="setActiveFilter" />
    </header>
    <div class="card-body p-0">
      <data-table :fields="fields" :items="visiblePlayers">
        <template slot-scope="{row}">
          <players-list-item
            :key="row.id"
            :player="row"
            :use-overall-rank="useOverallRank"
            :hide-unavailable="hideUnavailable"
          />
        </template>
      </data-table>
    </div>
    <footer class="card-footer text-right">
      <div class="form-check form-check-inline small mr-0">
        <label for="hideUnavailable" class="form-check-label pr-2">Hide Unavailable</label>
        <input
          id="hideUnavailable"
          type="checkbox"
          class="form-check-input mr-0"
          v-model="hideUnavailable"
        >
      </div>
    </footer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NavList from './NavList';
import DataTable from './DataTable';
import PlayersListItem from './PlayersListItem';

const { mapState, mapGetters } = createNamespacedHelpers('players');

const FIELDS = [
  { label: 'Rank', key: 'overallRank', sortable: true },
  { key: 'rank', sortable: true },
  { key: 'name', sortable: true },
  { key: 'position', sortable: true },
  { label: 'Bye Week', key: 'bye', sortable: true },
  { key: '' },
];

const FILTERS = [
  { label: 'All', values: null },
  { label: 'QB', values: ['qb'] },
  { label: 'RB', values: ['rb'] },
  { label: 'RB/WR', values: ['rb', 'wr'] },
  { label: 'WR', values: ['wr'] },
  { label: 'TE', values: ['te'] },
  { label: 'K', values: ['k'] },
  { label: 'D/ST', values: ['d/st'] },
  { label: 'Coach', values: ['hc'] },
];

export default {
  components: { NavList, DataTable, PlayersListItem },
  data() {
    const filters = [...FILTERS];
    return { filters, active: filters[0], hideUnavailable: true };
  },
  computed: {
    ...mapState({
      players: state => state.players,
    }),

    ...mapGetters(['byPosition']),

    useOverallRank() {
      const { values } = this.active;
      return !values || values.length > 1;
    },

    visiblePlayers() {
      const { values } = this.active;
      return values ? this.byPosition(...values) : this.players;
    },

    fields() {
      return FIELDS.filter(({ key }) => (this.useOverallRank ? key !== 'rank' : key !== 'overallRank'));
    },
  },
  methods: {
    setActiveFilter(filter) {
      this.active = filter;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.card {
  max-height: 100%;
  overflow: hidden;

  &-body {
    overflow-y: auto;
  }
}

.player-list td {
  font-size: $font-size-sm;
}
</style>

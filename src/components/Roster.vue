<template>
  <div class="roster card bg-light">
    <h5 class="card-header">Roster</h5>
    <div class="card-body p-0">
      <data-table v-if="!isEmpty" :fields="fields" :items="players">
        <tr slot-scope="{row}">
          <td class="text-uppercase">{{ row.position }}</td>
          <td><player-nameplate v-bind="row" /></td>
          <td>{{ row.bye }}</td>
          <td class="text-right">
            <button type="button" class="btn btn-link btn-sm" @click="remove(row.id)">
              <i class="far fa-times-circle text-danger"></i>
            </button>
          </td>
        </tr>
      </data-table>
      <p v-else class="text-center text-muted mt-3">Your roster is empty.</p>
    </div>
    <footer class="card-footer">
      <position-totals :players="players" />
    </footer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { DRAFTS_ROSTER_REMOVE } from 'store/action-types';
import DataTable from './DataTable';
import PlayerNameplate from './PlayerNameplate';
import PositionTotals from './PositionTotals';

const { mapGetters } = createNamespacedHelpers('players');
const { mapActions } = createNamespacedHelpers('drafts');

const FIELDS = [
  { key: 'position', sortable: true },
  { key: 'name' },
  { label: 'Bye', key: 'bye' },
  { key: '' },
];

export default {
  components: { DataTable, PlayerNameplate, PositionTotals },
  props: {
    draft: { type: Object, required: true },
  },
  data() {
    return { fields: FIELDS };
  },
  computed: {
    ...mapGetters(['byId']),

    isEmpty() {
      return this.draft.roster.length === 0;
    },

    players() {
      const { roster } = this.draft;
      return this.byId(...roster);
    },
  },
  methods: {
    ...mapActions([DRAFTS_ROSTER_REMOVE]),

    async remove(playerId) {
      const { slug } = this.draft;
      return this[DRAFTS_ROSTER_REMOVE]({ slug, playerId });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  line-height: 40px;
}

.card {
  max-height: 100%;
  overflow: hidden;

  &-body {
    overflow-y: auto;
  }
}
</style>

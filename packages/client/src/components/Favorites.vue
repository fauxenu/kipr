<template>
  <div class="favorites">
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
    <p v-else class="text-center text-muted mt-3">You have no favorites.</p>
  </div>
</template>

<script>
import { DRAFTS_FAVORITES_REMOVE } from 'store/action-types';
import DataTable from './DataTable';
import PlayerNameplate from './PlayerNameplate';

const FIELDS = [
  { key: 'position', sortable: true },
  { key: 'name' },
  { label: 'Bye', key: 'bye' },
  { key: '' },
];

export default {
  components: { DataTable, PlayerNameplate },
  props: {
    players: { type: Array, required: true },
  },
  data() {
    return { fields: FIELDS };
  },
  computed: {
    isEmpty() {
      return this.players.length === 0;
    },
  },
  methods: {
    remove(playerId) {
      this.$emit('remove', playerId, DRAFTS_FAVORITES_REMOVE);
    },
  },
};
</script>

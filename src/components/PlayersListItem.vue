<template>
  <tr v-if="!hidden" :class="{ 'table-warning': !isAvailable }">
    <td>{{ rank }}</td>
    <td>
      <player-nameplate v-bind="player" :is-favorite="isFavorite" />
    </td>
    <td class="text-uppercase">{{ player.position }}</td>
    <td>{{ player.bye }}</td>
    <td class="text-right">
      <dropdown-menu :items="actions" align-right @select="selectAction">
        <i class="fas fa-ellipsis-h text-muted"></i>
      </dropdown-menu>
    </td>
  </tr>
</template>

<script>
import actionablePlayer from 'mixins/actionablePlayer';
import PlayerNameplate from './PlayerNameplate';
import DropdownMenu from './DropdownMenu';

export default {
  components: { PlayerNameplate, DropdownMenu },
  mixins: [actionablePlayer],
  props: {
    player: { type: Object, required: true },
    useOverallRank: { type: Boolean, default: false },
    hideUnavailable: { type: Boolean, defult: false },
  },
  computed: {
    rank() {
      return this.useOverallRank ? this.player.overallRank : this.player.rank;
    },

    hidden() {
      return this.hideUnavailable && !this.isAvailable;
    },
  },
  methods: {
    selectAction({ action }) {
      return this.dispatchDraftAction(action);
    },
  },
};
</script>

<style lang="scss" scoped>
.disabled td:not(:last-child) {
  opacity: .25;
}
</style>

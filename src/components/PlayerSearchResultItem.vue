<template>
  <div class="player-result-item p-2">
    <player-nameplate v-bind="player" show-position />
    <div class="actions text-right">
      <button
        v-for="(action,index) in actions"
        :key="index"
        type="button"
        class="btn btn-link btn-sm text-dark"
        @click="dispatchDraftAction(action.action)"
      >
        <i :class="action.icon" :title="action.label"></i>
      </button>
    </div>
  </div>
</template>

<script>
import actionablePlayer from 'mixins/actionablePlayer';
import PlayerNameplate from './PlayerNameplate';

export default {
  components: { PlayerNameplate },
  mixins: [actionablePlayer],
  props: {
    player: { type: Object, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.player-result-item {
  border-bottom: 1px solid $gray-200;

  &:last-child {
    border-bottom: none;
  }
}
</style>

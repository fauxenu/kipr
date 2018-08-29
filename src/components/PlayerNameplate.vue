<template>
  <div class="nameplate" :class="[`nameplate-${type}`]">
    <img :src="imgPath" class="avatar" alt="player image">
    <div class="info">
      <h6 class="name">{{ name }}</h6>
      <div class="meta">
        <span v-if="showPosition" class="position text-uppercase">{{ position }} -</span>
        <span v-if="showTeam" class="team">{{ team | team-name }}</span>
        <span v-if="status"  class="badge badge-danger text-uppercase">{{ status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const PLAYER_PATH = '/assets/img/players';
const TEAM_PATH = '/assets/img/teams';

export default {
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: 'player' },
    team: { type: String, required: true },
    status: { type: String, default: '' },
    position: { type: String, default: '' },
    showPosition: { type: Boolean, default: false },
  },
  computed: {
    showTeam() {
      return this.type !== 'team';
    },

    imgPath() {
      if (this.type === 'player') {
        return `${PLAYER_PATH}/${this.id}.png`;
      }
      return `${TEAM_PATH}/${this.team}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.nameplate {
  display: flex;
  align-items: center;

  .avatar {
    width: 32px;
    height: 32px;
    object-fit: cover;
    margin-right: 8px;
  }

  .name {
    margin: 0;
    font-size: $font-size-sm
  }

  .meta {
    font-size: $font-size-xs;
    color: $gray-500;
  }

  &.nameplate-player .avatar {
    border-radius: 50%;
  }
}
</style>

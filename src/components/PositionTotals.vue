<template>
  <div class="position-totals small">
    <position-count
      v-for="total in totals"
      :key="total.position"
      v-bind="total"
    />
  </div>
</template>

<script>
import rosterLimits from 'config/rosterLimits.json';
import PositionCount from './PositionCount';

export default {
  components: { PositionCount },
  props: {
    players: { type: Array, required: true },
  },
  computed: {
    totals() {
      const counts = rosterLimits.map((item) => {
        const found = this.players.filter(({ position }) => position === item.position);
        return Object.assign({}, item, { count: found.length });
      });

      counts.push({
        position: 'All',
        min: 17,
        max: 17,
        count: this.players.length,
      });

      return counts;
    },
  },
};
</script>

<style lang="scss" scoped>
.position-totals {
  display: flex;
  flex-wrap: wrap;

  > .position-count {
    width: 25%;
  }
}
</style>

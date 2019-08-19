<template>
  <transition name="fade">
    <div class="search-results dropdown-menu show shadow mt-2">
      <p
        v-if="isEmpty"
        class="text-center text-muted mb-0 p-2 small"
      >
        No players were found
      </p>
      <player-search-result-item
        v-else
        class="dropdown-item"
        v-for="result in results"
        :key="result.id"
        :player="result"
      />
    </div>
  </transition>
</template>

<script>
import PlayerSearchResultItem from './PlayerSearchResultItem';

export default {
  components: { PlayerSearchResultItem },
  props: {
    results: { type: Array, required: true },
  },
  computed: {
    isEmpty() {
      return this.results.length === 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-results {
  left:unset;
  right: 0;
  width: 256px;
  max-height: 65vh;
  overflow-y: auto;
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: all 0.33s ease-in-out;
    transition-delay: 0.1s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>

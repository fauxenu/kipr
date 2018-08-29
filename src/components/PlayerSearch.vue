<template>
  <form class="player-search" @submit.prevent="getResults">
    <input
      type="text"
      placeholder="Player Search"
      class="form-control"
      v-model="query"
      @blur="hideResults"
    >
    <player-search-results v-if="showResults" :results="results" />
  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import debounce from 'lodash.debounce';
import PlayerSearchResults from './PlayerSearchResults';

const { mapGetters } = createNamespacedHelpers('players');

export default {
  components: { PlayerSearchResults },
  data() {
    return { query: '', results: [], showResults: false };
  },
  watch: {
    query() {
      this.debouncedGetResults();
    },
  },
  computed: {
    ...mapGetters(['byName']),
  },
  created() {
    this.debouncedGetResults = debounce(this.getResults, 500);
  },
  methods: {
    getResults() {
      const name = this.query.trim();
      if (name.length >= 3) {
        this.results = this.byName(name);
        this.showResults = true;
      }
    },

    hideResults() {
      this.showResults = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-search {
  position: relative;
}
</style>

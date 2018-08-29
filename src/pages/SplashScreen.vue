<template>
  <div class="splash-screen">
    <div class="jumbotron text-center text-white m-0">
      <h1 class="text-uppercase">Kipr</h1>
      <p class="lead">Tremendous Upside Potential</p>
      <transition name="fade-picker">
        <draft-picker v-if="!loading" :drafts="drafts" @select="showDraft" />
      </transition>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { DRAFTS_FETCH } from 'store/action-types';
import DraftPicker from 'components/draft-picker/DraftPicker';

const { mapActions, mapState } = createNamespacedHelpers('drafts');

export default {
  components: { DraftPicker },
  data() {
    return { loading: true };
  },
  computed: {
    ...mapState({
      drafts: state => state.drafts,
    }),
  },
  methods: {
    ...mapActions([DRAFTS_FETCH]),

    showDraft({ slug }) {
      this.$router.push(`/drafts/${slug}`);
    },
  },

  beforeMount() {
    this[DRAFTS_FETCH]().finally(() => {
      this.loading = false;
    });
  },
};
</script>


<style lang="scss" scoped>
@import 'variables';

.splash-screen {
  background-color: $purple;
  padding-top: 20vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.jumbotron {
  background-color: transparent;
}

.fade-picker-enter-active,
.fade-picker-leave-active {
  transition: all .3s;
}

.fade-picker-leave-to,
.fade-picker-enter {
  opacity: 0;
}
</style>

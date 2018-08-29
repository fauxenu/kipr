<template>
  <form class="new-draft-form" @submit.prevent="submit">
    <input type="text" class="form-control" placeholder="Draft Name Name" required v-model="name">
    <button type="submit" class="btn btn-outline-light btn-block mt-2" :disabled="saving">
      <i v-if="saving" class="fas fa-circle-notch fa-spin"></i>
      <span v-else>Start Drafting!</span>
    </button>
    <button
      v-if="showResume"
      type="button"
      class="btn btn-link btn-sm text-white"
      :disabled="saving"
      @click="$emit('resume')"
    >
      Or resume an exisitng draft
    </button>
  </form>
</template>

<script>
import to from 'lib/async-to';
import { createNamespacedHelpers } from 'vuex';
import { DRAFTS_CREATE } from 'store/action-types';

const { mapActions } = createNamespacedHelpers('drafts');

export default {
  props: {
    showResume: { type: Boolean, default: false },
  },
  data() {
    return { name: '', saving: false };
  },
  methods: {
    ...mapActions([DRAFTS_CREATE]),

    async submit() {
      this.saving = true;
      const [error, draft] = await to(this[DRAFTS_CREATE](this.name));
      if (error) {
        this.saving = false;
      } else {
        this.$emit('select', draft);
      }
    },
  },
};
</script>

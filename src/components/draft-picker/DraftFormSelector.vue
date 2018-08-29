<template>
  <div class="draft-form-selector">
    <button
      type="button"
      class="btn btn-light btn-block"
      @click="$emit('create')"
    >
      Get Started
    </button>
    <button
      v-if="showResume"
      type="button"
      class="btn btn-outline-light btn-block"
      @click="$emit('resume')"
    >
      Resume
    </button>
  </div>
</template>

<script>
export default {
  props: {
    showResume: { type: Boolean, default: false },
  },
};
</script>

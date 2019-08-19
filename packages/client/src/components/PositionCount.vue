<template>
  <div class="position-count">
    <strong class="label text-uppercase">{{ position }}:</strong>
    <span :class="[counterClass]">{{ count }}/{{ max }}</span>
  </div>
</template>

<script>
export default {
  props: {
    position: { type: String, required: true },
    min: { type: Number, default: 1 },
    max: { type: Number, default: 2 },
    count: { type: Number, default: 0 },
  },
  computed: {
    counterClass() {
      if (this.count > this.max) {
        return 'text-danger';
      }
      if (this.count === this.max) {
        return 'text-success';
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  width: 40px;
  display: inline-block;
}
</style>

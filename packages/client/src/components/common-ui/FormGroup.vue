<template>
  <div class="form-group" :class="{ 'row': horizontal }">
    <label :for="id" class="col-form-label" :class="[labelClass]">{{ label }}</label>
    <div class="form-group__input" :class="[inputClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    id: { type: String, required: false },
    horizontal: { type: Boolean, default: false },
    labelWidth: { type: Number, default: 3 },
    errorMessage: { type: String, required: false },
    successMessage: { type: String, required: false },
  },
  computed: {
    labelClass() {
      return this.horizontal ? `col-md-${this.labelWidth}` : '';
    },

    inputClass() {
      return this.horizontal ? `col-md-${12 - this.labelWidth}` : '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.form-group.row .col-form-label {
  @include media-breakpoint-up(md) {
    text-align: right;
  }
}
</style>

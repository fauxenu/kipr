<template>
  <button
    class="btn"
    :type="type"
    :class="classNames"
    :disabled="isDisabled"
    @click="click"
    @blur="$emit('blur')"
  >
    <span class="label d-inline-block" :class="{ invisible: loading }">
      <slot></slot>
    </span>
    <span v-if="loading" class="icon">
      <i class="fas fa-circle-notch fa-spin"></i>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ui-button',
  props: {
    type: { type: String, default: 'button' },
    loading: { type: Boolean, default: false },
    variant: { type: String, default: 'default' },
    color: { type: String, required: false },
    block: { type: Boolean, default: false },
    link: { type: Boolean, default: false },
    size: { type: String, required: false },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    classNames() {
      const options = [
        `btn-${this.variant}`,
        this.block ? 'btn-block' : '',
        this.link ? 'btn-link' : '',
        this.size ? `btn-${this.size}` : '',
        this.color ? `text-${this.color}` : '',
      ];
      return options.filter(option => !!option);
    },

    isDisabled() {
      return this.disabled || this.loading;
    },
  },
  methods: {
    click(evt) {
      // focus workaround for Firefox and Safari
      const { currentTarget } = evt;
      currentTarget.focus();
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn {
    position: relative;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
  }
</style>

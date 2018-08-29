<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-default btn-link btn-sm"
      @click="toggleMenu"
      @blur="hideMenu"
    >
      <slot>Items</slot>
    </button>
    <transition name="fade">
      <div
        v-if="open"
        class="dropdown-menu show shadow-sm"
        :class="{ 'dropdown-menu-right': alignRight }"
      >
        <template v-for="(item, index) in items">
          <slot name="item" :menu="item">
            <div v-if="item.separator" class="dropdown-divider" :key="`${index}-divider`"></div>
            <a
              :key="index"
              @click.prevent="$emit('select', item)"
              href="#"
              class="dropdown-item"
            >
              {{ item.label }}
            </a>
          </slot>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    alignRight: { type: Boolean, default: false },
  },
  data() {
    return { open: false };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },

    hideMenu() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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

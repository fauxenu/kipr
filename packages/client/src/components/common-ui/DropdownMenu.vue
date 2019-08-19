<template>
  <div class="dropdown">
    <ui-button :variant="variant" :size="size" :link="link" @click="toggleMenu" @blur="hideMenu">
      <slot>Items</slot>
    </ui-button>
    <transition name="fade">
      <div
        v-if="open"
        class="dropdown-menu show shadow-sm"
        :class="{ 'dropdown-menu-right': alignRight }"
      >
        <template v-for="(item, index) in items">
          <slot name="item" :menu="item">
            <div v-if="item.separator" class="dropdown-divider" :key="`${index}-divider`"></div>
            <router-link
              v-if="item.to"
              :key="`${index}-route`"
              :to="item.to"
              class="dropdown-item"
            >
              {{ item.label }}
            </router-link>
            <a
              v-else
              :key="`${index}-link`"
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
import Button from './Button';

export default {
  components: { 'ui-button': Button },
  props: {
    items: { type: Array, required: true },
    alignRight: { type: Boolean, default: false },
    size: { type: String, required: false },
    link: { type: Boolean, default: false },
    variant: { type: String, required: false },
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

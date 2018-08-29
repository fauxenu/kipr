<template>
  <ul class="nav">
    <li v-for="(item, index) in items" :key="index" class="nav-item">
      <a
        class="nav-link"
        :class="{ active: index === active }"
        href="#"
        @click.prevent="changeSelection(index)"
      >
        {{ item.label }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
  },
  data() {
    return { active: 0 };
  },
  methods: {
    changeSelection(index) {
      this.active = index;
      this.$emit('change', this.items[index]);
    },
  },
};
</script>

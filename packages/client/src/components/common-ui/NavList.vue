<template>
  <ul class="nav" :class="classNames">
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
    vertical: { type: Boolean, default: false },
    align: {
      type: String,
      default: 'start',
      validator: value => ['start', 'center', 'end'].includes(value),
    },
    variant: {
      type: String,
      default: '',
      validator: value => !value || ['tabs', 'pills'].includes(value),
    },
  },
  data() {
    return { active: 0 };
  },
  computed: {
    classNames() {
      return [
        `justify-content-${this.align}`,
        this.variant ? `nav-${this.variant}` : null,
        this.vertical ? 'flex-column' : null,
      ];
    },
  },
  methods: {
    changeSelection(index) {
      this.active = index;
      this.$emit('change', this.items[index]);
    },
  },
};
</script>

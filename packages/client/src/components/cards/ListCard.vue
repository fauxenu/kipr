<template>
  <div class="card">
    <slot name="header"></slot>
    <div v-if="showBody" class="card-body">
      <h5 v-if="title" class="card-title">{{ title }}</h5>
      <p v-if="text" class="card-text">{{ text }}</p>
      <p v-if="!items.length" class="text-muted mb-0">
        <slot name="emptyMessage">No items were found</slot>
      </p>
    </div>
    <div v-if="items.length" class="list-group list-group-flush">
      <template v-for="item in items">
        <slot :item="item"></slot>
      </template>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    title: { type: String, required: false },
    text: { type: String, required: false },
  },
  computed: {
    showBody() {
      return !this.items.length || this.title || this.text;
    },
  },
};
</script>

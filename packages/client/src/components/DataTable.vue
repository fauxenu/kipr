<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field.key">
            {{  field.label || field.key | capitalize }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in sortedItems">
          <slot :row="item">
            <tr :key="item.id">
              <td v-for="field in fields" :key="field.key">
                {{ item[field.key] }}
              </td>
            </tr>
          </slot>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
const sort = (items, field) => {
  const target = [...items];
  return target.sort((a, b) => {
    if (a[field] === null) {
      return 1;
    }
    if (b[field] === null) {
      return -1;
    }
    if (a[field] === b[field]) {
      return 0;
    }
    return a[field] > b[field] ? 1 : -1;
  });
};

export default {
  props: {
    fields: { type: Array, required: true },
    items: { type: Array, required: true },
  },
  data() {
    const { key } = this.fields.find(field => !!field.sortable);
    return { sortField: key, direction: 'asc' };
  },
  computed: {
    defaultSortField() {
      const { key = null } = this.fields.find(field => !!field.sortable);
      return key;
    },

    sortedItems() {
      const hasField = this.fields.some(field => field.key === this.sortField);
      const key = hasField ? this.sortField : this.defaultSortField;

      if (key) {
        const sorted = sort(this.items, key);
        if (this.direction === 'desc') {
          sorted.reverse();
        }
        return sorted;
      }

      return this.items;
    },
  },
};
</script>

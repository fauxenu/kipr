<template>
  <div class="input">
    <input
      class="form-control"
      :class="{ 'is-invalid': error }"
      :type="type"
      :id="id"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      @input="input($event.target.value)"
    />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'text' },
    id: { type: String, required: false },
    name: { type: String, required: false },
    placeholder: { type: String, required: false },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: [String, Number], required: false },
    error: { type: String, required: false },
  },
  methods: {
    input(value) {
      const converted = (this.type === 'number' && value !== '') ? Number(value) : value;
      this.$emit('input', converted);
    },
  },
};
</script>

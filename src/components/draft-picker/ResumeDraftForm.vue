<template>
  <div class="resume-draft-form">
    <div class="card bg-transparent border-white">
      <div class="list-group list-group-flush text-left">
        <a
          href="#"
          class="list-group-item list-group-item-action bg-transparent border-white p-2"
          v-for="draft in drafts"
          :key="draft.slug"
          @click.prevent="$emit('select', draft)"
        >
          <h6 class="mb-1 text-white">{{ draft.name }}</h6>
          <small class="text-white-50">{{ draft.created | format-date }}</small>
        </a>
      </div>
    </div>
    <button type="button" class="btn btn-link btn-sm text-white" @click="$emit('create')">
      Or start a new draft
    </button>
  </div>
</template>

<script>
export default {
  props: {
    drafts: { type: Array, required: true },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  max-height: 256px;
  overflow-y: auto;
}
</style>

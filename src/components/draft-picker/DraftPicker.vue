<template>
  <div class="draft-picker">
    <transition name="slide" mode="out-in">
      <component
        :is="active.component"
        v-bind="activeProps"
        @create="showCreateForm"
        @resume="showResumeForm"
        @select="selectDraft"
      />
    </transition>
  </div>
</template>

<script>
import DraftFormSelector from './DraftFormSelector';
import NewDraftForm from './NewDraftForm';
import ResumeDraftForm from './ResumeDraftForm';

export default {
  components: { DraftFormSelector, NewDraftForm, ResumeDraftForm },
  props: {
    drafts: { type: Array, default: () => [] },
  },
  data() {
    const sections = {
      select: { component: 'DraftFormSelector', props: { showResume: 'hasDrafts' } },
      create: { component: 'NewDraftForm', props: { showResume: 'hasDrafts' } },
      resume: { component: 'ResumeDraftForm', props: { drafts: 'drafts' } },
    };
    return { sections, active: sections.select };
  },
  computed: {
    hasDrafts() {
      return !!this.drafts.length;
    },

    activeProps() {
      const { props } = this.active;
      return Object.keys(props).reduce((obj, key) => {
        const propAttr = props[key];
        return Object.assign({ [key]: this[propAttr] }, obj);
      }, {});
    },
  },
  methods: {
    showCreateForm() {
      this.active = this.sections.create;
    },

    showResumeForm() {
      if (this.drafts.length === 1) {
        this.selectDraft(this.drafts[0]);
      } else {
        this.active = this.sections.resume;
      }
    },

    selectDraft(draft) {
      this.$emit('select', draft);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide {
  &-enter-active,
  &-leave-active  {
    transition: all .33s cubic-bezier(0.165, 0.84, 0.44, 1)
  }

  &-enter {
    transform: translateX(50%);
  }

  &-leave-to {
    transform: translateX(-50%);
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>

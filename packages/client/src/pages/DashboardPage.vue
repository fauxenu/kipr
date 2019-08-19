<template>
  <div id="dashboard-page">
    <div class="card-deck">
      <list-card title="Your Leagues" :items="[]"></list-card>
      <list-card title="Your Teams" :items="[]"></list-card>
      <list-card title="Your Drafts" :items="[]"></list-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ListCard from '@/components/cards/ListCard';

export default {
  components: { ListCard },
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
    }),

    fullName() {
      return `${this.user.firstName}  ${this.user.lastName}`;
    },
  },
};
</script>

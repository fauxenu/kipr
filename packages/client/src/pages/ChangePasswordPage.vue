<template>
  <div id="change-password-page">
    <form @submit.prevent="submit">
      <ui-form-group label="Existing Password" horizontal id="old-password">
        <ui-input
          id="old-password"
          type="password"
          v-model="oldPassword"
          :error="errors.oldPassword"
        />
      </ui-form-group>
      <ui-form-group label="New Password" horizontal id="new-password">
        <ui-input
          id="new-password"
          type="password"
          v-model="newPassword"
          :error="errors.newPassword"
        />
      </ui-form-group>
      <ui-form-group label="Confirm Password" horizontal id="confirm-password">
        <ui-input
          id="confirm-password"
          type="password"
          v-model="confirmPassword"
          :error="errors.confirmPassword"
        />
      </ui-form-group>
      <div class="form-group row">
        <div class="offset-md-3 col-md-9">
          <ui-button type="submit" :loading="loading" variant="primary">Change Password</ui-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { notifySuccess } from '@/services/NotificationService';

export default {
  data() {
    return {
      loading: false,
      errors: {},
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
    }),
  },
  methods: {
    ...mapActions(['changePassword']),

    validate() {
      ['newPassword', 'oldPassword', 'confirmPassword'].forEach((field) => {
        this.$set(this.errors, field, !this[field] ? 'Field is required' : '');
      });
      if (this.newPassword !== this.confirmPassword) {
        this.$set(this.errors, 'confirmPassword', 'New password and confirmation password don\'t match');
      }
      return Object.values(this.errors).every(val => !val);
    },

    submit() {
      if (this.validate()) {
        this.loading = true;
        this.changePassword({
          id: this.user.id,
          newPassword: this.newPassword,
          oldPassword: this.oldPassword,
        })
          .then(() => this.success())
          .catch(({ message }) => this.$set(this.errors, 'oldPassword', message))
          .finally(() => (this.loading = false));
      }
    },

    success() {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.errors = {};
      notifySuccess('Your password has been changed.');
    },
  },
};
</script>

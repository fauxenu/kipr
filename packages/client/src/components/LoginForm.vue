<template>
  <form class="login-form" @submit.prevent="submit">
    <div class="form-group">
      <template v-if="createAccount">
        <input placeholder="first name" class="form-control" v-model="firstName" required>
        <input placeholder="last name" class="form-control" v-model="lastName" required>
      </template>
      <input
        type="email"
        placeholder="email address"
        class="form-control"
        v-model="email"
        required
      >
      <input
        type="password"
        placeholder="password"
        class="form-control"
        v-model="password"
        required
      >
    </div>
    <p v-if="error" class="text-light text-center">{{ error }}</p>
    <ui-button type="submit" block variant="light" :loading="saving">{{ actionLabel }}</ui-button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    createAccount: { type: Boolean, default: false },
  },
  data() {
    return {
      saving: false,
      error: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    };
  },
  computed: {
    actionLabel() {
      return this.createAccount ? 'Create Account' : 'Login';
    },
  },
  methods: {
    ...mapActions(['login', 'signup']),

    submit() {
      this.saving = true;
      const promise = !this.createAccount
        ? this.login({ email: this.email, password: this.password })
        : this.signup({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
        });

      promise
        .then(response => this.$emit('login', response))
        .catch(({ message }) => (this.error = message))
        .finally(() => (this.saving = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  border-color: #fff;
  background-color: transparent;
  color: #fff;
  transition: background-color .2s;
  border-radius: 0;

  + .form-control {
    border-top: none;
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
    border-color: #fff;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }
}
</style>

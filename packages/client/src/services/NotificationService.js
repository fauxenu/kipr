import store from '@/store';

const DEFAULT_DURATION = 3500; // 2 seconds;

export const notify = options => store.dispatch('notifications/show', options);

export const notifySuccess = (message, duration = DEFAULT_DURATION) => (
  notify({ type: 'success', message, duration })
);

export const notifyDanger = (message, duration = DEFAULT_DURATION) => (
  notify({ type: 'danger', message, duration })
);

export const notifyInfo = (message, duration = DEFAULT_DURATION) => (
  notify({ type: 'info', message, duration })
);

export const notifyWarning = (message, duration = DEFAULT_DURATION) => (
  notify({ type: 'warning', message, duration })
);

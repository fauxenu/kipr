const MESSAGE = 'You are not authenticated.';

export default class AuthError extends Error {
  constructor(...params) {
    super(MESSAGE, ...params);
    this.code = 401;
    this.name = 'AuthError';

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }
  }
}

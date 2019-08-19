const MESSAGE = 'You are not allowed to peform this action.';

export default class PermissionError extends Error {
  constructor(...params) {
    super(MESSAGE, ...params);
    this.code = 403;
    this.name = 'PermissionError';

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PermissionError);
    }
  }
}

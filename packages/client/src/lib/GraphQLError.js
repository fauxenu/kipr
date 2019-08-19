export default class GraphQLError extends Error {
  constructor(errors, ...params) {
    const message = errors.reduce((allErrors, error) => [...allErrors, error.message], []);
    super(message.join('\n'), ...params);
    this.errors = errors;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLError);
    }
  }
}

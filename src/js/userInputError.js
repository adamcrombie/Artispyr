export class UserInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserInputError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserInputError);
    }
  }
}

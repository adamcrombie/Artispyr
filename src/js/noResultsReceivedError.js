export class NoResultsReceivedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoResultsReceivedError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoResultsReceivedError);
    }
  }
}

class KeyFoundError extends Error {
  constructor() {
    super('Access key found. Additional information found above.');
  }
}

module.exports = { KeyFoundError };
const { printError } = require('./utils/error-logger');

class KeyFoundError extends Error {
  constructor() {
    const accessKeyInfo = `Found access key in ${dir}${fileName} - ${foundRegex[0]}`;
    const removeKeyInstruction = 'Please search for and then remove this key.';

    printError(accessKeyInfo, removeKeyInstruction);

    super('Access key found. Additional information found above.');
  }
}

module.exports = { KeyFoundError };
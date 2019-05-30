import { printError } from '../utils/error-logger.js';
export class KeyFoundError extends Error {
  constructor(dir, fileName) {
    const accessKeyInfo = `Found access key in ${dir}${fileName} - ${foundRegex[0]}`;
    const removeKeyInstruction = 'Please search for and then remove this key.';
    printError(accessKeyInfo, removeKeyInstruction);
    super('Access key found. Additional information found above.');
  }

}
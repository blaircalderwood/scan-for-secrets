const path = require('path');

import { scanAllFiles } from './keyScanner.js';
console.log('then');

const run = () => {
  console.log('Scanning for secrets');
  let directoryToScan = path.join(process.cwd(), process.argv[2]);

  if (!directoryToScan.endsWith('/')) {
    directoryToScan += '/';
  }

  try {
    scanAllFiles(directoryToScan);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }

  console.log('Access key validation passed');
  process.exit(0);
};

module.exports = {
  run
};
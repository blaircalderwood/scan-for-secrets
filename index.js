const path = require('path');

const { scanAllFiles } = require('./keyScanner');

let directoryToScan = path.join(process.cwd(), process.argv[2]);

if(!directoryToScan.endsWith('/')) {
  directoryToScan += '/';
}
const failedValidationFiles = scanAllFiles(directoryToScan);
if(failedValidationFiles) {
  console.error('You have an access key stored in the following files:');
  failedValidationFiles.forEach(file => console.error(file));
  console.error('Please remove these and then try again.');
  process.exit(1);
}

console.log('Access key validation passed');
process.exit(0);
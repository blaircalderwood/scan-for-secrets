const { scanAllFiles } = require('./keyScanner');

const failedValidationFiles = scanAllFiles(process.argv[2] || './');

if(failedValidationFiles) {
  console.error('You have an access key stored in the following files:');
  failedValidationFiles.forEach(file => console.error(file));
  console.error('Please remove these and then try again.');
  process.exit(1);
}

console.log('Access key validation passed');
process.exit(0);
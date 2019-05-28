const path = require('path');

const { scanAllFiles } = require('./keyScanner');

let directoryToScan = path.join(process.cwd(), process.argv[2]);

if(!directoryToScan.endsWith('/')) {
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
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));

// AWS key regexs from https://aws.amazon.com/blogs/security/a-safer-way-to-distribute-aws-credentials-to-ec2/
const ACCESS_KEY_REGEX = /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/;
const SECRET_ACCESS_KEY_REGEX = /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/;

class FileToCheck {
  constructor(dir, fileName, contents) {
    this.dir = dir;
    this.fileName = fileName;
    this.contents = contents;
  }

}

const printError = (...linesToPrint) => {
  const DASHED_LINE = '------------------------------------------------------------------------------------------------------------------';
  const CONSOLE_RED = '\x1b[31m';
  const CONSOLE_RESET_COLOUR = '\x1b[0m';
  console.log(DASHED_LINE);
  linesToPrint.forEach(line => console.log(CONSOLE_RED, line));
  console.log(CONSOLE_RESET_COLOUR, DASHED_LINE);
};

class KeyFoundError extends Error {
  constructor(dir, fileName) {
    const accessKeyInfo = `Found access key in ${dir}${fileName} - ${foundRegex[0]}`;
    const removeKeyInstruction = 'Please search for and then remove this key.';
    printError(accessKeyInfo, removeKeyInstruction);
    super('Access key found. Additional information found above.');
  }

}

const recursivelyListFiles = directory => {
  const scanFolder = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(function (file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = scanFolder(dir + file + '/', filelist);
      } else {
        filelist.push({
          dir,
          file
        });
      }
    });
    return filelist;
  };

  return scanFolder(directory);
};
const getFileContents = ({
  dir,
  file
}) => {
  const contents = fs.readFileSync(dir + file, 'utf8');
  return new FileToCheck(dir, file, contents);
};
const flagIfFileContainsKey = file => {
  const regexs = [ACCESS_KEY_REGEX, SECRET_ACCESS_KEY_REGEX];
  const dir = file.dir,
        fileName = file.fileName,
        contents = file.contents;
  return regexs.find(regex => {
    const foundRegex = contents.match(regex);

    if (foundRegex) {
      throw new KeyFoundError(dir, fileName);
    }

    return foundRegex;
  });
};
const scanAllFiles = (directory = './') => {
  const files = recursivelyListFiles(directory);
  const filesContents = files.map(getFileContents);
  filesContents.forEach(flagIfFileContainsKey);
};

const path = require('path');
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

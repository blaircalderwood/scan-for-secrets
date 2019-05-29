const { ACCESS_KEY_REGEX, SECRET_ACCESS_KEY_REGEX } = require('./constants');
const { FileToCheck } = require('./models/file-to-check.model');
const { KeyFoundError } = require('./errors/key-found.error');
const fs = require('fs');

const recursivelyListFiles = (directory) => {
  const scanFolder = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(function (file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = scanFolder(dir + file + '/', filelist);
      }
      else {
        filelist.push({ dir, file });
      }
    });
    return filelist;
  };

  return scanFolder(directory);
}

const getFileContents = ({ dir, file }) => {
  const contents = fs.readFileSync(dir + file, 'utf8');

  return new FileToCheck(dir, file, contents);
}

const flagIfFileContainsKey = (file) => {
  const regexs = [ACCESS_KEY_REGEX, SECRET_ACCESS_KEY_REGEX];
  const {dir, fileName, contents} = file;

  return regexs.find(regex => {
    const foundRegex = contents.match(regex);
    if (foundRegex) {
      throw new KeyFoundError(dir, fileName);
    }

    return foundRegex;
  });
}

const scanAllFiles = (directory = './') => {
  const files = recursivelyListFiles(directory);
  const filesContents = files.map(getFileContents);

  filesContents.forEach(flagIfFileContainsKey);
}

module.exports = {
  recursivelyListFiles,
  getFileContents,
  scanAllFiles,
  flagIfFileContainsKey,
}
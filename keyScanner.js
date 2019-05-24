const { accessKeyRegex, secretAccessKeyRegex } = require('./constants');
const regexs = [accessKeyRegex, secretAccessKeyRegex];
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
  console.log(directory);
  return scanFolder(directory);
}

const getFileContents = ({ dir, file }) => {
  return {
    fileName: file,
    contents: fs.readFileSync(dir + file, 'utf8')
  };
}

const doesStringContainKey = (str) => {
  return regexs.find(regex => regex.test(str)) !== undefined;
}

const scanAllFiles = (directory = './') => {
  const files = recursivelyListFiles(directory);
  const filesContents = files.map(getFileContents);
  const failedValidationFiles = [];
  
  filesContents.forEach(({ fileName, contents }) => {
    if(doesStringContainKey(contents)) {
      failedValidationFiles.push(fileName);
    }
  });

  return failedValidationFiles;
}

module.exports = {
  recursivelyListFiles,
  getFileContents,
  scanAllFiles,
  doesStringContainKey,
}
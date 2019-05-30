import { ACCESS_KEY_REGEX, SECRET_ACCESS_KEY_REGEX } from './constants.js';
import { FileToCheck } from './models/file-to-check.model.js';
import { KeyFoundError } from './errors/key-found.error.js';
import fs from 'fs';
export const recursivelyListFiles = directory => {
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
export const getFileContents = ({
  dir,
  file
}) => {
  const contents = fs.readFileSync(dir + file, 'utf8');
  return new FileToCheck(dir, file, contents);
};
export const flagIfFileContainsKey = file => {
  const regexs = [ACCESS_KEY_REGEX, SECRET_ACCESS_KEY_REGEX];
  const {
    dir,
    fileName,
    contents
  } = file;
  return regexs.find(regex => {
    const foundRegex = contents.match(regex);

    if (foundRegex) {
      throw new KeyFoundError(dir, fileName);
    }

    return foundRegex;
  });
};
export const scanAllFiles = (directory = './') => {
  const files = recursivelyListFiles(directory);
  const filesContents = files.map(getFileContents);
  filesContents.forEach(flagIfFileContainsKey);
};
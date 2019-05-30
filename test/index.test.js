import {
  recursivelyListFiles,
  getFileContents,
  scanAllFiles,
  flagIfFileContainsKey,
} from '../src/keyScanner.js';
import { FileToCheck } from '../src/models/file-to-check.model';

const fakeAccessKey = 'HROJW98L22LOOYHZPPOS';
const fakeSecretAccessKey = '9J9DfWWoQfaSiifm2UQW0eHHniJOkDD/W1fVhSXz';
const accessKeyErrorMessage = 'Access key found. Additional information found above.';

describe('recursivelyListFiles', () => {
  test('Returns a list of all documents in the folder and in subfolders', () => {
    const listOfFiles = recursivelyListFiles('./test/mock-project-no-keys/');
    const expectedListOfFiles = [{
      "dir": "./test/mock-project-no-keys/",
      "file": "index.js",
    },
    {
      "dir": "./test/mock-project-no-keys/",
      "file": "package.json",
    },
    {
      "dir": "./test/mock-project-no-keys/src/",
      "file": "app.js",
    },
    ];

    expect(listOfFiles).toEqual(expectedListOfFiles);
  });
});

describe('getFileContents', () => {
  test('Returns a string containing all of the given file\'s contents', () => {
    const fileObject = getFileContents({ dir: './test/mock-project-no-keys/', file: 'index.js' });
    const expectedFileContents = `const aTestVariable = 'Hi, I am a test variable';`;

    expect(fileObject.contents).toBe(expectedFileContents);
  });
});

describe('flagIfFileContainsKey', () => {
  test('Throws an error when file passed contains an access key', () => {
    const exampleDir = './src/';
    const exampleFileName = 'file.js';
    const contents = `There is a key here ${fakeAccessKey} <= look at it`;
    const fileToCheck = new FileToCheck(exampleDir, exampleFileName, contents);

    expect(() => flagIfFileContainsKey(fileToCheck)).toThrowError(accessKeyErrorMessage);
  });

  test('Throws an error when string passed contains an secret access key', () => {
    const exampleDir = './src/';
    const exampleFileName = 'file.js';
    const contents = `There is a key here ${fakeSecretAccessKey} <= look at it`;
    const fileToCheck = new FileToCheck(exampleDir, exampleFileName, contents);

    expect(() => flagIfFileContainsKey(fileToCheck)).toThrowError(accessKeyErrorMessage);
  });

  test('Does not throw an error if string passed does not contain any key', () => {
    const exampleDir = './src/';
    const exampleFileName = 'file.js';
    const contents = 'No keys here. Move along.';
    const fileToCheck = new FileToCheck(exampleDir, exampleFileName, contents);

    expect(() => flagIfFileContainsKey(fileToCheck)).not.toThrow();
  });
});

describe('scanAllFiles', () => {
  test('Throws an error if validation on one file fails', () => {
    expect(() => scanAllFiles('./test/mock-project-with-keys/')).toThrow(accessKeyErrorMessage);
  })

  test('Returns true if validation for all files passes', () => { 
    expect(() => scanAllFiles('./test/mock-project-no-keys/')).not.toThrow();
  })
})
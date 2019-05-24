const {
  recursivelyListFiles,
  getFileContents,
  scanAllFiles,
  doesStringContainKey,
} = require('../keyScanner');
const fakeAccessKey = 'HROJW98L22LOOYHZPPOS';
const fakeSecretAccessKey = '9J9DfWWoQfaSiifm2UQW0eHHniJOkDD/W1fVhSXz';

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

describe('doesStringContainKey', () => {
  test('Returns true when file passed contains an access key', () => {
    const string = `There is a key here ${fakeAccessKey} <= look at it`;

    expect(doesStringContainKey(string)).toBe(true);
  });

  test('Returns true when string passed contains an secret access key', () => {
    const string = `There is a key here ${fakeSecretAccessKey} <= look at it`;

    expect(doesStringContainKey(string)).toBe(true);
  });

  test('Returns false if string passed does not contain any key', () => {
    const string = 'No access keys here. Move along please.';

    expect(doesStringContainKey(string)).toBe(false);
  });
});

describe('scanAllFiles', () => {
  test('Returns a list of files that failed validation if validation fails', () => {
    const expectedFailedFiles = ['package.json'];
    const failedFiles = scanAllFiles('./test/mock-project-with-keys/');

    expect(failedFiles).toEqual(expectedFailedFiles);
  })

  test('Returns true if validation for all files passes', () => { })
})
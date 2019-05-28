class FileToCheck {
  constructor(dir, fileName, contents) {
    this.dir = dir;
    this.fileName = fileName;
    this.contents = contents;
  }
}

module.exports = { FileToCheck };
module.exports = {
  accessKeyRegex: /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/,
  secretAccessKeyRegex: /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/,
}
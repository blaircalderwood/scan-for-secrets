// AWS key regexs from https://aws.amazon.com/blogs/security/a-safer-way-to-distribute-aws-credentials-to-ec2/
export const ACCESS_KEY_REGEX = /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/;
export const SECRET_ACCESS_KEY_REGEX = /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/;
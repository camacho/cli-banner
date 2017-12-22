const parser = require('./parser');

function toList(items) {
  return items.map(item => `- ${item}`).join('\n');
}

function linkFile(danger, file, basename = false) {
  return parser.githubUtils(danger).fileLinks([file], basename);
}

function linkFiles(danger, files) {
  return files.map(file => linkFile(danger, file));
}

module.exports = {
  toList,
  linkFile,
  linkFiles,
};

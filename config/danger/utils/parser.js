const { isExistingFile } = require('../../paths/types');

function prSize(danger) {
  return danger.github.pr.additions + danger.github.pr.deletions;
}

function prBody(danger) {
  return danger.github.pr.body;
}

function modifiedFiles(danger) {
  return danger.git.modified_files.filter(isExistingFile);
}

function createdFiles(danger) {
  return danger.git.created_files.filter(isExistingFile);
}

function touchedFiles(danger) {
  return modifiedFiles(danger).concat(createdFiles(danger));
}

function githubUtils(danger) {
  return danger.github.utils;
}

module.exports = {
  prSize,
  prBody,
  modifiedFiles,
  createdFiles,
  touchedFiles,
  githubUtils,
};

// @flow
const parser = require('../utils/parser');

function checkSize(danger, message, threshold = 1000) {
  const changesCount = parser.prSize(danger);
  if (changesCount > threshold) {
    message(
      `This is a big PR, with ${changesCount} changes.
Consider breaking up these changes into smaller PRs around ${threshold} changes`
    );
  }
}

function checkBodyContent(danger, message) {
  // Warn when the PR body is empty
  if (!parser.prBody(danger)) {
    message('Please add a description to your PR.');
  }
}

module.exports = {
  checkSize,
  checkBodyContent,
};

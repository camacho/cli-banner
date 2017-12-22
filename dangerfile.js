// @flow
const { danger, message, warn, fail } = require('danger');

const pr = require('./config/danger/rules/pr');
const tests = require('./config/danger/rules/tests');

try {
  // Check PR
  pr.checkSize(danger, message);
  pr.checkBodyContent(danger, warn);

  // Check tests
  tests.checkModifiedFilesForCorrespondingTestFileChanges(danger, message);
  tests.checkCreatedFilesForCorrespondingTestFileChanges(danger, warn);
  tests.checkTestFilesForShortcuts(danger, fail);
} catch (error) {
  fail(error);
}

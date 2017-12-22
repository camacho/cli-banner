const fs = require('fs');

const types = require('../../paths/types');

const parser = require('../utils/parser');
const { correspondingTestFile } = require('../utils/fs');
const { toList, linkFiles } = require('../utils/format');

function checkModifiedFilesForCorrespondingTestFileChanges(danger, message) {
  const touchedFiles = parser.touchedFiles(danger);
  const withoutSpec = parser
    .modifiedFiles(danger)
    .filter(types.isAppFile)
    .filter(types.isJSFile)
    .filter(file => touchedFiles.indexOf(correspondingTestFile(file)) === -1);

  if (withoutSpec.length) {
    message(
      `The following files were modified without corresponding test changes.

  That's OK as long as you're refactoring existing code.

  ${toList(linkFiles(danger, withoutSpec))}`
    );
  }
}

function checkCreatedFilesForCorrespondingTestFileChanges(danger, message) {
  const touchedFiles = parser.touchedFiles(danger);

  const filesWithoutTest = parser
    .createdFiles(danger)
    .filter(types.isAppFile)
    .filter(types.isJSFile)
    .filter(file => touchedFiles.indexOf(correspondingTestFile(file)) === -1);

  if (filesWithoutTest.length) {
    message(
      `The following files were created without a corresponding spec file.

  This can cause code coverage to go down and affect the stability of the codebase.

  ${toList(linkFiles(danger, filesWithoutTest))}`
    );
  }
}

function checkTestFilesForShortcuts(danger, message) {
  const onlySpecs = parser
    .touchedFiles(danger)
    .filter(types.isTestFile)
    .filter(file => {
      const content = fs.readFileSync(file, 'utf8');
      return content.includes('it.only') || content.includes('describe.only');
    });

  if (onlySpecs.length) {
    message(`An \`only\` was left in tests, which prevents all other tests from running

  ${toList(linkFiles(danger, onlySpecs))}`);
  }
}

module.exports = {
  checkModifiedFilesForCorrespondingTestFileChanges,
  checkCreatedFilesForCorrespondingTestFileChanges,
  checkTestFilesForShortcuts,
};

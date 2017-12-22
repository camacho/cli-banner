const path = require('path');
const fs = require('fs');

const paths = require('./');

const TEST_EXT = '.spec.js';
const SNAPSHOT_EXT = '.js.snap';
const JS_EXT = '.js';

function absolute(file, dir = paths.rootDir) {
  return path.resolve(dir, file);
}

function isExistingFile(file) {
  return fs.existsSync(file) && fs.lstatSync(file).isFile();
}

function isSrcFile(file) {
  return isExistingFile(file) && file.startsWith(paths.srcDir);
}

function isJSFile(file) {
  return isExistingFile(file) && absolute(file).endsWith(JS_EXT);
}

function isTestFile(file) {
  return (
    (isExistingFile(file) && absolute(file).startsWith(paths.testsDir)) ||
    (file.endsWith(TEST_EXT) ||
      absolute(file).startsWith(paths.acceptanceTestsDir))
  );
}

function isAppFile(file) {
  return isSrcFile(file) && !isSnapshot(file) && !isTestFile(file);
}

function isConfigFile(file) {
  return isExistingFile(file) && absolute(file).startsWith(paths.configDir);
}

function isSnapshot(file) {
  return isExistingFile(file) && absolute(file).endsWith(SNAPSHOT_EXT);
}

function isScriptFile(file) {
  return isExistingFile(file) && absolute(file).startsWith(paths.scriptsDir);
}

function isArtifactFile(file) {
  return isExistingFile(file) && absolute(file).startsWith(paths.artifactsDir);
}

function isDocsFile(file) {
  return isExistingFile(file) && absolute(file).startsWith(paths.docsDir);
}

module.exports = {
  TEST_EXT,
  SNAPSHOT_EXT,
  JS_EXT,
  isExistingFile,
  isSrcFile,
  isJSFile,
  isTestFile,
  isAppFile,
  isSnapshot,
  isConfigFile,
  isScriptFile,
  isArtifactFile,
  isDocsFile,
};

require('../../scripts/utils/configure-process')({
  BABEL_ENV: 'test',
  NODE_ENV: 'test',
});

const path = require('path');

const { libDir, rootDir, jestDir, coverageDir } = require('../paths');

const config = {
  rootDir,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/scripts/',
    '/artifacts/',
    '/docs/',
    '/config/',
  ],
  coverageDirectory: coverageDir,
  collectCoverageFrom: [`${path.relative(rootDir, libDir)}/**/**.js`],
  setupTestFrameworkScriptFile: path.join(jestDir, 'setup.js'),
  testRegex: '.*\\.spec\\.js$',
};

module.exports = config;

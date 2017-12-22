#!/usr/bin/env node
const path = require('path');
const execa = require('execa');

const logErrorTerminate = require('./utils/log-error-terminate');

const { artifactsDir } = require('../config/paths');

const specials = ['bin', 'eslint'].join(',');

const ignoreDirs = [artifactsDir]
  .map(p => path.relative(process.cwd(), p))
  .join(',');

const ignores = [
  'codecov', // used in CI to upload code coverage reports
  'depcheck', // used to search for unnecessary modules
  'format-package', // used in package.json to format contents
  'husky', // git hooks
  'install-deps-postmerge', // used in package.json to install deps
  'lint-staged', // used in package.json to run commands on staged files
].join(',');

execa(
  'yarn',
  [
    'depcheck',
    `--specials=${specials}`,
    `--ignore-dirs=${ignoreDirs}`,
    `--ignores=${ignores}`,
  ],
  {
    stdio: 'inherit',
  }
).catch(logErrorTerminate);

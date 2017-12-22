#!/usr/bin/env node

const Listr = require('listr');
const UpdaterRenderer = require('listr-update-renderer');

const { rootDir } = require('../../config/paths');
const logErrorTerminate = require('../utils/log-error-terminate');

// Run all new processes relative to the root
process.chdir(rootDir);

const gitTask = require('./git');
const lintTask = require('./lint');
const testTask = require('./test');
const depsTask = require('./dependencies');

function validate() {
  return new Listr([gitTask(), lintTask(), testTask(), depsTask()], {
    concurrent: true,
    exitOnError: false,
    renderer: UpdaterRenderer,
  }).run();
}

module.exports = validate;

if (require.main === module) validate().catch(logErrorTerminate);

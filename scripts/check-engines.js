#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const execa = require('execa');
const ora = require('ora');

const rerun = require('./utils/rerun-cmd');
const { error } = require('../config/chalk')(undefined, process.stdout);
const logErrorTerminate = require('./utils/log-error-terminate');
const pkg = require('../package.json');

async function getEngineVersion(engine, args = ['--version']) {
  const version = await execa.stdout(engine, args);
  return (version || '').trim();
}

function checkVersion(version, expected) {
  return semver.satisfies(version, expected);
}

function getPkgEngines(pkg) {
  return pkg.engines || {};
}

function composeErrorMessage(engine, version, expected) {
  const name = [engine.charAt(0).toUpperCase(), engine.slice(1)].join('');
  return `${name} version ${chalk.bold(
    version
  )} does not satisfy the requirement of ${chalk.bold(expected)}`;
}

async function checkPkgEngines(pkg) {
  const failures = [];

  const engines = getPkgEngines(pkg);

  for (const engine in engines) {
    const version = await getEngineVersion(engine);
    const expected = engines[engine];

    if (!checkVersion(version, expected)) {
      failures.push(composeErrorMessage(engine, version, expected));
    }
  }

  return failures;
}

async function execute() {
  const spinner = ora(`Checking engines are valid`).start();
  const failures = await checkPkgEngines(pkg);

  if (failures.length) {
    spinner.fail('Engines are invalid');
    failures.forEach(failure => error(failure));
    console.log(
      `Please update your engine${
        failures.length === 1 ? '' : 's'
      } and ${rerun}`
    );
    process.exit(1);
  } else {
    spinner.succeed('Engines are valid');
    process.exit(0);
  }
}

if (require.main === module) execute().catch(logErrorTerminate);

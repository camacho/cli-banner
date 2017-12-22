const chalk = require('chalk');

// Check if we are in a lifecycle event
let event = process.env.npm_lifecycle_event;

// If we are in a lifecycle event, see what the original call was
// Helpful for when we are in a `pre` or `post` hook
if (event && process.env.npm_config_argv) {
  event = JSON.parse(process.env.npm_config_argv).original.join(' ');
}

// If we have an event, we know this is an npm script execution
const rerun = event ? `run ${chalk.bold(`yarn ${event}`)}` : 're-run';

module.exports = rerun;

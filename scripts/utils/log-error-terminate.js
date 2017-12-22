const { error } = require('../../config/chalk')(undefined, process.stderr);

function logError(err) {
  if (!err) {
    error('Something went wrong!');
    process.exit(1);
  }

  error(err.stderr || err.stdout || err);
  process.exit(err.code || 1);
}

module.exports = logError;

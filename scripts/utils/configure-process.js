const has = require('lodash.has');
// eslint-disable-next-line import/no-unassigned-import
require('../check-engines');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

function configureProcess(env = {}) {
  Object.assign(
    process.env,
    Object.entries(env)
      .filter(([key]) => !has(process.env, key))
      .reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {})
  );

  global.__TEST__ = process.NODE_ENV === 'test';
  global.__PROD__ = process.NODE_ENV === 'production';
  global.__DEV__ = !(global.__PROD__ || global.__TEST__);

  return process;
}

module.exports = configureProcess;

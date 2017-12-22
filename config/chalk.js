// Centralized configuration for chalk, which is used to add color to console.log statements.
const chalk = require('chalk');

function formatTag(tag) {
  if (!tag) return '';
  return [' ', tag.toUpperCase().trim(), ' '].join('');
}

const defaultFormats = {
  info(message, tag = 'info') {
    return [chalk.bgBlue.black(formatTag(tag)), message].join(' ');
  },
  error(message, tag = 'error') {
    return [chalk.bgRed.white(formatTag(tag)), message].join(' ');
  },
  log(message, tag = 'log') {
    return [chalk.bgWhite.black(formatTag(tag)), message].join(' ');
  },
  warn(message, tag = 'warn') {
    return [chalk.bgYellow.black(formatTag(tag)), message].join(' ');
  },
  success(message, tag = 'success') {
    return [chalk.bgGreen.black(formatTag(tag)), message].join(' ');
  },
};

function makeLoggers(formats = defaultFormats, stream = process.stdout) {
  return Object.keys(formats).reduce((obj, key) => {
    function logger() {
      let message = formats[key](...arguments);
      if (!message.endsWith('\n')) message += '\n';
      stream.write(message);
    }

    obj[key] = logger;
    return obj;
  }, {});
}

Object.keys(defaultFormats).forEach(k => (makeLoggers[k] = defaultFormats[k]));
module.exports = makeLoggers;

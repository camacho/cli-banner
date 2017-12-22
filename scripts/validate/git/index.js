const Listr = require('listr');
const UpdaterRenderer = require('listr-update-renderer');
const statusTask = require('./status');
const remoteTask = require('./remote');

module.exports = function gitTask() {
  return {
    title: 'Git',
    task: () =>
      new Listr([statusTask(), remoteTask()], {
        concurrent: false,
        exitOnError: false,
        renderer: UpdaterRenderer,
      }),
  };
};

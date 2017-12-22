const execa = require('execa');

module.exports = function gitRemoteTask() {
  return {
    title: 'Checking remote history is same',
    task: () =>
      execa
        .stdout('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD'])
        .then(result => {
          if (result !== '0') {
            throw new Error('Remote history differ. Please pull changes.');
          }
        }),
  };
};

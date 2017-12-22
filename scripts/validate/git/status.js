const execa = require('execa');

module.exports = function gitStatusTask() {
  return {
    title: 'Clean git status',
    task: () =>
      execa.stdout('git', ['status', '--porcelain']).then(result => {
        if (result !== '') {
          throw new Error(
            'Unclean working tree. Commit or stash changes first.'
          );
        }
      }),
  };
};

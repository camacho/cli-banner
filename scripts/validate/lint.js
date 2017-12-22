const execa = require('execa');

module.exports = function lintTask() {
  return {
    title: 'Lint',
    task: () =>
      execa('yarn', ['lint']).catch(result => {
        const output = result
          .toString()
          .split('\n')
          .slice(3)
          .join('\n')
          .trim();
        throw new Error(output);
      }),
  };
};

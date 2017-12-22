const path = require('path');
const execa = require('execa');
const { srcDir } = require('../../config/paths');

module.exports = function unusedTask() {
  return {
    title: 'Unused dependencies',
    task: () =>
      execa('yarn', [
        'deps:unused',
        path.relative(process.cwd(), srcDir),
      ]).catch(result => {
        const output = result
          .toString()
          .split('\n')
          .map(v => (v ? v.trim() : ''))
          .filter(v => !!v)
          .join('\n');
        throw new Error(output);
      }),
  };
};

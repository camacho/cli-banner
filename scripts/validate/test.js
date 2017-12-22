const execa = require('execa');

module.exports = function testTask() {
  return {
    title: 'Test',
    task: () =>
      execa('yarn', ['test']).catch(result => {
        const lines = result.stderr.split('\n');
        const lastJestLine = lines.findIndex(line => {
          return line.startsWith('\u001b[2mRan all test suites');
        });

        throw new Error(`\n${lines.slice(0, lastJestLine).join('\n')}`);
      }),
  };
};

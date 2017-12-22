// NOTE: borrowed from React core test setup
//       https://github.com/facebook/react/blob/master/scripts/jest/test-framework-setup.js

const env = jasmine.getEnv();

const isSpy = spy => spy.calls && typeof spy.calls.count === 'function';

['error', 'warn'].forEach(methodName => {
  const oldMethod = console[methodName];
  const newMethod = function() {
    newMethod.__callCount++;
    oldMethod.apply(this, arguments);
  };
  newMethod.__callCount = 0;
  console[methodName] = newMethod;

  env.beforeEach(() => {
    newMethod.__callCount = 0;
  });

  env.afterEach(() => {
    if (console[methodName] !== newMethod && !isSpy(console[methodName])) {
      throw new Error(
        'Test did not tear down console.' + methodName + ' mock properly.'
      );
    }
    if (console[methodName].__callCount !== 0) {
      throw new Error(
        'Expected test not to call console.' +
          methodName +
          '(). ' +
          'If the warning is expected, mock it out using ' +
          "spyOn(console, '" +
          methodName +
          "') and test that the " +
          'warning occurs.'
      );
    }
  });
});

const composeBanner = require('./index');

describe('composeBanner', () => {
  it('prints a string', () => {
    expect(composeBanner('hello world')).toMatchSnapshot();
  });
  it('wraps long strings', () => {
    expect(
      composeBanner(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      )
    ).toMatchSnapshot();
  });
  it('respects breaks', () => {
    expect(composeBanner('hello\nworld')).toMatchSnapshot();
  });
});

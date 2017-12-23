const chalk = require('chalk');
const wrap = require('word-wrap');

function composeBanner(str, _options = {}) {
  const options = Object.assign(
    {},
    {
      paddingLength: 3,
      width: 80,
      color: 'white',
      borderTopLeftCorner: '┌',
      borderTopRightCorner: '┐',
      borderBottomRightCorner: '┘',
      borderBottomLeftCorner: '└',
      borderVertical: '│',
      borderHorizontal: '─',
      borderColor: 'white',
    },
    _options
  );

  if (options.width === 'auto') options.width = process.stdout.columns;

  return [
    printTopBorder(
      options.width,
      options.borderTopLeftCorner,
      options.borderHorizontal,
      options.borderTopRightCorner,
      options.borderColor
    ),
    printContent(
      str,
      options.width,
      options.paddingLength,
      options.color,
      options.borderVertical,
      options.borderColor
    ),
    printBottomBorder(
      options.width,
      options.borderBottomLeftCorner,
      options.borderHorizontal,
      options.borderBottomRightCorner,
      options.borderColor
    ),
  ].join('\n');
}

function printTopBorder(
  width,
  topLeftCorner,
  border,
  topRightCorner,
  borderColor
) {
  return chalk[borderColor](
    [topLeftCorner, border.repeat(width - 2), topRightCorner].join('')
  );
}

function printBottomBorder(
  width,
  bottomLeftCorner,
  border,
  bottomRightCorner,
  borderColor
) {
  return chalk[borderColor](
    [bottomLeftCorner, border.repeat(width - 2), bottomRightCorner].join('')
  );
}

function printRow(str, width, paddingLength, color, border, borderColor) {
  const borderLength = border.length;
  const extraSpace = width - 2 * (paddingLength + borderLength) - str.length;

  const leftSpacing = Math.floor(extraSpace / 2);
  const rightSpacing = Math.ceil(extraSpace / 2);

  return [
    chalk[borderColor](border),
    ' '.repeat(paddingLength + leftSpacing),
    chalk[color](str),
    ' '.repeat(paddingLength + rightSpacing),
    chalk[borderColor](border),
  ].join('');
}

function printContent(input, width, paddingLength, color, border, borderColor) {
  const borderLength = border.length;
  return input
    .split('\n')
    .map(str =>
      wrap(str, {
        width: width - 2 * (paddingLength + borderLength),
      }).split('\n')
    )
    .reduce((output, strs) => output.concat(strs), [])
    .map(str => str.trim())
    .map(str => printRow(str, width, paddingLength, color, border, borderColor))
    .join('\n');
}

module.exports = composeBanner;

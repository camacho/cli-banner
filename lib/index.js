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
  const extraSpace = width - 2 - 2 * paddingLength - str.length;

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

function printContent(str, width, paddingLength, color, border, borderColor) {
  return wrap(str, { width: width - 2 * paddingLength })
    .split('\n')
    .map(s => s.trim())
    .map(s => printRow(s, width, paddingLength, color, border, borderColor))
    .join('\n');
}

module.exports = composeBanner;

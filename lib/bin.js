#!/usr/bin/env node
const yargs = require('yargs');
const composeBanner = require('./index');

const colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
];

const argv = yargs
  .usage('$0 <str>', 'print a banner', yargs => {
    yargs.positional('str', {
      type: 'string',
      describe: 'Content for banner',
      coerce: str => str.replace(new RegExp('\\\\n', 'g'), '\n'),
    });
  })
  .options({
    w: {
      alias: 'width',
      description: 'Width of banner',
      default: 80,
      type: ['number', 'string'],
    },
    b: {
      alias: 'borderColor',
      description: 'Color of border',
      default: 'white',
      type: 'string',
      choices: colors,
      nargs: 1,
    },
    c: {
      alias: 'color',
      description: 'Color of text',
      default: 'white',
      type: 'string',
      choices: colors,
      nargs: 1,
    },
  })
  .strict()
  .help('h').argv;

console.log(composeBanner(argv.str, argv));

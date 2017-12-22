#!/usr/bin/env node
const path = require('path');
const markdownMagic = require('markdown-magic');
const DEPENDENCYTABLE = require('markdown-magic-dependency-table');
const logErrorTerminate = require('./utils/log-error-terminate');

const rootDir = path.resolve(__dirname, '..');
const markdownPaths = [`${rootDir}/**/**.md`, `!${rootDir}/node_modules/**`];

// Add any configurations here
const config = {
  transforms: {
    DEPENDENCYTABLE,
  },
};

try {
  markdownMagic(markdownPaths, config);
} catch (err) {
  logErrorTerminate(err);
}

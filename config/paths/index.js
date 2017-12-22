const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const configDir = path.join(rootDir, 'config');
const artifactsDir = path.join(rootDir, 'artifacts');
const libDir = path.join(rootDir, 'lib');
const nodeModules = path.join(rootDir, 'node_modules');

const paths = {
  rootDir,
  libDir,
  nodeModules,
  configDir,
  jestDir: path.join(configDir, 'jest'),
  scriptsDir: path.join(rootDir, 'scripts'),
  docsDir: path.join(rootDir, 'docs'),
  artifactsDir,
  coverageDir: path.join(artifactsDir, 'coverage'),
};

module.exports = paths;

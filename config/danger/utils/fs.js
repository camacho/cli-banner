const path = require('path');

const { TEST_EXT, STORY_EXT } = require('../../paths/types');

function correspondingTestFile(file) {
  return path.join(
    path.dirname(file),
    [path.basename(file, '.js'), TEST_EXT].join('')
  );
}

function correspondingStoryFile(file) {
  return path.join(
    path.dirname(file),
    [path.basename(file, '.js'), STORY_EXT].join('')
  );
}

module.exports = {
  correspondingTestFile,
  correspondingStoryFile,
};

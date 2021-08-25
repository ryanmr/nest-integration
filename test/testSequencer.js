// testSequencer.js
const Sequencer = require('@jest/test-sequencer').default;
const util = require('util');

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);

    const sortedTests = copyTests.sort((testA, testB) =>
      testA.path > testB.path ? 1 : -1,
    );

    // sortedTests.forEach((test) => console.log(test.path));

    return sortedTests;
  }
}

module.exports = CustomSequencer;

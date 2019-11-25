module.exports = {
  name: 'material',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/material',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

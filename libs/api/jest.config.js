module.exports = {
  name: 'api',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/api',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

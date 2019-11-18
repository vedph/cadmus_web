module.exports = {
  name: 'cadmus',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/cadmus',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

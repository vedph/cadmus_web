module.exports = {
  name: 'cadmus',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/cadmus',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

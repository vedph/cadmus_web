module.exports = {
  name: 'features-edit-state',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/edit-state',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

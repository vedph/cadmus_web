module.exports = {
  name: 'features-feature-user',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-user',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

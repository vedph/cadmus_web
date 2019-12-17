module.exports = {
  name: 'features-feature-reset-password',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-reset-password',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

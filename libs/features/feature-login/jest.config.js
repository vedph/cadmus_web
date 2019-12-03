module.exports = {
  name: 'features-feature-login',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-login',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

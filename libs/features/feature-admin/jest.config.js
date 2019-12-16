module.exports = {
  name: 'features-feature-admin',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-admin',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

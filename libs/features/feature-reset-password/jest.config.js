module.exports = {
  name: 'features-feature-reset-password',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-reset-password',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

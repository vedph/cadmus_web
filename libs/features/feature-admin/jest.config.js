module.exports = {
  name: 'features-feature-admin',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-admin',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

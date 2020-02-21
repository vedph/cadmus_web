module.exports = {
  name: 'features-feature-item-editor',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-item-editor',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

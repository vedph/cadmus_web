module.exports = {
  name: 'features-feature-item-search',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-item-search',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

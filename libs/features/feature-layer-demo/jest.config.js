module.exports = {
  name: 'features-feature-layer-demo',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-layer-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

module.exports = {
  name: 'features-feature-layer-demo',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-layer-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

module.exports = {
  name: 'features-feature-item-editor',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-item-editor',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

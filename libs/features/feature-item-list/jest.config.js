module.exports = {
  name: 'features-feature-item-list',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/feature-item-list',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

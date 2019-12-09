module.exports = {
  name: 'features-features-ui',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/features-ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

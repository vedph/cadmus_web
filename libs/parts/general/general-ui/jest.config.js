module.exports = {
  name: 'parts-general-general-ui',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/parts/general/general-ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

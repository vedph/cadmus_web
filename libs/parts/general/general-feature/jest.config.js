module.exports = {
  name: 'parts-general-general-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/parts/general/general-feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

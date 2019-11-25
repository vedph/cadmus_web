module.exports = {
  name: 'parts-philology-philology-ui',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/parts/philology/philology-ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

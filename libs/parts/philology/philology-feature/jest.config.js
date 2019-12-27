module.exports = {
  name: 'parts-philology-philology-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/parts/philology/philology-feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

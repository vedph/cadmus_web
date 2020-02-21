module.exports = {
  name: 'parts-philology-philology-ui',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/parts/philology/philology-ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

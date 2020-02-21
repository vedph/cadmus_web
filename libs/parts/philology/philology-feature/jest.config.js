module.exports = {
  name: 'parts-philology-philology-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/parts/philology/philology-feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

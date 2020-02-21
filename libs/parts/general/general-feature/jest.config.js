module.exports = {
  name: 'parts-general-general-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/parts/general/general-feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

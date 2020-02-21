module.exports = {
  name: 'parts-general-general-ui',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/parts/general/general-ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

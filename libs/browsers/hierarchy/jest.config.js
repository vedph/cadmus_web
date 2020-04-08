module.exports = {
  name: 'browsers-hierarchy',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/browsers/hierarchy',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

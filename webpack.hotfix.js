const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const S3BuildArtifactWebpackPlugin = require('@swipejobs/s3-build-artifact-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new S3BuildArtifactWebpackPlugin({
      versionNumber: process.env.HOTFIX + '-' + process.env.GO_PIPELINE_COUNTER,
      s3BucketName: process.env.S3_ARTIFACTS_BUCKET,
      appName: 'sample',
    }),
  ],
});

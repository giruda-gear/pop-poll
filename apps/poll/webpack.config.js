const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = (config, context) => {
  return {
    mode: context.configuration === 'production' ? 'production' : 'development',
    output: {
      path: join(__dirname, '../../dist/apps/poll'),
    },
    devtool: context.configuration === 'production' ? false : 'source-map',
    plugins: [
      new NxAppWebpackPlugin({
        target: 'node',
        compiler: 'tsc',
        main: './src/main.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['./src/assets'],
        optimization: context.configuration === 'production',
        outputHashing: 'none',
        generatePackageJson: true,
      }),
    ],
  };
};
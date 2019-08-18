const path = require('path');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = {
  mode: "production",
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js'
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }
    ]
  },
  plugins: [
    new PeerDepsExternalsPlugin(),
  ],
};
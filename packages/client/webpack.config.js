const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

// loads configs
const devConfig = require('./config/development');
const prodConfig = require('./config/production');

const src = path.resolve(process.cwd(), 'src');
const assets = path.resolve(process.cwd(), 'assets');
const data = path.resolve(process.cwd(), 'data');
const dist = path.resolve(process.cwd(), 'dist');
const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  entry: {
    client: `${src}/index.js`,
  },
  output: {
    path: dist,
    publicPath: '/',
    filename: `[name].${isProd ? '[hash].min.js' : 'js'}`,
    pathinfo: !isProd,
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
  ],
  module: {
    rules: [
      // eslint
      {
        test: /\.(jsx?vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [src],
        exclude: [/(node_modules|bower_components)/],
      },

      // javascript loaader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /\/node_modules\//,
      },

      // single-file vue template loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: isProd,
        },
      },

      // css loader
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
        ],
      },

      // sass loader
      {
        test: /\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          {
            loader: 'sass-loader',
          },
        ],
      },

      // static asset loader
      {
        test: /\.(jpg|jpeg|gif|png|ico|ttf|eot|dtd|svg|woff(2)?)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader',
        options: {
          context: assets,
          name: 'assets/[path][name].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [src, path.resolve('./node_modules')],
    extensions: ['.js', '.jsx', '.vue', '.json', '.scss', '.css', '.html', '.svg', '.png', '.jpeg'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': src,
      '@bootstrap': path.resolve(__dirname, '../../node_modules/bootstrap/'), // fixes mono-repo imports
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].${isProd ? '[contenthash].min.css' : 'css'}`,
      disable: false,
      allChunks: true,
    }),

    new HtmlWebpackPlugin({
      template: `${src}/index.html`,
      inject: false, // Do not inject, we'll do it manually
    }),

    new CopyWebpackPlugin([
      { from: assets, to: `${dist}/assets` }, // move all static assets
      { from: data, to: `${dist}/data` }, // move imported player data
    ], {
      copyUnmodified: false,
    }),

    new VueLoaderPlugin(),
    new HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(isProd ? prodConfig : devConfig), // injects env-specific config
  ],
  devtool: isProd ? 'nosources-source-map' : 'eval-source-map',
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
};

if (isProd) {
  // minimizes and splits code into css, vendor, and app bundles
  config.optimization = {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
          mangle: true,
          safari10: true,
          compress: {
            unused: true,
            dead_code: true,
            warnings: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  };
  config.plugins.push(new WebpackChunkHash());
}

module.exports = config;

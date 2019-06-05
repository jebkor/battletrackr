const webpack = require('webpack');
const path = require('path');

const loaders = require('./webpack/loaders'); // Seperate file with all of the loaders
const plugins = require('./webpack/plugins'); // Seperate file with all of the plugins



module.exports = {
  entry: {
    main: [
      './src/scss/all.scss',
      './node_modules/vuetify/dist/vuetify.min.css',
      './src/js/index.js'
    ]
  },
  module: {
    rules: [
      loaders.FileLoader,
      loaders.CssLoader,
      loaders.JSLoader,
      // loaders.TSLoader,
      loaders.VueLoader
    ]
  },
  resolve: {
    extensions: ['.html', '.scss', '.css', '.js', '.vue', '.ts'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      Vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    plugins.VueLoaderPlugin,
	plugins.MiniExtractPlugin,
	new webpack.DefinePlugin({
		'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT)
	})
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        }
      }
    }
  }
};
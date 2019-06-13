const path = require('path')
const MiniExtractPlugin = require('mini-css-extract-plugin');

// const ESLintLoader = {
//     enforce: 'pre',
//     test: /\.(js|vue)$/,
//     loader: 'eslint-loader',
//     exclude: /node_modules/,
//     options: {
//         eslint: {
//             configFile: path.join(__dirname, '../.eslintrc.js'),
//         },
//     },
// }

const JSLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        presets: [
            '@babel/env',
        ],
        plugins: [
            'transform-es2015-shorthand-properties'
        ],
    },
}

const VueLoader = {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            scss: 'style-loader!MiniExtractPlugin.loader!css-loader?minimize=true!postcss-loader?path=./postcss.config.js!sass-loader',
            js: 'babel-loader',
            css: 'style-loader!css-loader',
        },
    },
}

const CssLoader = {
    test: /\.(css|scss)$/,
    use: [
        'style-loader',
        MiniExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                minimize: true,
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: __dirname + '/postcss.config.js',
                }
            }
        },
        'sass-loader',
    ],
}

const FileLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    exclude: /node_modules/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192,
        },
    }],
}

module.exports = {
    // ESLintLoader,
    JSLoader,
    VueLoader,
    CssLoader,
    FileLoader,
}

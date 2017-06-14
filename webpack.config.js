var HtmlwebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');


module.exports = {
    entry: {
        vendor: [ 'babel-polyfill', 'lodash' ],
        main: './src/main.js'
    },
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                // blacklist node_modules scripts from being processed via Babel
                exclude: /node_modules/,
                // or you can use a whitelist:
                // include: [ path.resolve(__dirname, "src") ],

                // pass in options to babel loader
                options: {
                    // prevents multiple versions of e.g. regeneratorRuntime from
                    // being created when using generators in multiple files
                    plugins: ['transform-runtime'],
                    // tell Babel which presets to use
                    presets: ['es2015']
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Intro to webpack',
            template: 'src/index.html'
        }),
new UglifyJsPlugin({
            beautify: false,
            mangle: { screw_ie8 : true },
            compress: { screw_ie8: true, warnings: false },
            comments: false
        }),
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        })
    ]
};

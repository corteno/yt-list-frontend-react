module.exports = {
    entry: [
        /*'webpack-dev-server/client?http://0.0.0.0:80',
        'webpack/hot/only-dev-server',
        config.paths.demo*/
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        port: 9000
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        isemail: 'empty'
    }/*,
    plugins:[new webpack.HotModuleReplacementPlugin()]*/
};

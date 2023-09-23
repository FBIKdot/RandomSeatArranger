const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.js'],
    },
    devServer: {
        open: false,
        port: 8080,
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            minify: true,
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/niva.json', // 输入文件
                    to: 'niva.json', // 输出文件
                },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/student.json', // 输入文件
                    to: 'student.json', // 输出文件
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/i,
                loader: 'esbuild-loader',
                options: {
                    target: 'es2015',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

const path = require('path');

module.exports = {
    mode: 'development', //change to production when you want to deploy and enable optimization such as minification and removing unused code from the final bundle
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        'tailwindcss',
                        'autoprefixer',
                      ],
                    },
                  },
                }
              ],
            }
        ]
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

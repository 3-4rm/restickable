module.exports = {
    entry: ['babel-polyfill', './app.js'],
    output: {
        path: './bin',
        filename: 'app.bundle.js'
    },
    module:{
      loaders:[
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },

        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        },

        {
            test: /\.css$/,
            loaders: ['style', 'css', 'sass']
        },
      ]
    }
};

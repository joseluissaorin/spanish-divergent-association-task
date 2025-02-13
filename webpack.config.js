const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    app: './static/js/app.js',
    components: [
      './static/js/components/Logo.js',
      './static/js/components/Navigation.js',
      './static/js/components/Layout.js',
      './static/js/components/WordGrid.js',
      './static/js/components/ErrorBoundary.js',
      './static/js/components/RetryWrapper.js',
      './static/js/components/Footer.js'
    ],
    pages: [
      './static/js/pages/Home.js',
      './static/js/pages/Test.js',
      './static/js/pages/Results.js',
      './static/js/pages/About.js',
      './static/js/pages/FAQ.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'static/dist'),
    filename: '[name].bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}; 
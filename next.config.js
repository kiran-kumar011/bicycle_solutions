const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const envConfig = require('config');

module.exports = withSass(
  withCSS({
    webpack: (config, { isServer }) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        "~": __dirname // eslint-disable-line
      };

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      });

      // if (!isServer) {
      //   config.node = {
      //     fs: 'empty',
      //     net: 'empty'
      //   }
      // }

      return config;
    },

    publicRuntimeConfig: {
      applicationUrl: envConfig.get('APPLICATION_URL'),
    },
  })
);

module.exports = {
  plugins: ['transform-remove-console', '@babel/plugin-transform-react-jsx'],
  // to remove console from production build...
  // env: {
  //   production: {
  //     plugins: [
  //       // 'transform-remove-console',
  //       '@babel/plugin-transform-react-jsx',
  //     ],
  //   },
  // },
};

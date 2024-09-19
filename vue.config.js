const { defineConfig } = require('@vue/cli-service');
const { DefinePlugin } = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Add custom Webpack configuration
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        __VUE_OPTIONS_API__: true, // Enable or disable the Options API
        __VUE_PROD_DEVTOOLS__: false, // Disable devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Define the feature flag here
      })
    ]
  }
});

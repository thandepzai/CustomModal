const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback, // Don't forget this if you want to keep existing fallback behavior!
    timers: require.resolve("timers-browserify"),
  };
  return config;
};

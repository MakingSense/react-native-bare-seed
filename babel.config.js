module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['inline-dotenv'],
    sourceMap: true,
    comments: true
  };
};

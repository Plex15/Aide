// /app/metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  // --- THIS IS THE KEY PART ---
  // Explicitly tell Metro to look at the 'src' directory.
  watchFolders: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'src/Core')
  ],
  // --- END KEY PART ---
};

// We are NOT using the buggy 'watcher' key, just relying on the explicit folders.
module.exports = mergeConfig(defaultConfig, config);
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  plugins: ['react-native-reanimated/plugin'],
  assets: ['./src/assets/fonts/'],
}

module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-docs'],
  webpackFinal: async (config) => {
    config.module.rules.push(...[
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
          {
            loader: require.resolve('react-docgen-typescript-loader'),
          },
        ],
      },
      {
        test: /\.(gltf|glb)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
          },
        ]
      }
    ]);

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};

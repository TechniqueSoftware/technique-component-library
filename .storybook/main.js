module.exports = {
  'stories': [
    "../src/**/*.stories.tsx",
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    'storybook-css-modules-preset'
  ],
  'framework': '@storybook/react',
  'webpackFinal': async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@axios': `${__dirname}/../src/axios`,
      '@components': `${__dirname}/../src/components`,
      '@global': `${__dirname}/../src/global`,
      '@parts': `${__dirname}/../src/parts`,
      '@redux': `${__dirname}/../src/redux`,
      '@utils': `${__dirname}/../src/utils`
    }
    return config
  }
}

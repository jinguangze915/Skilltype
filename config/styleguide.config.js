const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackConfig = require('./webpack.config.dev.js')

module.exports = {
  components: path.join(
    __dirname,
    '../packages/skilltype-ui/components/**/*.js'
  ),
  webpackConfig: {
    ...webpackConfig,
    plugins: [
      ...webpackConfig.plugins,
      new CopyWebpackPlugin([path.join(__dirname, '../public')]),
    ],
  },
  skipComponentsWithoutExample: true,
  styleguideDir: path.join(__dirname, '../build'),
  styleguideComponents: {
    Wrapper: path.join(
      __dirname,
      '../packages/skilltype-ui/components/Viewport/ThemedViewport'
    ),
  },
  styles: {
    Playground: {
      preview: {
        padding: 5,
      },
    },
  },
  template: {
    title: 'extended-usage',
    favicon: '/favicon.ico',
  },
  title: 'Skilltype Component Library',
  sections: [
    {
      name: 'Buttons',
      components: '../packages/skilltype-ui/components/Button/*.js',
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Forms and Inputs',
      components: ['../packages/skilltype-ui/components/Form/*.js'],
      sections: [
        {
          name: 'Inputs',
          components: [
            '../packages/skilltype-ui/components/Form/*.js',
            '../packages/skilltype-ui/components/Checkbox/*.js',
            '../packages/skilltype-ui/components/Radio/*.js',
            '../packages/skilltype-ui/components/ColorPicker/*.js',
            '../packages/skilltype-ui/components/Select/*.js',
            '../packages/skilltype-ui/components/TextInput/*.js',
            '../packages/skilltype-ui/components/ListPicker/*.js',
          ],
          exampleMode: 'collapse',
          usageMode: 'collapse',
        },
        {
          name: 'Fields',
          components: '../packages/skilltype-ui/components/Form/Fields/*.js',
          exampleMode: 'collapse',
          usageMode: 'collapse',
        },
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Menus',
      components: [
        '../packages/skilltype-ui/components/Menu/*.js',
        '../packages/skilltype-ui/components/MenuBar/*.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Cards',
      components: [
        '../packages/skilltype-ui/components/Card/*.js',
        '../packages/skilltype-ui/components/ProfileCard/*.js',
        '../packages/skilltype-ui/components/ProfileAvatar/*.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Tags',
      components: [
        '../packages/skilltype-ui/components/Tag/*.js',
        '../packages/skilltype-ui/components/TagList/*.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Loading and Notification',
      components: [
        '../packages/skilltype-ui/components/Await/*.js',
        '../packages/skilltype-ui/components/Progress/*.js',
        '../packages/skilltype-ui/components/Notify/*.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Layout',
      components: [
        '../packages/skilltype-ui/components/Viewport/*.js',
        '../packages/skilltype-ui/components/Table/*.js',
        '../packages/skilltype-ui/components/Responsive/*.js',
        '../packages/skilltype-ui/components/Section/*.js',
        '../packages/skilltype-ui/components/ProfileSection/*.js',
        '../packages/skilltype-ui/components/Modal/*.js',
        '../packages/skilltype-ui/components/Heading/*.js',
        '../packages/skilltype-ui/components/Hero/*.js',
        '../packages/skilltype-ui/components/Footer/*.js',
        '../packages/skilltype-ui/components/Router/*.js',
        '../packages/skilltype-ui/components/Drawer/*.js',
        '../packages/skilltype-ui/components/TextDivider/*.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Library',
      components: '../packages/skilltype-ui/components/Library/*.js',
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Maps',
      components: '../packages/skilltype-ui/components/Map/*.js',
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
  ],
}

# Skilltype Web (@skilltype/web)

This is the web frontend for www.skilltype.com and app.skilltype.com.

## Getting Started

To run the web app on your machine:

```bash
git clone git@github.com:skilltype/skilltype-web.git
yarn
yarn start
```

_If you're a new developer working on the project_  
Please see our [CONTRIBUTING](CONTRIBUTING.md) guide.

## Table of Contents

- [Packages](#packages)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn start:login](#yarn-startlogin)
  - [yarn test](#yarn-test)
  - [yarn build](#yarn-build)
  - [yarn flow](#yarn-flow)
  - [yarn styleguide](#yarn-styleguide)
  - [yarn styleguide:build](#yarn-styleguidebuild)
  - [yarn storybook](#yarn-storybook)
  - [yarn storybook:build](#yarn-storybookbuild)
  - [yarn lint](#yarn-lint)
  - [yarn sync-versions](#yarn-sync-versions)
- [Deployment](#deployment)
  - [development](#development)
  - [production](#production)
- [Supported Browsers](#supported-browsers)
- [Supported Language Features and Polyfills](#supported-language-features-and-polyfills)
- [Syntax Highlighting in the Editor](#syntax-highlighting-in-the-editor)
- [Code Splitting](#code-splitting)
- [JSS](#jss)
- [Adding Images, Fonts, and Files](#adding-images-fonts-and-files)
- [Using the `public` Folder](#using-the-public-folder)
  - [Changing the HTML](#changing-the-html)
  - [Adding Assets Outside of the Module System](#adding-assets-outside-of-the-module-system)
  - [When to Use the `public` Folder](#when-to-use-the-public-folder)
- [Using Global Variables](#using-global-variables)
- [Adding Custom Environment Variables](#adding-custom-environment-variables)
  - [Referencing Environment Variables in the HTML](#referencing-environment-variables-in-the-html)
  - [Adding Temporary Environment Variables In Your Shell](#adding-temporary-environment-variables-in-your-shell)
  - [Adding Development Environment Variables In `.env`](#adding-development-environment-variables-in-env)
- [Can I Use Decorators?](#can-i-use-decorators)
- [Analyzing the Bundle Size](#analyzing-the-bundle-size)

## Packages

- [@skilltype/ui](packages/skilltype-ui)  
  A shared component and module library for defining the UI/UX of Skilltype's web apps.
- [@skilltype/services](packages/skilltype-services)  
  A shared library of service methods for interacting with Skilltype resources (e.g. API endpoints) as well as generic resources (e.g. cookies, storage, external APIs, etc).
- [@skilltype/guest](packages/skilltype-guest)  
  The web app that runs on the public-facing www.skilltype.com.  
  **_NOTE_**
  We are currently using Squarespace for www.skilltype.com, so this app is unused
- [@skilltype/user](packages/skilltype-user)  
  The web app that runs on the authenticated user-facing app.skilltype.com.
- [@skilltype/login](packages/skilltype-login)  
  The web app that runs on the unauthenticated app.skilltype.com/login.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the `@skilltype/user` app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

**_NOTE_**
Because the `@skilltype/user` app depends on authentication, the `@skilltype/login` app is also built. However, the `@skilltype/login` app lives as a static build at [http://localhost:3000/login](http://localhost:3000/login), so changes to the source in the `@skilltype/login` package will not be reflected.

If you want to develop on the `@skilltype/login` app, see [yarn start:login](#yarn-startlogin).

### `yarn start:login`

Runs the `@skilltype/login` app in the development mode.  
Open [http://localhost:3000/login](http://localhost:3000/login) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `yarn test`

Runs the linter and the [Jest](https://jestjs.io/) test runner in the interactive watch mode. It is a good idea to have this running while you develop to catch problems and ensure everything is passing before you make a PR.

Learn more about writing tests in the [Contributing doc](CONTRIBUTING.md#writing-tests)

### `yarn build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

### `yarn flow`

Runs the flow type linter.

Flow is a static type checker that helps you write code with fewer bugs. Check out this [introduction to using static types in JavaScript](https://medium.com/@preethikasireddy/why-use-static-types-in-javascript-part-1-8382da1e0adb) if you are new to this concept.

### `yarn styleguide`

This will start the [Styleguidist](https://react-styleguidist.js.org/) server and make the styleguide available at: http://localhost:6060

Styleguidist combines a style guide, where all your components are presented on a single page with their props documentation and usage examples, with an environment for developing components in isolation, similar to Storybook. In Styleguidist you write examples in Markdown, where each code snippet is rendered as a live editable playground.

### `yarn styleguide:build`

This builds the Styleguidist styleguide to a static site that you can publish.

### `yarn storybook`

This will start the [Storybook](https://storybook.js.org/) server and make the Storybook Demo site available at: http://localhost:6006

#### Demo Usage

We use Storybook to demo our modules. To load the table of contents, browse to http://localhost:6006. Then, once you're on a module, add `iframe.html` before the query string to load a standalone version of the module. This is necessary, for example, when testing or demoing a module on mobile, where the IFRAME interface will interfere with fullscreen functionality.

#### Demo URL Example

If the URL in the Storybook interface is  
`https://localhost:6006/?selectedKind=Profile&selectedStory=Edit%20Profile&full=1&addons=0&stories=1&panelRight=0`  
then the standalone demo URL would be
`https://localhost:6006/iframe.html?selectedKind=Profile&selectedStory=Edit%20Profile&full=1&addons=0&stories=1&panelRight=0`

### `yarn storybook:build`

This builds the Storybook app to a static site that you can publish.

### `yarn lint`

This runs `eslint` on the codebase and reports problems. See also [yarn test](#yarn-test)

### `yarn sync-versions`

This updates the versions of all of the workspaces sub-packages to match the version in the root-level `package.json`. Run this after bumping the version. See [CONTRIBUTING](CONTRIBUTING.md) for more about versioning.

### `yarn import-data`

Updates the relevant JSON files with data from Skilltype Vocabularies. Affiliations, products, and skills should be kept in sync with the spreadsheet and the backend.

**Arguments**

`$ yarn import-data affiliations|products|skills path-to-data.csv`

## Deployment

We use Continuous Integration (CI) to deploy the various Skilltype apps to servers on Heroku.

### Development

When you push to the `master` branch, three builds are kicked off:

- `styleguide`  
  The component library docs are built and published to https://skilltype-styleguide-dev.herokuapp.com
- `storybook`  
  The demo site is built and published to https://skilltype-demo-dev.herokuapp.com
- `user web`
  The authenticated user-facing site (`@skilltype/user`) is published to
  https://skilltype-app-dev.herokuapp.com  
  Additionally, the login app (`@skilltype/login`) is built and published to
  https://skilltype-app-dev.herokuapp.com/login

### Production

When you push to the `production` branch, three builds are kicked off:

- `styleguide`  
  The component library docs are built and published to https://skilltype-styleguide.herokuapp.com
- `storybook`  
  The demo site is built and published to https://skilltype-demo.herokuapp.com
- `user web`
  The authenticated user-facing site (`@skilltype/user`) is published to
  https://app.skilltype.com  
  Additionally, the login app (`@skilltype/login`) is built and published to
  https://app.skilltype.com/login

## Supported Browsers

The generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

Check back here for known browser compatability issues as the project is developed.

## Supported Language Features and Polyfills

This project supports a superset of the latest JavaScript standard.  
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

- [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
- [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
- [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
- [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
- [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal).
- [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and [Flow](https://flowtype.org/) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

While we recommend using experimental proposals with some caution, Facebook heavily uses these features in the product code, so we intend to provide [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb) if any of these proposals change in the future.

Note that **the project only includes a few ES6 [polyfills](https://en.wikipedia.org/wiki/Polyfill)**:

- [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) via [`object-assign`](https://github.com/sindresorhus/object-assign).
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) via [`promise`](https://github.com/then/promise).
- [`fetch()`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) via [`whatwg-fetch`](https://github.com/github/fetch).

If you use any other ES6+ features that need **runtime support** (such as `Array.from()` or `Symbol`), make sure you are including the appropriate polyfills manually, or that the browsers you are targeting already support them.

Also note that using some newer syntax features like `for...of` or `[...nonArrayValue]` causes Babel to emit code that depends on ES6 runtime features and might not work without a polyfill. When in doubt, use [Babel REPL](https://babeljs.io/repl/) to see what any specific syntax compiles down to.

## Linting

This project uses [ESLint](https://eslint.org/) to maintain consistent formatting throughout the source code. We have chosen to base our style rules on [Airnb's js styleguide](https://github.com/airbnb/javascript) and [Prettier](https://prettier.io/docs/en/index.html), but have added some of our own rules in `.eslintrc`.

If you change this, first try to use [inline comments](https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments). If you need to disable something globally in `.eslintrc`, please add a comment there explaining your reason.

You might want to integrate Prettier in your favorite editor. Read the section on [Editor Integration](https://prettier.io/docs/en/editors.html) on the Prettier GitHub page.

## Syntax Highlighting in the Editor

To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

## Code Splitting

Instead of downloading the entire app before users can use it, code splitting allows you to split your code into small chunks which you can then load on demand.

This project setup supports code splitting via [dynamic `import()`](http://2ality.com/2017/01/import-operator.html#loading-code-on-demand). Its [proposal](https://github.com/tc39/proposal-dynamic-import) is in stage 3. The `import()` function-like form takes the module name as an argument and returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which always resolves to the namespace object of the module.

Here is an example:

### `moduleA.js`

```js
const moduleA = 'Hello'

export { moduleA }
```

### `App.js`

```js
import React, { Component } from 'react'

class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch(err => {
        // Handle failure
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    )
  }
}

export default App
```

This will make `moduleA.js` and all its unique dependencies as a separate chunk that only loads after the user clicks the 'Load' button.

You can also use it with `async` / `await` syntax if you prefer it.

### With React Router

[This tutorial](http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html) on how to use code splitting with React Router. You can find the companion GitHub repository [here](https://github.com/AnomalyInnovations/serverless-stack-demo-client/tree/code-splitting-in-create-react-app).

Also check out the [Code Splitting](https://reactjs.org/docs/code-splitting.html) section in React documentation.

## JSS

This project setup [JSS](http://cssinjs.org) and [react-jss](https://github.com/cssinjs/react-jss) for rendering styles and managing themes.

Shared themes variables and macros are in `src/shared-styles`.

## Adding Images, Fonts, and Files

With Webpack, using static assets like images and fonts works similarly to CSS.

You can **`import` a file right in a JavaScript module**. This tells Webpack to include that file in the bundle. Unlike CSS imports, importing a file gives you a string value. This value is the final path you can reference in your code, e.g. as the `src` attribute of an image or the `href` of a link to a PDF.

To reduce the number of requests to the server, importing images that are less than 10,000 bytes returns a [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) instead of a path. This applies to the following file extensions: bmp, gif, jpg, jpeg, and png. SVG files are excluded due to [#1153](https://github.com/facebookincubator/create-react-app/issues/1153).

Here is an example:

```js
import React from 'react'
import logo from './logo.png' // Tell Webpack this JS file uses this image

console.log(logo) // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />
}

export default Header
```

This ensures that when the project is built, Webpack will correctly move the images into the build folder, and provide us with correct paths.

This works in CSS too:

```css
.Logo {
  background-image: url(./logo.png);
}
```

Webpack finds all relative module references in CSS (they start with `./`) and replaces them with the final paths from the compiled bundle. If you make a typo or accidentally delete an important file, you will see a compilation error, just like when you import a non-existent JavaScript module. The final filenames in the compiled bundle are generated by Webpack from content hashes. If the file content changes in the future, Webpack will give it a different name in production so you don’t need to worry about long-term caching of assets.

Please be advised that this is also a custom feature of Webpack.

**It is not required for React** but many people enjoy it (and React Native uses a similar mechanism for images).  
An alternative way of handling static assets is described in the next section.

## Using the `public` Folder

### Changing the HTML

The `public` folder contains the HTML file so you can tweak it, for example, to set the page title.
The `<script>` tag with the compiled code will be added to it automatically during the build process.

### Adding Assets Outside of the Module System

You can also add other assets to the `public` folder.

Note that we normally encourage you to `import` assets in JavaScript files instead.
For example, see the sections on [adding a stylesheet](#adding-a-stylesheet) and [adding images and fonts](#adding-images-fonts-and-files).
This mechanism provides a number of benefits:

- Scripts and stylesheets get minified and bundled together to avoid extra network requests.
- Missing files cause compilation errors instead of 404 errors for your users.
- Result filenames include content hashes so you don’t need to worry about browsers caching their old versions.

However there is an **escape hatch** that you can use to add an asset outside of the module system.

If you put a file into the `public` folder, it will **not** be processed by Webpack. Instead it will be copied into the build folder untouched. To reference assets in the `public` folder, you need to use a special variable called `PUBLIC_URL`.

Inside `index.html`, you can use it like this:

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
```

Only files inside the `public` folder will be accessible by `%PUBLIC_URL%` prefix. If you need to use a file from `src` or `node_modules`, you’ll have to copy it there to explicitly specify your intention to make this file a part of the build.

When you run `npm run build`, Create React App will substitute `%PUBLIC_URL%` with a correct absolute path so your project works even if you use client-side routing or host it at a non-root URL.

In JavaScript code, you can use `process.env.PUBLIC_URL` for similar purposes:

```js
render() {
  // Note: this is an escape hatch and should be used sparingly!
  // Normally we recommend using `import` for getting asset URLs
  // as described in “Adding Images and Fonts” above this section.
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />;
}
```

Keep in mind the downsides of this approach:

- None of the files in `public` folder get post-processed or minified.
- Missing files will not be called at compilation time, and will cause 404 errors for your users.
- Result filenames won’t include content hashes so you’ll need to add query arguments or rename them every time they change.

### When to Use the `public` Folder

Normally we recommend importing [stylesheets](#adding-a-stylesheet), [images, and fonts](#adding-images-fonts-and-files) from JavaScript.
The `public` folder is useful as a workaround for a number of less common cases:

- You need a file with a specific name in the build output, such as [`manifest.webmanifest`](https://developer.mozilla.org/en-US/docs/Web/Manifest).
- You have thousands of images and need to dynamically reference their paths.
- You want to include a small script like [`pace.js`](http://github.hubspot.com/pace/docs/welcome/) outside of the bundled code.
- Some library may be incompatible with Webpack and you have no other option but to include it as a `<script>` tag.

Note that if you add a `<script>` that declares global variables, you also need to read the next section on using them.

## Using Global Variables

When you include a script in the HTML file that defines global variables and try to use one of these variables in the code, the linter will complain because it cannot see the definition of the variable.

You can avoid this by reading the global variable explicitly from the `window` object, for example:

```js
const $ = window.$
```

This makes it obvious you are using a global variable intentionally rather than because of a typo.

Alternatively, you can force the linter to ignore any line by adding `// eslint-disable-line` after it.

## Adding Custom Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By
default you will have `NODE_ENV` defined for you, and any other environment variables starting with
`REACT_APP_`.

**The environment variables are embedded during the build time**. Since Create React App produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime. To read them at runtime, you would need to load HTML into memory on the server and replace placeholders in runtime, just like [described here](#injecting-data-from-the-server-into-the-page). Alternatively you can rebuild the app on the server anytime you change them.

> Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored to avoid accidentally [exposing a private key on the machine that could have the same name](https://github.com/facebookincubator/create-react-app/issues/865#issuecomment-252199527). Changing any environment variables will require you to restart the development server if it is running.

These environment variables will be defined for you on `process.env`. For example, having an environment
variable named `REACT_APP_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_SECRET_CODE`.

There is also a special built-in environment variable called `NODE_ENV`. You can read it from `process.env.NODE_ENV`. When you run `npm start`, it is always equal to `'development'`, when you run `npm test` it is always equal to `'test'`, and when you run `npm run build` to make a production bundle, it is always equal to `'production'`. **You cannot override `NODE_ENV` manually.** This prevents developers from accidentally deploying a slow development build to production.

These environment variables can be useful for displaying information conditionally based on where the project is
deployed or consuming sensitive data that lives outside of version control.

First, you need to have environment variables defined. For example, let’s say you wanted to consume a secret defined
in the environment inside a `<form>`:

```jsx
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
      </form>
    </div>
  );
}
```

During the build, `process.env.REACT_APP_SECRET_CODE` will be replaced with the current value of the `REACT_APP_SECRET_CODE` environment variable. Remember that the `NODE_ENV` variable will be set for you automatically.

When you load the app in the browser and inspect the `<input>`, you will see its value set to `abcdef`, and the bold text will show the environment provided when using `npm start`:

```html
<div>
  <small>You are running this application in <b>development</b> mode.</small>
  <form>
    <input type="hidden" value="abcdef" />
  </form>
</div>
```

The above form is looking for a variable called `REACT_APP_SECRET_CODE` from the environment. In order to consume this
value, we need to have it defined in the environment. This can be done using two ways: either in your shell or in
a `.env` file. Both of these ways are described in the next few sections.

Having access to the `NODE_ENV` is also useful for performing actions conditionally:

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable()
}
```

When you compile the app with `npm run build`, the minification step will strip out this condition, and the resulting bundle will be smaller.

### Referencing Environment Variables in the HTML

> Note: this feature is available with `react-scripts@0.9.0` and higher.

You can also access the environment variables starting with `REACT_APP_` in the `public/index.html`. For example:

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

Note that the caveats from the above section apply:

- Apart from a few built-in variables (`NODE_ENV` and `PUBLIC_URL`), variable names must start with `REACT_APP_` to work.
- The environment variables are injected at build time. If you need to inject them at runtime, [follow this approach instead](#generating-dynamic-meta-tags-on-the-server).

### Adding Temporary Environment Variables In Your Shell

Defining environment variables can vary between OSes. It’s also important to know that this manner is temporary for the
life of the shell session.

#### Windows (cmd.exe)

```cmd
set "REACT_APP_SECRET_CODE=abcdef" && npm start
```

(Note: Quotes around the variable assignment are required to avoid a trailing whitespace.)

#### Windows (Powershell)

```Powershell
($env:REACT_APP_SECRET_CODE = "abcdef") -and (npm start)
```

#### Linux, macOS (Bash)

```bash
REACT_APP_SECRET_CODE=abcdef npm start
```

### Adding Development Environment Variables In `.env`

> Note: this feature is available with `react-scripts@0.5.0` and higher.

To define permanent environment variables, create a file called `.env` in the root of your project:

```
REACT_APP_SECRET_CODE=abcdef
```

> Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored to avoid [accidentally exposing a private key on the machine that could have the same name](https://github.com/facebookincubator/create-react-app/issues/865#issuecomment-252199527). Changing any environment variables will require you to restart the development server if it is running.

`.env` files **should be** checked into source control (with the exclusion of `.env*.local`).

#### What other `.env` files can be used?

> Note: this feature is **available with `react-scripts@1.0.0` and higher**.

- `.env`: Default.
- `.env.local`: Local overrides. **This file is loaded for all environments except test.**
- `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
- `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

- `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
- `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
- `npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

These variables will act as the defaults if the machine does not explicitly set them.  
Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

> Note: If you are defining environment variables for development, your CI and/or hosting platform will most likely need
> these defined as well. Consult their documentation how to do this. For example, see the documentation for [Travis CI](https://docs.travis-ci.com/user/environment-variables/) or [Heroku](https://devcenter.heroku.com/articles/config-vars).

#### Expanding Environment Variables In `.env`

> Note: this feature is available with `react-scripts@1.1.0` and higher.

Expand variables already on your machine for use in your `.env` file (using [dotenv-expand](https://github.com/motdotla/dotenv-expand)).

For example, to get the environment variable `npm_package_version`:

```
REACT_APP_VERSION=$npm_package_version
# also works:
# REACT_APP_VERSION=${npm_package_version}
```

Or expand variables local to the current `.env` file:

```
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
```

## Can I Use Decorators?

Many popular libraries use [decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841) in their documentation.  
We don't support decorator syntax at the moment because:

- It is an experimental proposal and is subject to change.
- The current specification version is not officially supported by Babel.
- If the specification changes, we won’t be able to write a codemod because we don’t use them internally at Facebook.

However in many cases you can rewrite decorator-based code without decorators just as fine.  
Please refer to these two threads for reference:

- [#214](https://github.com/facebookincubator/create-react-app/issues/214)
- [#411](https://github.com/facebookincubator/create-react-app/issues/411)

## Analyzing the Bundle Size

[Source map explorer](https://www.npmjs.com/package/source-map-explorer) analyzes
JavaScript bundles using the source maps. This helps you understand where code
bloat is coming from.

To add Source map explorer to a Create React App project, follow these steps:

```sh
npm install --save source-map-explorer
```

Alternatively you may use `yarn`:

```sh
yarn add source-map-explorer
```

Then in `package.json`, add the following line to `scripts`:

```diff
   "scripts": {
+    "analyze": "source-map-explorer build/static/js/main.*",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom",
```

Then to analyze the bundle run the production build then run the analyze
script.

```
npm run build
npm run analyze
```

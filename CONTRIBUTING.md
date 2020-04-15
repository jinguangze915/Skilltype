# Contributing

Welcome to the Skilltype team. We're happy to have you on board!

## Getting started

Always work from a local branch, never directly from `development` and definitely not from `master`!

_Clone the repo and install the dependencies_

```bash
git clone git@github.com:skilltype/skilltype-web.git
yarn
```

_Create a branch for your work_

```bash
git checkout -b yourname/whatyouredoing
```

_When you want to push (in progress)_

```bash
git commit -m "A useful but short description of your work"
git push --set-upstream origin yourname/whatyouredoing
```

_When you're ready to merge_

1.  Bump the version in `package.json` and then run `yarn sync-versions` to distribute the bumped version to all the packages. See [versioning](#versioning) below for how to update the version number.
2.  Run `yarn test` and fix any failing tests
3.  Head to https://github.com/skilltype/skilltype-web and make a Pull Request to `development`. Then ping one of the other front-end devs on Slack and ask for a code review.

## Versioning

We use the [Semantic Versioning](https://devhints.io/semver) to organize our releases.

If you're updating the version for a pull request, here's the deal:

- If the PR represents a milestone release (is associated with a release in Jira), bump the MINOR version, e.g. 1.1.4 to 1.2.0.
- Otherwise, just bump the PATCH version, e.g. 1.1.4 to 1.1.5

Bumps to the MAJOR version are reserved for epoch changes that are breaking, such as moving to a new front-end framework.

## Coding style

Please follow the coding style and directory patterns of the current codebase. We use eslint, so if possible, enable linting in your editor to get real-time feedback. The linting rules are also run when Webpack recompiles your changes, and can be run manually with `yarn lint`. You should run `yarn lint` and fix any problems _before_ submitting your pull request.

We also use `prettier` rules to maintain consistent, readable code. Try to enable prettier linting and "format on save" if you can for more real-time feedback.

## Writing tests

You may write unit tests for your code and components by creating `*.test.js` files anywhere within the repo. For functional testing, we use [StoryShots](https://storybook.js.org/testing/structural-testing/). This creates [Jest snapshots](https://jestjs.io/docs/en/snapshot-testing) for any Storybook story defined in the codebase.

Please familiarize yourself with [Storybook](https://storybook.js.org/) and create stories for your work if you are working on a _module_. For example, the [Profile](packages/skilltype-ui/modules/Profile/Profile.js) component is a _module_ because it represents a route in the app that renders "fullscreen" - so in other words a "screen unit" of the app.

During testing, StoryShot renders the story to HTML and compares the rendered markup to the markup in the snapshot stored from an earlier test run. If you review the differences and everything looks ok, it give you a chance to confirm the changes and update the snapshot. You must do this before submitting your PR, because the CI will reject the changes if the snapshots are out of date.

## Happy coding!

See you on the [Slack](https://skilltype.slack.com/#dev)

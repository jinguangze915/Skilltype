set -e # fail immediately
set -x # echo every command
set -o pipefail # fail immediately in pipeline

# if the NPM_DEPLOY_TARGET env var is STYLEGUIDE, build the styleguide
# otherwise, set build target env vars and run build.js (from create-react-app)
if [ $NPM_DEPLOY_TARGET == STYLEGUIDE ]
then
  npm run styleguide:build
elif [ $NPM_DEPLOY_TARGET == DEMO ]
then
  npm run storybook:build
elif [ $NPM_DEPLOY_TARGET == USER_APP ]
then
  NPM_BUILD_TARGET=USER_APP node scripts/build.js
else
  node scripts/build.js
fi

# NOTE: create-react-app-inner-buildpack only exposes env vars prefixed with
#  "NODE_", "NPM_", and "REACT_APP_"

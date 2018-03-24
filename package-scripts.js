const { series, crossEnv, concurrent, rimraf } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'nps start',
    start: {
      default: `webpack-dev-server -d --inline`,
      hmr: `webpack-dev-server -d --inline --hot`,
    },
    build: series(
      rimraf('dist'),
      crossEnv('NODE_ENV=production webpack --progress -p'),
    ),
    serve: 'http-server dist --cors',
  },
};

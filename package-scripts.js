const { series, crossEnv, concurrent, rimraf } = require('nps-utils');

module.exports.scripts = {
  default: 'nps start',
  start: {
    default: concurrent({
      client: 'nps start.client',
      server: 'nps start.server',
    }),
    client: {
      default: `webpack --watch -d --inline`,
      hmr: `webpack --watch -d --inline --hot`,
    },
    server: [
      'nodemon',
      '--watch "src"',
      '--ext "ts"',
      '--exec "ts-node --type-check ./src/server.ts"',
    ].join(' '),
  },
  build: {
    default: series(rimraf('dist'), 'nps build.client', 'nps build.server'),
    client: crossEnv('NODE_ENV=production webpack --progress -p'),
    server: crossEnv('NODE_ENV=production tsc --project tsconfig.json'),
  },
  prettier: 'prettier --write *.[tj]s src/*.[tj]s src/**/*.[tj]s',
  serve: crossEnv('NODE_ENV=production node dist/server'),
};

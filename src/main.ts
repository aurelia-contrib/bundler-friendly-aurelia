import 'reflect-metadata';
import { WebpackLoader } from 'aurelia-loader-webpack';
import { Aurelia, PLATFORM } from 'aurelia-framework';

import { bootstrap } from './bootstrapper';
import { App } from 'app/app';

async function start() {
  const host = document.getElementById('root');
  const aurelia: Aurelia = await bootstrap(host, new WebpackLoader());

  aurelia.use
    // add plugins here
    .standardConfiguration()
    .developmentLogging();

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app/app'));
}

start();

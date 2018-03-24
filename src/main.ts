import 'reflect-metadata';
import { WebpackLoader } from 'aurelia-loader-webpack';
import { Aurelia, PLATFORM } from 'aurelia-framework';

import { bootstrap } from './bootstrapper';
import { App } from './app/app';

(async () => {
  const host = PLATFORM.global.document.getElementById('root');
  // there shouldn't be a loader, because aurelia should use standard imports
  const aurelia: Aurelia = await bootstrap(host, new WebpackLoader());

  aurelia.use
    // add plugins here
    .standardConfiguration()
    .developmentLogging();

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app/app'));
})();

import { WebpackLoader } from 'aurelia-loader-webpack';
import { initialize } from 'aurelia-pal-browser';
import { DOM, PLATFORM } from 'aurelia-pal';

import { bootstrap } from './bootstrapper';
import { configure } from './index';

(async () => {
  const host = DOM.getElementById('root');
  // there shouldn't be a loader, because aurelia should use standard imports
  const loader = new WebpackLoader();
  const aurelia = await bootstrap(host, initialize, loader);
  await configure(aurelia);
})();

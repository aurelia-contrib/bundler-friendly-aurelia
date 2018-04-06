import 'reflect-metadata';
import { PLATFORM, DOM } from 'aurelia-pal';
import { Loader } from 'aurelia-loader';
import { Aurelia } from 'aurelia-framework';

const global = PLATFORM.global;

function ready() {
  // it might already be ready
  if (!global.document || global.document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    function done() {
      DOM.removeEventListener('DOMContentLoaded', done, false);
      global.removeEventListener('load', done);
      resolve();
    }
    // either event works, and remove both listeners
    DOM.addEventListener('DOMContentLoaded', done, false);
    global.addEventListener('load', done);
  });
}

export async function bootstrap(host: Element, initialize, loader: Loader) {
  // wait for the platform to be ready
  await ready();
  // initialize PAL
  initialize();
  // aurelia should use standard imports instead of being bundler aware
  const aurelia = new Aurelia(loader);
  aurelia.host = host;
  return aurelia;
}

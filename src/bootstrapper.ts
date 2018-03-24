import { PLATFORM } from 'aurelia-pal';
import { initialize } from 'aurelia-pal-browser';
import { Loader } from 'aurelia-loader';
import { Aurelia } from 'aurelia-framework';

const global: Window = PLATFORM.global;

function ready() {
  if (!global.document || global.document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    function done() {
      global.document.removeEventListener('DOMContentLoaded', done);
      global.removeEventListener('load', done);
      resolve();
    }
    global.document.addEventListener('DOMContentLoaded', done);
    global.addEventListener('load', done);
  });
}

export async function bootstrap(host: Element, loader: Loader) {
  await ready();
  await initialize();
  const aurelia = new Aurelia(loader);
  aurelia.host = host;
  return aurelia;
}

import "reflect-metadata";
import "aurelia-loader-webpack";
import { PLATFORM, isInitialized } from "aurelia-pal";
import { Aurelia } from "aurelia-framework";

let bootstrapPromises = [];
const global = PLATFORM.global;

function ready() {
  if (!global.document || global.document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    function completed() {
      global.document.removeEventListener("DOMContentLoaded", completed);
      global.removeEventListener("load", completed);
      resolve();
    }
    global.document.addEventListener("DOMContentLoaded", completed);
    global.addEventListener("load", completed);
  });
}

async function preparePlatform(loader) {
  const palModule = (await import("aurelia-pal-browser")) as any;
  await palModule.initialize();
  await Promise.all([
    import("aurelia-dependency-injection"),
    import("aurelia-router"),
    import("aurelia-logging-console")
  ]);
  return new Aurelia(loader);
}

export async function bootstrap(host: Element) {
  await ready();
  const loader = await new PLATFORM.Loader();
  const aurelia = await preparePlatform(loader);
  aurelia.host = host;
  return aurelia;
}

import { Aurelia, PLATFORM } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    // add plugins here
    .standardConfiguration()
    .developmentLogging();

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app/app'));
}

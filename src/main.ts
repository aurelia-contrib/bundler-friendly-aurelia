import { Aurelia, PLATFORM } from "aurelia-framework";
import { bootstrap } from "./bootstrap";
import { App } from "app/app";

bootstrap(async function configure(aurelia: Aurelia) {
  aurelia.host = document.getElementById("root");
  aurelia.use.standardConfiguration().developmentLogging();

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName("app/app"));
});

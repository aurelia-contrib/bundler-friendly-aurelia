import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM, inlineView } from "aurelia-framework";
import view from "./child-router.html";

@inlineView(view)
export class ChildRouter {
  router: Router;

  heading = "Child Router";

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ["", "welcome"],
        name: "welcome",
        moduleId: PLATFORM.moduleName("../welcome/welcome"),
        nav: true,
        title: "Welcome"
      },
      {
        route: "users",
        name: "users",
        moduleId: PLATFORM.moduleName("../users/users"),
        nav: true,
        title: "Github Users"
      },
      {
        route: "child-router",
        name: "child-router",
        moduleId: PLATFORM.moduleName("./child-router"),
        nav: true,
        title: "Child Router"
      }
    ]);

    this.router = router;
  }
}

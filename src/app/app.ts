import { PLATFORM, inlineView, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import view from './app.html';

@inlineView(view, [{ from: PLATFORM.moduleName('../nav-bar/nav-bar') }])
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: PLATFORM.moduleName('../welcome/welcome'),
        nav: true,
        title: 'Welcome',
      },
      {
        route: 'users',
        name: 'users',
        moduleId: PLATFORM.moduleName('../users/users'),
        nav: true,
        title: 'Github Users',
      },
      {
        route: 'child-router',
        name: 'child-router',
        moduleId: PLATFORM.moduleName('../child-router/child-router'),
        nav: true,
        title: 'Child Router',
      },
    ]);

    this.router = router;
  }
}

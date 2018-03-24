import { customElement, inlineView, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import view from "./nav-bar.html";

@inlineView(view)
@customElement("nav-bar")
export class NavBar {
  @bindable() router: Router;
}

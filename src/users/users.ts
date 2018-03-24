import { inlineView, PLATFORM } from "aurelia-framework";
import view from "./users.html";

interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

@inlineView(view)
export class Users {
  heading: string = "Aurelia Github Users";
  users: Array<IUser> = [];
  /**
   * ref element on the binding-context
   */
  image: HTMLImageElement;

  constructor() {}

  async activate(): Promise<void> {
    const response = await fetch(
      "https://api.github.com/search/users?q=aurelia"
    );
    const json = await response.json();
    this.users = json.items;
  }
}

import { inlineView, PLATFORM, autoinject } from 'aurelia-framework';
import view from './users.html';

interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

class Service {
  async getUsers() {
    const res = await fetch('https://api.github.com/search/users?q=aurelia');
    const json = await res.json();
    return json.items as IUser[];
  }
}

@inlineView(view)
@autoinject
export class Users {
  heading: string = 'Aurelia Github Users';
  users: Array<IUser> = [];
  /**
   * ref element on the binding-context
   */
  image: HTMLImageElement;

  constructor(private readonly service: Service) {}

  async activate(): Promise<void> {
    this.users = await this.service.getUsers();
  }
}

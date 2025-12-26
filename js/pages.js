import { loginPage, profilePage } from "./components.js";

export class Page {
  constructor() {
    this.jwt = null;
    this.userInfos = null;
    this.isLoggedIn = false;
    this.data = [];
  }

  renderLogin = () => loginPage();
  renderProfile = () => profilePage();
  login(username, password) {}
  logout() {}
}

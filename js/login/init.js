import { Login } from "./components.js";

export class LoginPage {
  constructor() {
    this.login = null
    this.userInfos = { jwt: null };
    this.isLoggedIn = false;
    this.data = [];
  }

  // rendring the login page
  renderLogin = () => {
    let container = document.createElement('section')
    container.id = 'login-container'
    document.body.append(container)
    let l = new Login()
    l.render(container)
    this.login = l
  };

  // submit for login
  submitLogin(fn) {
    document.getElementById('submit').addEventListener('click', async (e) => {
      e.preventDefault()
      let user = document.getElementById('username').value;
      let psw = document.getElementById('password').value;
      if (!user || !psw) return
      let a = await this.login.submit(user, psw)
      if (!a) this.login.ErrorSubmit()
      else {
        this.userInfos.jwt = a
        localStorage.setItem('jwt', this.userInfos.jwt); // store token
        if (fn) fn();
      }
    })
  }
}

import { errorpage } from "./error/err.js";
import { LoginPage } from "./login/init.js";
import { ProfilePage } from "./profile/init.js";

export let login = new LoginPage();
export let profile = new ProfilePage();

window.addEventListener("DOMContentLoaded", async () => {
  switch (localStorage.getItem("logged")) {
    case "true":
      let data = await profile.Fetch();
      if (data.errors) {
        login.deleteAuth();
        errorpage();
        return;
      } else profile.renderComponents();
      break;
    case "error":
      errorpage();
      break;
    default:
      login.renderLogin();
  }

  document.body.onclick = async (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case "logout":
        login.deleteAuth();
        login.renderLogin();
        break;

      case "login":
        let [username, password] = login.getAuthFromInput();
        if (!username || !password) break;
        let token = await login.submit(username, password);
        if (!token) {
          login.ErrorSubmit("Username or password is not correct");
          break;
        }
        login.setAuth(token);
        let data = await profile.Fetch();
        if (data.errors) {
          login.deleteAuth();
          errorpage();
          break;
        } else profile.renderComponents();
        break;
    }
  };
});

import { errorpage } from "./error/err.js";
import { LoginPage } from "./login/init.js";
import { ProfilePage } from "./profile/init.js";

export let login = new LoginPage();
export let profile = new ProfilePage();

window.addEventListener("DOMContentLoaded", DO);
document.body.addEventListener("click", click);

//
async function DO() {
  switch (localStorage.getItem("logged")) {
    case "true":
      let data = await profile.Fetch();
      if (data.errors) {
        login.deleteAuth();
        errorpage();
      } else {
        profile.renderComponents();
      }
      break;
    case "error":
      errorpage();
      break;

    default:
      login.renderLogin();
  }
}

//
async function click(e) {
  switch (true) {
    // logout
    case e.target.id === "logout":
      login.deleteAuth();
      login.renderLogin();
      break;

    // login
    case e.target.id === "login":
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
      } else {
        profile.renderComponents();
      }
      break;

    // page
    case e.target.classList.contains("bar-element"):
      profile.triggerBarElement(e);

      switch (true) {
        case e.target.classList.contains("Basic-user-identification"): {
          profile.removemain()
          profile.Basic_user_identification_page()
          break;
        }
        case e.target.classList.contains("XP-amount"):{
          profile.removemain()
          profile.XP_amount_page()
          break;
        }
        case e.target.classList.contains("audits"):{
          profile.removemain()
          profile.Audits_page()
          break;
        }
        case e.target.classList.contains("skills"):{
          profile.removemain()
          profile.skills_page()
          break;
        }
        default:
      }
      break;
  }
}

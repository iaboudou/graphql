import { Auth } from "./auth.js";
import { components } from "./components.js";

export class LoginPage {
  // rendring the login page
  renderLogin() {
    let l = new components();
    l.render();
  }

  // submit method return the user tocken based on the username & password
  async submit(username, password) {
    let auth = new Auth();
    try {
      return await auth.getToken(username, password);
    } catch {
      return null;
    }
  }

  //
  getAuthFromInput() {
    let username = document.getElementById("username").value || "";
    let password = document.getElementById("password").value || "";
    if (!username || !password) {
      this.ErrorSubmit("all feilds are required");
    }
    return [username, password];
  }

  // set jwt, logged on the local storage
  setAuth(jwt) {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("logged", "true");
  }

  // delete jwt, logged from the local storage
  deleteAuth() {
    localStorage.removeItem("logged");
    localStorage.removeItem("jwt");
  }

  // in case of invalid cridential, this method show the error message
  ErrorSubmit(msg) {
    let er = document.getElementById("error");
    er.style.display = "block";
    er.textContent = msg;
    er.style.transition = "transform 0.2s ease";
    er.style.transform = "scale(1.1)";

    setTimeout(() => {
      er.style.transform = "scale(1)";
    }, 200);
  }
}

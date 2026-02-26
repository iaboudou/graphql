import { Auth } from "./auth.js";

export class Login {
  // method for rendring the login page
  render() {
    document.body.innerHTML = `
        <form>
            <div id="welcome">Welcome</div>
            <input id="username" placeholder="Username or Email" autocomplete="username">
            <input id="password" type="password" placeholder="Password" autocomplete="current-password">
            <button id="submit">Submit</button>
            <span id="error"></span>
        </form>`;
  }

  // submit method return the user tocken based on the username & password
  async submit(username, password) {
    let auth = new Auth();
    try {
      return await auth.getToken(username, password);
    } catch {}
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

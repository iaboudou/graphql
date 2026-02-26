import { LoginPage } from "./login/init.js";
import { ProfilePage } from "./profile/init.js";

export let profile = new ProfilePage();
export let pageLogin = new LoginPage();

window.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.getItem("logged") === "true") {
    await profile.Fetch();
    if (!profile.Information) return profile.errorpage();

    profile.renderComponents();
  } else {
    // login page
    pageLogin.renderLogin();

    // if login happen correctly then render the profile automatically
    pageLogin.submitLogin(async () => {
      localStorage.setItem("logged", "true");
      await profile.Fetch();
      if (!profile.Information) return profile.errorpage();

      profile.renderComponents();
    });
  }
});

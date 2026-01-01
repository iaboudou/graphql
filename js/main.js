import { LoginPage } from "./login/init.js";
import { ProfilePage } from "./profile/init.js";


// login page
let page = new LoginPage();
page.renderLogin();

// if login happen correctly then render the profile automatically
page.submitLogin(async () => {

  let profile = new ProfilePage();
  let data = await profile.fetch()
  if (!data) {
    profile.errorpage()
    return
  }
  profile.renderComponents();
  console.log('data: ',data)
});

export class components {
  // method for rendring the login page
  render() {
    document.querySelector('link[href="./js/profile/profile.css"]')?.remove();
    let css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = './js/login/login.css';
    document.head.append(css);

    document.body.innerHTML = `
        <form>
            <div id="welcome">Welcome</div>
            <input id="username" placeholder="Username or Email" autocomplete="username">
            <input id="password" type="password" placeholder="Password" autocomplete="current-password">
            <button id="login" type="button">Submit</button>
            <span id="error"></span>
        </form>`;
  }
}

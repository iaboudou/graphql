// error page
  export function errorpage() {
    document.body.innerHTML = `
    <div>can't load the page, please try gain later</div>
    <button id="logout" type="button">go to login</button>
    `;

    document.querySelector('link[href="./js/profile/profile.css"]')?.remove();
    document.querySelector('link[href="./js/login/login.css"]')?.remove();

    let css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = './js/error/error.css';
    document.head.append(css);

    localStorage.setItem("logged", "error");
  }
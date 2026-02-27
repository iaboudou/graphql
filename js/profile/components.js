export class components {
  CssComponent() {
    document.querySelector('link[href="./js/login/login.css"]')?.remove();
    let css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "./js/profile/profile.css";
    document.head.append(css);

    document.body.innerHTML = "";
  }

  logoutComponenet() {
    let body = document.body;
    body.innerHTML = `
      <section id="bar">
          <button id="logout" type="button"></button>
      </section>
        `;
  }
}

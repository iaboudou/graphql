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
      <nav id="bar">
          <button id="logout" type="button"></button>
      </nav>
        `;
  }

  barComponenet(){
    let bar = document.getElementById('bar')
    if (!bar) return

    let div = document.createElement('div')
    div.innerHTML = `
      <ul id="bar-pages-wrapper">
        <li><a class="bar-element Basic-user-identification">user identification</a></li>
        <li><a class="bar-element XP-amount">XP amount</a></li>
        <li><a class="bar-element grades">grades</a></li>
        <li><a class="bar-element audits">audits</a></li>
        <li><a class="bar-element skills">skills</a></li>
      </ul>
    `
    bar.append(div)
  }

  profileComponenet(){
    let section = document.createElement('section')
    section.id = "Basic-user-identification-container"

    document.body.append(section)
  }
}

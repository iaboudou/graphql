import { pageLogin, profile } from "../main.js";

// this create a component
export class Info {
  render() {
    console.log("1: ", profile.Information);
    let body = document.body;
    body.innerHTML = `
          <button id="logout" type="button"></button>
        `;

    let btn = document.getElementById("logout");
    btn.addEventListener("click", () => {
      localStorage.removeItem("logged");
      localStorage.removeItem("jwt")
      pageLogin.renderLogin()
    });
  }
}

// get the query from query.graphql
export class query {
  async generalInfo() {
    let a = await fetch("./js/profile/query.graphql");
    let b = await a.text();
    return b;
  }
}

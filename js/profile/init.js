import { components } from "./components.js";

// this is a class includes the profile methods for : fetch full data from "api/graphql-engine/v1/graphql" - render the components
export class ProfilePage {
  constructor() {
    this.Information = null;
  }

  renderComponents() {
    let comps = new components();
    comps.CssComponent();
    comps.logoutComponenet();
    comps.barComponenet();
    comps.profileComponenet()
  }

  // fetch data
  async Fetch() {
    let jwt = localStorage.getItem("jwt");
    if (!jwt) return null;

    let a = await fetch("./js/profile/query.graphql");
    let q = await a.text();

    let res = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          query: q,
        }),
      }
    );

    if (!res.ok) return null;
    let data = await res.json();
    this.Information = data;
    return await data;
  }

  triggerBarElement(e) {
    Array.from(document.querySelectorAll('.bar-element')).forEach(ele => {
      ele.style.color = 'black'
      ele.style.textDecoration = '';
    })
    e.target.style.color = '#028ee0'
    e.target.style.textDecoration = 'underline';
  }
}

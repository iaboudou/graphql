import { components } from "./components.js";

// this is a class includes the profile methods for : fetch full data from "api/graphql-engine/v1/graphql" - render the components
export class ProfilePage {
  constructor() {
    this.Information = null;
    this.coms = null;
  }

  renderComponents() {
    let comps = new components();
    this.coms = comps;
    comps.CssComponent();
    comps.logoutComponenet();
    comps.barComponenet();
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
    Array.from(document.querySelectorAll(".bar-element")).forEach((ele) => {
      ele.style.color = "black";
      ele.style.textDecoration = "";
    });
    e.target.style.color = "#028ee0";
    e.target.style.textDecoration = "underline";
  }

  removemain() {
    document.querySelector("main")?.remove();
  }

  Basic_user_identification_page() {
    this.coms.profileComponenet();
    this.coms.Basic_user_identification(this.Information);
  }
  XP_amount_page() {
    this.coms.XP_amountHTML();
    this.coms.XP_amount(this.Information);
    this.coms.XP_graph(this.Information)
  }
  Audits_page(){
    this.coms.AuditHTML()
    this.coms.Audit(this.Information)

    console.log(this.Information.data.user[0].Transactions)
    // this.Information.data.user[0].Transactions.forEach(e => {
    //   console.log(e.object.type)
    // })

  }
}

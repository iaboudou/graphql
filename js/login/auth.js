export class Auth {
  // method fetch the token based on the username and password
  async getToken(username, password) {
    let cr = btoa(username + ":" + password);
    let res = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
      method: "POST",
      headers: {
        Authorization: `Basic ${cr}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return null;
    return await res.json();
  }
}

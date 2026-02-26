import { Info, query } from "./help.js"

// this is a class includes the profile methods for : fetch full data from "api/graphql-engine/v1/graphql" - render the components
export class ProfilePage {
    constructor() {
        this.jwt = localStorage.getItem('jwt')
        this.Information = null
    }
    // fetch data
    async Fetch() {
        if (!this.jwt) return null
        let q = new query()
        let res = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.jwt}`
            },
            body: JSON.stringify({
                query: await q.generalInfo()
            })
        })
        if (!res.ok) return null
        let data = await res.json()
        this.Information = data
        return data
    }

    // the page components
    renderComponents() {
        document.body.innerHTML = ''
        let info = new Info()
        info.render()
    }

    // error page
    errorpage() {
        document.body.innerHTML = `<div>can't load the data</div>`
    }
}
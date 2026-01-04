import { Info, query } from "./help.js"

// this is a class includes the profile methods for : fetch full data from "api/graphql-engine/v1/graphql" - render the components
export class ProfilePage {
    constructor() {
        this.jwt = localStorage.getItem('jwt')
    }
    // fetch data
    async fetch() {
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
        return data
    }

    // the page components
    renderComponents(data) {
        document.body.innerHTML = ''
        document.body.style.justifyContent = ''
        document.body.style.alignItems = ''
        document.body.style.gap = '5px'
        
        let info = new Info()
        info.render(document.body, data)
    }

    // error page
    errorpage() {
        console.log('error')
    }
}
import { Info } from "./comonents.js"
import { query } from "./graphql.js"

export class ProfilePage {
    constructor() {
        this.jwt = localStorage.getItem('jwt')
    }
    renderComponents() {
        document.body.innerHTML = ''
        let info = new Info()
        info.render(document.body)
    }

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
                query: q.generalInfo()
            })
        })
        if (!res.ok) return null
        let data = await res.json()
        return data
    }

    errorpage(){
        console.log('error')
    }
}
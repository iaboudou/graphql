// this create a component 
export class Info {
    constructor() {}
    render(container, data) {

        let header = document.createElement('nav')
        header.id = 'header'
        let left = document.createElement('section')
        left.id = 'left'
        let b = document.createElement('section')
        b.id = 'right'

        header.innerHTML = `<div>Welcome ${data.data.a[0].login} </div>`;
        left.innerHTML +=
        `<img class='infos logoprofile' src='${data.data.a[0].avatarUrl}'></img>
        <div class='infos'>FirstName:<strong>${data.data.a[0].firstName}</strong></div>
        <div class='infos'>LastName: <strong>${data.data.a[0].lastName}</strong></div>
        <div class='infos'>Email: <strong>${data.data.a[0].email}</strong></div>
        <div class='infos'>Gender: <strong>${data.data.a[0].attrs.gender}</strong></div>
        <div class='xp'>Total XP :<strong>${1000}</strong></div>
        <div class='level'>Current Level :<strong>${20}</strong></div>`
        container.append(header, left, b)
    }
}

// get the query from query.graphql
export class query {
    constructor() { }
    async generalInfo() {
        let a = await fetch('./js/profile/query.graphql')
        let b = await a.text()
        return b
    }
}
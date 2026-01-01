export class Info{
    constructor(){}
    render(container){
        let c = document.createElement('section')
        c.id = 'info'
        container.append(c)
    }
}
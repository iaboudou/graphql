export class query {
    constructor() { }

    generalInfo() {
        return `{ user 
                    {
                      id 
                      login
                    }
                }`
    }
}
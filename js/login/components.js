import { Auth } from './auth.js'

export class Login {
    constructor() { }
    // method for rendring the login page
    render(container) {
        let logo = document.createElement('img')
        logo.id = 'logo'
        logo.src = './pics/logo.png'
        let username = document.createElement('input')
        username.id = 'username'
        username.placeholder = 'Username or Email'
        let password = document.createElement('input')
        password.id = 'password'
        password.type = 'password'
        password.placeholder = 'Password'
        let er = document.createElement('span')
        er.id = 'submit-error'
        er.textContent = 'invalid credencial'
        let submit = document.createElement('button')
        submit.id = 'submit'
        submit.textContent = 'Submit'
        container.append(username, password, er, submit)
        document.body.append(logo)
    }

    // submit method return the user tocken based on the username & password
    async submit(username, password) {
        let auth = new Auth()
        try {
            return await auth.getToken(username, password)
        } catch { }
    }

    // in case of invalid cridential, this method show the error message
    ErrorSubmit() {
        document.getElementById('submit-error').style.display = 'block'
    }
}
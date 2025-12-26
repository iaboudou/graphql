export function loginPage() {
    // logo
    let logo = document.createElement('img')
    logo.id = 'logo'
    logo.src = './pics/logo.png'

    // infos
    let username = document.createElement('input')
    username.className = "login"

    let password = document.createElement('input')
    password.className = "login mp"

    document.body.append(logo, username, password)
}

export function profilePage() {}

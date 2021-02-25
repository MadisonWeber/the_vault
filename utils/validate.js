
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateRegister = (name, email, password, cf_password) => {
    if(name.length < 2) return 'Name must be at least 2 characters'
    if(password.length <= 5) return 'Password must be 6 characters minimum'
    if(password !== cf_password) return 'Passwords do not match'
    if(!re.test(email)) return 'Please enter a valid email'

    return null
}

const validateSignin = (email, password) => {
    if(password.length <= 5) return 'Password must be 6 characters minimum'
    if(!re.test(email)) return 'Please enter a valid email'
    return null
}

export { validateRegister, validateSignin }
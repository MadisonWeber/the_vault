
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const caPostalRe = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

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

const validateCheckout = (street, city, postalCode) => {
    if(street.length <= 3) return 'Street length must be 4 characters minimum'
    if(city.length <= 2) return 'City must be 2 characters minimum'
    if(!caPostalRe.test(postalCode)) return 'Must enter valid Canadian postal code'



    return null
}

export { validateRegister, validateSignin, validateCheckout }
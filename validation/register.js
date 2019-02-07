const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.username = !isEmpty(data.username) ? data.username : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    if(Validator.isEmpty(data.username)) {
        errors.username = 'Name field is required'
    }

    if(!Validator.isLength(data.name, {min: 5, max: 20})) {
        errors.username = 'Username must be between 5 and 20 characters'
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be between 6 and 30 characters'
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required'
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match'
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}
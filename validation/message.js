const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.to = !isEmpty(data.to) ? data.to : ''
    data.message = !isEmpty(data.message) ? data.message : ''

    if(Validator.isEmpty(data.to)) {
        errors.username = 'To field is required'
    }

    if(Validator.isEmpty(data.message)) {
        errors.password = 'Message field is required'
    }

    if(!Validator.isLength(data.message, {min: 1, max: 240})) {
        errors.password = 'Message can not be over 240 characters'
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}
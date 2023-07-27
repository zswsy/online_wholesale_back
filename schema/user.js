const Joi = require('joi')

const username= Joi.string().required()
const password=Joi.string().alphanum().min(4).max(20).required()
const user_name = Joi.string().required()
const user_email = Joi.string().email().required()
const user_age = Joi.number().required()
const user_gender = Joi.string().required()
const user_phone = Joi.string().required()

exports.reguser_schema={
    body:{
        username,
        password
    }
}

exports.addUser_schema={
    body:{
        user_name,
        user_email,
        user_age,
        user_gender,
        user_phone,
    }
}
const Joi = require('joi')

const product_name=Joi.string().required()
const product_price=Joi.number().min(0).max(999999).required()
const product_description=Joi.string().required()
const product_quantity=Joi.number().min(0).required()

exports.addProduct_schema={
    body:{
        product_name,
        product_price,
        product_description,
        product_quantity
    }
}
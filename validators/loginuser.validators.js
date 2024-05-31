const Joi = require('joi');


const loginUserValidationSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
})


module.exports = loginUserValidationSchema;
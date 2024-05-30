const Joi = require('joi');

const validateQueryString = Joi.object().keys({
    gender: Joi.string().valid('male', 'female'),
    age: Joi.number().integer().min(0).max(100)
}).or('gender', 'age')


const getSearchQuery = (gender, age) => {
    const {error} = validateQueryString.validate({
        gender, age
    })

    if(error){
        return error;
    }
}

module.exports = getSearchQuery;



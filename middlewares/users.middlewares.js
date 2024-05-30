const getSearchQuery = require("../validators/users.validators");

const searchQueryGenderAndAge = (request, response, next) => {
    const {gender, age} = request.query;

    const error = getSearchQuery(gender, age);

    if(error){
        return response.status(404).json({message: error.message})
    }

    next();
}


module.exports = searchQueryGenderAndAge;
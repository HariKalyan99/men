const validateAuthUserSchema = (schema)  => (request, response, next) => {
    const {error} = schema.validate(request.body);
    if(error){
        response.status(422).json(error)
    }else{
        next()
    }
}


module.exports = validateAuthUserSchema;
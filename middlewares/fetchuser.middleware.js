const AuthUserService = require("../service/authuser.service");
const AuthUserFetch = new AuthUserService()
;
const fetchUserInCollection = async(request, response, next) => {
    
    try{
        const {username} = request.body;
        const user = await AuthUserFetch.findUserByUsername(username);
        if(!user){
            return response.status(404).json({message: "User not found for username", username})
        }else {
            next();
        }
    }catch(error){
        return response.status(500).json({message: "Could not find user"})
    }
}


module.exports = {fetchUserInCollection};
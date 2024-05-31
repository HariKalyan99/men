const AuthUserModel = require("../model/authuser.model");


class AuthUserService {
    register = async(body) => {
        const {username, fullName, email, password} = body;
        try{
            const Auth = new AuthUserModel({username, fullName, email, password});
            const result = await Auth.save();
            return result;
        }catch(error){
         throw error;   
        }
    }

    findUserByUsername = async(username) => {
        try{
            const result = await AuthUserModel.findOne({username});
            return result;
        }catch(error) {
            return error
        }
    }
}

module.exports = AuthUserService;
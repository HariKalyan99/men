const AuthUserService = require("./authuser.service");
const AuthUser = new AuthUserService();
const bcrypt = require('bcrypt');

class AuthService {
    encryptPassword = async(password) => {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    signup = async(body) => {
        try{
            const hashedPassword = await this.encryptPassword(body.password);
            const result = await AuthUser.register({...body, password: hashedPassword})
            return result;
        }catch(error){
            throw error
        }
    }
    verifyPassword = async(username,password) => {
        try{
            const userFromDb = await AuthUser.findUserByUsername(username);
            const isValid = await bcrypt.compare(password, userFromDb.password);
            console.log(userFromDb, isValid)
            if(isValid){
                return userFromDb;
            }else{
                return null;
            }
        }catch(error){
            throw error
        }

    }
    login = async(user) => {
        try{
            const {username, password} = user;
            const response = await this.verifyPassword(username,password);
            if(response){
                return {
                    isLoggedIn: true
                }
            }else{
                return {
                    isLoggedIn: false
                }
            }
        }catch(error){
            throw error;
        }
    }
}


module.exports = AuthService;
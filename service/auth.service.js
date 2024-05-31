const AuthUserService = require("./authuser.service");
const AuthUser = new AuthUserService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

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
    generateToken = async(username) => {
        try{
            const payload = {
                username
            }
            const options = {
                expiresIn: "1hr"
            }
            const token = await jwt.sign(payload, SECRET_KEY, options)
            return token
        }catch(error){
            throw error
        }
    }
    login = async(user) => {
        try{
            const {username, password} = user;
            const response = await this.verifyPassword(username,password);
            if(response){
                const token = await this.generateToken(username);
                return {
                    isLoggedIn: true,
                    token
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
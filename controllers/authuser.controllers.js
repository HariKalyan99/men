const AuthService = require("../service/auth.service");
const Auth = new AuthService();

const postSignup = async(request, response) => {
    try{    
        const result = await Auth.signup({...request.body});
        return response.status(200).json(result);
    }catch(error){
        if(error.code === 11000){
            return response.status(409).json({
                message: "Failed to create a new user, already exists"
            });
        }else{
            return response.status(500).json({message: "Failed to create new user", error})
        }
    }
}


const postLogin = async(request, response) => {
    try{
        const result = await Auth.login({...request.body});
        if(result.isLoggedIn){
            response.cookie("remember_token", result.token, {
                maxAge: 60*60*1000,
                httpOnly: true
            })
            return response.status(200).json(result);
        }else{
            return response.json({message: 'Invalid Credentials'})
        }
    }catch(error){
        return response.status(500).json({message: "Failed to create new user", error})
    }
}

module.exports = {postSignup, postLogin};
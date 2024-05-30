const usersInfo = require('../users.json');
const serverInfo = {
    server: "This is a node-http server",
    time: new Date().toTimeString(),
    date: new Date().toDateString()
}
const welcomeUsers = (request, response) => {
    response.send("<h1>This is a node-express server</h1>");
}

const getUsers =  (request, response) => {
    response.status(200).json(usersInfo.data);
}

const getUserByUuid = (request, response) => {
    response.status(200).json(usersInfo.data.find(x => x.login.uuid === request.params.uuid));
}

const getUserServer = (request, response) => {
    response.status(200).json({...serverInfo, server: "This is a node-express server built for users"});
}

const searchUser = (request, response) => {
    const {gender, age} = request.query;

    if(gender && age){
        return response.status(200).json(usersInfo.data.filter(x => x.gender?.toLowerCase() === gender?.toLowerCase() && x.dob.age === Number(age)));
    }

    if(gender){
        return response.status(200).json(usersInfo.data.filter(x => x.gender?.toLowerCase() === gender?.toLowerCase()));
    }

    if(age){
        return response.status(200).json(usersInfo.data.filter(x => x.dob.age === Number(age)))
    }
}




module.exports = {welcomeUsers, getUsers, getUserByUuid, getUserServer, searchUser}


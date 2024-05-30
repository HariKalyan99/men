const { welcomeUsers, getUserServer, getUsers, getUserByUuid, searchUser } = require('../controllers/users.controllers');
const searchQueryGenderAndAge = require('../middlewares/users.middlewares');

const userRoutes = require('express').Router()

userRoutes.get("/", welcomeUsers);
userRoutes.get("/server", getUserServer);
userRoutes.get("/users", getUsers);
userRoutes.get("/users/search", searchQueryGenderAndAge , searchUser);
userRoutes.get("/users/:uuid", getUserByUuid);

module.exports = userRoutes;

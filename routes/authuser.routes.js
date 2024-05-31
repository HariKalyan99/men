const { postSignup, postLogin } = require('../controllers/authuser.controllers');
const validateAuthUserSchema = require('../middlewares/authuser.middleware');
const { fetchUserInCollection } = require('../middlewares/fetchuser.middleware');
const validateLoginUserSchema = require('../middlewares/loginuser.middleware');
const authUserValidationSchema = require('../validators/authuser.validators');
const loginUserValidationSchema = require('../validators/loginuser.validators');
const validateAuth = validateAuthUserSchema(authUserValidationSchema)
const validateLogin = validateLoginUserSchema(loginUserValidationSchema);
const authRoutes = require('express').Router();




authRoutes.post("/signup",validateAuth, postSignup);
authRoutes.post("/login",validateLogin,fetchUserInCollection,postLogin);


module.exports = authRoutes;
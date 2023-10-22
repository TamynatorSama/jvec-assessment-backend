const express = require('express')
const authRouter = express.Router()

const {login, registerUser,logout} = require('../controller/auth_controller')
const verifyJWT = require('../middleware/verify_jwt')

authRouter.post('/login',login)
authRouter.post('/signup',registerUser)
authRouter.get('/logout',verifyJWT,logout)


module.exports = authRouter
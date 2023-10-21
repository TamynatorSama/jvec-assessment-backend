const express = require('express')
const authRouter = express.Router()

const {login, registerUser} = require('../controller/auth_controller')

authRouter.post('/login',login)
authRouter.post('/signup',registerUser)


module.exports = authRouter
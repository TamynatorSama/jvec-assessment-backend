require('dotenv').config()
const userModel = require('../model/user_model')
const bcrypt = require('bcrypt')
const {SuccessResponse,ErrorResponse} = require('../helper_class/json_response_class')
const jwt = require('jsonwebtoken')


const login = async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){

        let emailVal = !email?[
            "Email field is required"
        ]:undefined
        let passwordVal = !password?[
            "Password field is required"
        ]:undefined

        return res.status(422).json(
            new ErrorResponse({
                message:"Validation Error",
                statusCode:422,
                error:{
                    email:emailVal,
                    password:passwordVal
                }
            })
        )
    }

    let foundUser = await userModel.findOne({"email":email.toLowerCase()})

    if(!foundUser){
        return res.status(401).json(
            new ErrorResponse({
                message:"User does not exist in the eco system",
                statusCode:401,
            })
        )
    }

    let match = await bcrypt.compare(password,foundUser.password)

    if(match){
        const accessToken = jwt.sign(
            {
                "user_id": foundUser.id
            },
            process.env.JWT_SECRET,{
                expiresIn: "30d"
            }
        )
        return res.status(200).json(
            new SuccessResponse({
                message:"Authentication successful",
                statusCode:200,
                result:{
                    user_payload:foundUser,
                    token: accessToken
                }
            })
        )

    }else{
        return res.status(401).json(
            new ErrorResponse({
                message:"Incorrect credentials",
                statusCode:401,
            })
        )
    }



    

}


const registerUser=async(req,res)=>{
    const {full_name,email,password} = req.body

    if(!email || !password|| !full_name){

        let emailVal = !email?[
            "Email field is required"
        ]:undefined
        let passwordVal = !password?[
            "Password field is required"
        ]:undefined
        let nameVal = !full_name?[
            "Password field is required"
        ]:undefined

        return res.status(422).json(
            new ErrorResponse({
                message:"Validation Error",
                statusCode:422,
                error:{
                    email:emailVal,
                    password:passwordVal,
                    full_name:nameVal
                }
            })
        )
    }
    let foundUser = await userModel.findOne({"email":email.toLowerCase()})

    if(foundUser){
        return res.status(400).json(
            new ErrorResponse({
                message:"User already Exists",
                statusCode:400,
            })
        )
    }
    let hashedPassword = await bcrypt.hash(password,10)
    let newUser = new userModel({
        full_name,
        email: email.toLowerCase(),
        password:hashedPassword
    })
    let user  = await newUser.save()

    const accessToken = jwt.sign(
        {
            "user_id": user.id
        },
        process.env.JWT_SECRET,{
            expiresIn: "30d"
        })

    return res.status(200).json(
        new SuccessResponse({
            message:"Authentication successful",
            statusCode:200,
            result:{
                user_payload:user,
                token: accessToken
            }
        })
    )

}

module.exports ={
    login,registerUser
}
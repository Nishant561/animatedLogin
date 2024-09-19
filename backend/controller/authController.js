const mongoose = require('mongoose')
const userModel = require('./../db/Schema/userSchema')
const userHandler = require('./asyncUserHandler')
const errorHandlingFeatures = require('./../utils/errorHandlingFeatures')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path:'./../config.env'})

exports.signup = userHandler(async (request , response)=>{
    
        const {name , email , password} = request.body

    const user = await userModel.findOne({email:email})

    if(user){
        return response.status(400).json({
            status:'fail',
            message:'The user already exists.'
        })
    }

    const newUser = new userModel({name,email,password})

    await newUser.save()

   return response.status(201).json({
        status:'success',
        message:'Account created successfully',
        data:{
            user:newUser
        }
    })
     



})


exports.login  = userHandler(async (request , response,next)=>{
    const {email , password} = request.body

    const user = await userModel.findOne({email})

    if(!user){
        return next(new errorHandlingFeatures('User with this email id doesnot exists.' , 400))

    }

    const isPasswordCorrect = await user.comparePassword(password,user.password )
    if(!isPasswordCorrect){
        
        const error = new errorHandlingFeatures('The password doesnot match.' , 404)
        return next(error)
    }

    const tokenForLogin = jwt.sign({name:user.name, id:user._id} , process.env.SECRET_STR )
    

    return response.status(200).json({
        status:'success',
        message:'You are logged In.',
        data:{
            name: user.name,
            token:tokenForLogin
        }
    })




})






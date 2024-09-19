const joi = require('joi')
const errorHandlingFeatures = require('./../utils/errorHandlingFeatures')

exports.signupValidation = (request , response , next)=>{
    const schema = joi.object({
        name:joi.string().max(20).min(4).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(12).required()
    })

    const {error} = schema.validate(request.body)
    if(error){

        const err = new errorHandlingFeatures(error.message , 400)
        console.log(err)
        return next(err)
    }

    next()
}

exports.loginValidation = (request, response, next )=>{

    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).max(12).required()

    })

    const {error} = schema.validate(request.body)

    if(error){
        return next(new errorHandlingFeatures(error.message, 400))
    }
    next()
}
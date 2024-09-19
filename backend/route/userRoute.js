const express = require('express')

const authController = require('./../controller/authController')
const router = express.Router()
const userValidation = require('./../validation/userValidation')


router.post('/signup',userValidation.signupValidation,authController.signup)

router.post('/login',userValidation.loginValidation , authController.login)


module.exports = router
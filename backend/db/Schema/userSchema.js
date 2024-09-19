
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Name field is required']

    },
    email:{
        type:String,
        required:[true , 'Email is required.'],
        unique:[true ,'Email already exists.']
    },
    password:{
        type:String,
        required:[true , 'Password field is required.']
    }

})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password , 12)
    next()
})

userSchema.methods.comparePassword = async (passwordByUser , passwordFromDB)=>{
    return await bcrypt.compare(passwordByUser , passwordFromDB)
}


const userModel = mongoose.model('users',userSchema)

module.exports = userModel
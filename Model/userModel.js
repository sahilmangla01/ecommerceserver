const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    cart:[{productId:String, quantity:Number , stock:Number , price:Number}]
})
module.exports = mongoose.model("User",userSchema)
const mongoose = require('mongoose')

const schema = mongoose.Schema

const productSchema = new schema({
    id: String,
    name: String,
    company: String,
    price: Number,
    colors: [],
    stock:Number,
    stars:Number,
    reviews:Number,
    image:[
      {
        id:Number,
        img:String,
        filename:String
      }
    ],
    description:String,
    best:String,
    featured:Boolean,
    category: String,
})
module.exports = mongoose.model("Product",productSchema)
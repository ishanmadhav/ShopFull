const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name: String,
    age: Number,
    email: String,
    isAdmin: {
        type: Boolean,
        default: true
    },
    cart: [{
        quantity: Number,
        product: {type: Schema.Types.ObjectId, ref: 'Product'},
        price: Number
    }],
    password: String
})

const User=mongoose.model('User', userSchema)
module.exports=User

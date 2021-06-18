const mongoose=require('mongoose')
const Schema=mongoose.Schema

const reviewSchema=new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    content: String,
    rating: {type: Number, default: 3},
})

const productSchema=new Schema({
    name: String,
    image: String,
    brand: String,
    category: String,
    price: {type: Number, default: 0},
    description: String,
    rating: {type: Number, default: 0},
    stock: Number,
    reviews: [reviewSchema]


})

const Product=mongoose.model('Product', productSchema)
module.exports=Product

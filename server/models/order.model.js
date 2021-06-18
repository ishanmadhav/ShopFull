const mongoose=require('mongoose')
const Schema=mongoose.Schema

const orderSchema=new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    items: [{
        product: {type: Schema.Types.ObjectId, ref: 'Product'},
        quantity: Number,
        price: Number
    
    }],
    address: {
        street: String,
        zipCode: Number,
        city: String,
        state: String, 
        name: String,
        mobileNumber: String,
        addressLine: String
    },
    deliveryCharge: Number,
    taxCharge: Number,
    totalAmount: Number,
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentMethod: String,
    isDelivered: {
        type: Boolean,
        default: false
    }

})


const Order=mongoose.model('Order', orderSchema)
module.exports=Order
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const PORT=5000||process.env.PORT
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv')
dotenv.config()
const token=process.env.TOKEN_SECRET
const nodemailer = require("nodemailer");


const faker=require('faker')

app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))
app.set('view engine', 'ejs')

//DB Connection
mongoose.connect('mongodb://localhost/shopfull', {useNewUrlParser: true, useUnifiedTopology: true})

//Mongoose models
const User=require('./models/user.model')
const Product = require('./models/product.model')
const Order= require('./models/order.model')

const getAccessToken=(email)=>
{
    return jwt.sign(email, token)
}

const isAuthenticated=(req, res, next)=>
{
    const authHeader=req.headers["authorization"]
    const tempToken = authHeader && authHeader.split(' ')[1]
    console.log(tempToken)
    jwt.verify(tempToken, token, (err, email)=>
    {
        if (err)
        {
            console.log("An error occured")
            console.log(err)
            return res.status(401).json({message: "The user is not authenticated"})
        }
        else
        {
            console.log(email)
            req.email=email
            next()
        }
    })

}

const isAdminAuth=(req, res, next)=>
{
    const authHeader=req.headers["authorization"]
    const tempToken = authHeader && authHeader.split(' ')[1]
    console.log(tempToken)
    jwt.verify(tempToken, token, (err, email)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(401).json({message: "The user is not authenticated"})
        }
        else
        {

            console.log(email)
            req.email=email
            User.find({email: req.email}, (error, result)=>
            {
                if (error)
                {
                    console.log(error)
                    return res.status(401).json({message: "The user is not authenticated"})
                }
                else
                {
                    if (result[0].isAdmin)
                    {
                        next()
                    }
                    else
                    {
                        return res.status(401).json({messsage: "The admin is not autheticated"})
                    }
                }
            })
            
        }
    })
}
/*
User.findById("60b7b7701c79100238ea09c6", async (err, admin)=>
{
    if (err)
    {
        return console.log(err)
    }
    else
    {
        admin.isAdmin=true
        await admin.save()
        console.log(admin)
    }
}) */

//NodeMailer Stuff
const mailSender=async ()=>
{
    /*
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'zena.schmidt@ethereal.email',
            pass: '7mAqeeDEBEH8KH4Jwq'
        }
    }); */
    //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ai.machinepay@gmail.com', // generated ethereal user
      pass: 'jcXY4aCB2wMETRQq', // generated ethereal password
    },
  });
    
    let info = await transporter.sendMail({
        from: '"Ishan Madhav 👻" <ai.machinepay@gmail.com>', // sender address
        to: "theishanmadhav@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world hai na?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

app.get('/sendmail', (req, res)=>
{
    mailSender()
    res.json('Success')
})



app.post('/add_to_cart', isAuthenticated, (req, res)=>
{
    console.log(req.body)
    User.findById(req.body.userId, (err, result)=>
    {
        const temp={
            quantity: 1,
            price: req.body.price,
            product: req.body.productId
        }
        result.cart.push(temp)
        result.save()
        return res.json(result)
    })
})

app.post('/order', isAuthenticated, async (req, res)=>
{
    console.log(req.body)
    const currentUser=await User.findById(req.body.userId)
    const addressData={
        name: req.body.name,
        mobileNumber: req.body.mobileNumber,
        zipCode: req.body.zipCode,
        city: req.body.city,
        state: req.body.state,
        addressLine: req.body.addressLine,
        street: req.body.locality
    }
    const orderData=new Order({
        user: currentUser._id,
        address: addressData,
        items: currentUser.cart,
        paymentMethod: "Cash on Delivery"
        
    })
    var tempAmount=0
    for (var i=0;i<orderData.items.length;i++)
    {
        tempAmount=tempAmount+(orderData.items[i].quantity*orderData.items[i].price)
    }
    orderData.totalAmount=tempAmount
    orderData.taxCharge=orderData.totalAmount*0.04
    orderData.deliveryCharge=orderData.totalAmount*0.02

    const orderReceipt=await orderData.save()
    res.json(orderReceipt)
})

app.get('/order', async (req, res)=>
{
    const orders=await Order.find()
    console.log(orders)
})

app.delete('/delete_from_cart', isAuthenticated, (req, res)=>
{
    console.log(req.body)
    User.findById(req.body.userId, async (err, user)=>
    {   
        /*
        for (var i=0;i<user.cart.length;i++)
        {
            if (user.cart[i].product==req.body.productId)
            {
                console.log("This runs")
                user.cart.spice(i, 1)
                break
            }
        }*/
        user.cart.pull({_id: req.body.productId})
        await user.save()
        return res.json(user)
    })

})

app.post('/user', (req, res)=>
{
    const tempUser=new User({
        name: req.body.name,
        age: parseInt(req.body.age),
        email: req.body.email,
    })
    console.log(tempUser)
    bcrypt.hash(req.body.password, 10, (err, hash)=>
    {
        if (err)
        {
            return console.log(err)
        }
        else
        {
            tempUser.password=hash
            tempUser.save((err, result)=>
            {
                if (err)
                {
                    return res.status(403).json()
                }
                else
                {
                    return res.json(result)
                }
            })
        }
    })
})

app.get('/user/:id', (req, res)=>
{
    console.log("This route runs")
    console.log(req.params.id)
    User.findById(req.params.id).populate({path:'cart.product'}).exec((err, user)=>
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            console.log(user)
            return res.json(user)
        }
    })
})

app.post('/user/login', (req, res)=>
{
    console.log(req.body)
    User.find({email: req.body.email}, (err, user)=>
    {
        if (err || user.length==0)
        {
            return res.status(401).json({message: "Failure to login"})
        }
        
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>
        {
            if (err)
            {
                return res.status(403).json()
            }
            else
            {
                if (result)
                {
                    const jwtToken=getAccessToken(req.body.email)
                    return res.status(200).json({Token: jwtToken, userId: user[0]._id})
                }
                else
                {
                    return res.status(401).json({message: "Failure to login"})
                }
            }
        })
    }) 
})


app.post ('/product', isAdminAuth, (req, res)=>
{
    /*
    const tempProduct=new Product({
        name: faker.commerce.productName(),
        brand: faker.company.companyName(),
        category: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.datatype.number()
    }) */

    const tempProduct=new Product({
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image

    })
    console.log(req.body)
    tempProduct.save((err, result)=>
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            return res.json(result)
        }
    })
})

app.get('/products', isAuthenticated,  async (req, res)=>
{
    const products=await Product.find()
    res.json(products)
})

app.get('/findusers',  async (req, res)=>
{
    const result=await User.find()
    res.json(result)

})



app.get('/', (req, res)=>
{
    res.render('home')
})







app.listen(PORT, ()=>
{
    console.log('The server is running on port 5000')
})
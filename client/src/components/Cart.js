import React, {useState, useEffect, useContext} from 'react'
import {Container, Grid, Paper, Button, Box, Card, CardActionArea, CardContent, Typography, makeStyles} from '@material-ui/core'
import authContext from '../context/AuthContext'
import CartItem from './CartItem'
import OrderCheckout from './OrderCheckout'

const useStyles=makeStyles({
    box: {
        textAlign: 'right'
    },
    placeOrderButton:{
        padding: "15px",
    }   
    
})


export default function Cart() {
    const authInfo=useContext(authContext)
    const [cartProducts, setCartProducts]=useState([])
    const classes=useStyles()
    const [orderStep, setOrderStep]=useState(false)
    useEffect(()=>
    {
        console.log("This runs")
        fetch(`/user/${authInfo.userId}`, {
            headers: {
                'authorization': 'Bearer '+authInfo.jwtToken,
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setCartProducts(data.cart)
            console.log(data)
        })
    }, [authInfo.changeDetector])

    const orderHandler=()=>
    {
        /*
        const data={userId: authInfo.userId}
        fetch('/order',{
            method: 'POST',
            headers: {
                'authorization': 'Bearer '+authInfo.jwtToken,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }) */
        setOrderStep(!orderStep)

    }
    if (orderStep)
    {
        return (<OrderCheckout setOrderStep={setOrderStep} />)
    }
    return (
        <Container>
            {cartProducts.map((x)=>(<CartItem name={x.product.name} image={x.product.image} price={x.product.price} brand={x.product.brand} cateogry={x.product.category} quantity={x.quantity}  
                description={x.description} productId={x._id} rating={x.product.rating} stock={x.product.productId} 
            />)) }
            <Box>
           <Paper className={classes.box} elevation={3} square={true} style={{padding: "10px"}}>
              
               <Button onClick={orderHandler} className={classes.placeOrderButton} variant="contained" size="large" color="primary">
                   Place Order
               </Button>
                
           </Paper>
           </Box>
        </Container>
    )
}

import React, {useContext, useState, useEffect} from 'react'
import {Container, Box, Button, Grid, Paper} from '@material-ui/core'
import authContext from '../context/AuthContext' 
import {Redirect} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Product from './Product'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
   
  }));

  export default function ProductPage() {
    const authInfo=useContext(authContext)
    const [products, setProducts]=useState([])
    const classes=useStyles()
    useEffect(()=>
    {
        console.log(authInfo.jwtToken)
        fetch('/products',{
            headers: {
                'authorization': 'Bearer '+authInfo.jwtToken,
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>res.json())
        .then(data=>{console.log((data))
            setProducts(data)
        }) 
    },[])
   
        return (<Container className={classes.root} style={{marginTop: "5%"}}>
           <Grid container spacing={3}>
               {products.map((product)=>(<Product name={product.name} image={product.image} brand={product.brand} category={product.category} price={product.price} description={product.description} rating={product.rating} reviews={product.reviews} stock={product.stock} productId={product._id} />))}

            </Grid> 
        </Container>
            
        )
}
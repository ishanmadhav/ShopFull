import React, {useState, useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Container, Box, Button, Grid, Paper, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions} from '@material-ui/core'
import authContext from '../context/AuthContext';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 360
    },
    paperhover: {
        padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    media: {
      
    },
    
   
  }));

  
export default function Product({name, image, brand, category, price, description, rating, stock, reviews, productId}) {
    const classes=useStyles()
    const [hover,setHover]=useState(0)
    const authInfo=useContext(authContext)
    const handleAddToCart=()=>
    {
      const productData={
        productId: productId, userId: authInfo.userId, price: price
      }

      fetch('/add_to_cart', {
        method: 'POST',
        headers: {
          'authorization': 'Bearer '+authInfo.jwtToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
    }
    return (
        <Grid xs={6} sm={3} item>
            <Card onMouseOver={()=>{setHover(1)}} onMouseLeave={()=>{setHover(0)}} elevation={hover==1?5:1} className={hover==1?classes.paperhover:classes.paper}>
            <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={image}
                    title="Contemplative Reptile"
                    style={{height: '140px', width: 'auto'}}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    ₹<b>{price}</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {brand}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleAddToCart} style={{marginLeft: 'auto'}} size="small" color="primary">
                      Add to Cart
                    </Button>
            </CardActions>


            </Card>
        </Grid>
    )
}

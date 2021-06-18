import { Typography, Box, Paper, Grid, Button } from '@material-ui/core'
import React, { useContext } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import authContext from '../context/AuthContext';

export default function CartItem({name, image, brand, category, price, description, rating, stock, reviews, productId, quantity}) {
    const authInfo=useContext(authContext)
    const handleRemove=()=>
    {
        const data={
            productId: productId,
            userId: authInfo.userId
        }
        fetch('/delete_from_cart',{
            method: "DELETE",
            headers: {
                'authorization': 'Bearer '+authInfo.jwtToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res)=>res.json())
        .then(data=>{console.log(data)
            authInfo.setChangeDetector((pstate)=>(!pstate))
        }
        )
    }
    return (
    <div>
       <Box>
           <Paper elevation={3} square={true} style={{padding: "10px"}}>
               <Grid container>
                   <Grid xs={4} item>
                       <img src={image} style={{height: '140px', width: 'auto'}}/>
                   </Grid>
                   <Grid item xs={1}>

                   </Grid>
                   <Grid xs={7} item>
                    <Typography variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {brand}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        ₹<b>{price}</b>
                    </Typography>
                    <Button onClick={handleRemove} variant='contained' color="secondary" startIcon={<DeleteIcon />} >
                        Remove
                    </Button>
                    </Grid>
               </Grid>
               
           </Paper>
       </Box>
       </div>

    )
}

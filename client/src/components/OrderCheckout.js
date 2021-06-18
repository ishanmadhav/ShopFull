import { TextField, Container, Grid, makeStyles, Button } from '@material-ui/core'
import React, {useState, useContext} from 'react'
import authContext from '../context/AuthContext'



export default function OrderCheckout({setOrderStep}) {

    const [name, setName]=useState('')
    const [mobileNumber, setMobileNumber]=useState('')
    const [pincode, setPincode]=useState('')
    const [locality, setLocality]=useState('')
    const [address, setAddress]=useState('')
    const [city, setCity]=useState('')
    const [state, setState]=useState('')

    const authInfo=useContext(authContext)

    const handleNameChange=(e)=>
    {
        setName(e.target.value)
    }
    const handleNumberChange=(e)=>
    {
        setMobileNumber(e.target.value)
    }
    const handlePincodeChange=(e)=>
    {
        setPincode(e.target.value)
    }
    const handleLocalityChange=(e)=>
    {
        setLocality(e.target.value)
    }
    const handleAddressChange=(e)=>
    {
        setAddress(e.target.value)
    }
    const handleCityChange=(e)=>
    {
        setCity(e.target.value)
    }
    const handleStateChange=(e)=>
    {
        setState(e.target.value)
    }

    const handleOrder=()=>
    {
        const data={
            name: name,
            mobileNumber: mobileNumber,
            zipCode: pincode,
            locality: locality,
            addressLine: address,
            city: city,
            state: state,
            userId: authInfo.userId 
        }

        fetch('/order', {
            method: 'POST',
            headers: {
              'authorization': 'Bearer '+authInfo.jwtToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res=>res.json())
          .then(data=>console.log(data))
    }

    return (
        <Container>
            <Grid container>
                <Grid  xs={8} sm={8} item>
                            <TextField onChange={handleNameChange} label="Name"/>
                            <TextField onChange={handleNumberChange} label="10 digit mobile number" style={{marginLeft: '10px'}}/>
                            <p/>
                             <TextField onChange={handlePincodeChange} label="pincode"/>
                             <TextField onChange={handleLocalityChange} style={{marginLeft: '10px'}} label="locality" />
                            <TextField onChange={handleAddressChange} label="Address" multiline fullWidth rowsMax={4}/>
                            <TextField onChange={handleCityChange} label="city" />
                            <TextField onChange={handleStateChange} label="state" style={{marginLeft: '10px'}}/>
                            <p />
                            <Button onClick={handleOrder} size="large" variant="contained" color="primary">Deliver Here</Button>
                    
                </Grid>
                <Grid xs={4} sm={4} item>

                </Grid>
            </Grid>
            
        </Container>
    )
}

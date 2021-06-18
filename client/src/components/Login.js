import React, {useState, useEffect, useContext} from 'react'
import {Container, Box, Button, Grid, Paper, TextField} from '@material-ui/core'
import {Link} from 'react-router-dom'
import authContext from '../context/AuthContext'
import {Redirect, useHistory} from 'react-router-dom'

export default function Login() {
    const [email, setEmail]=useState('')
    const [password,setPassword]=useState('')
    const authInfo=useContext(authContext)
    const history=useHistory()
    const handleEmailChange=(e)=>
    {
        setEmail(e.target.value)
    }

    const handlePasswordChange=(e)=>
    {
        setPassword(e.target.value)
    }

    const clickHandler=(e)=>
    {
        e.preventDefault()
        const loginData={email: email, password: password}
        console.log(loginData)
        fetch('/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(loginData)
        })
        .then((res)=>{
            if (res.status==200)
            {
                authInfo.setLogin(1)
            }
            return res.json()})
        .then(data=>{
            authInfo.setJwtToken(data.Token)
            authInfo.setEmail(email)
            authInfo.setUserId(data.userId)
        
        })
    }

    if (authInfo.jwtToken!='')
    {
        return <Redirect to='/productpage' />
    }
    else
    {

    return (
            <Container>
                <Grid container >
                <Grid item xs={3}>

                </Grid>
                
                <Grid item xs={6}>
                  <Paper style={{width:"60%", margin: "auto", marginTop: "60px", padding: "50px"}}>
                        <form>
                            <TextField onChange={handleEmailChange} fullWidth style={{marginTop: "10px"}} label="Email"/>
                            <TextField onChange={handlePasswordChange} fullWidth type="password" style={{marginTop: "10px"}} label="Password"/>
                            <Button onClick={clickHandler} style={{marginTop: "20px"}} fullWidth variant="contained" color="primary">Log in</Button>
                        </form>
                        <Box m={2}>
                            Not signed up?
                            <Link to='/signup' style={{textDecoration: "none"}}>
                                <Button size="large" variant="contained" color="secondary">Sign Up Now!</Button>

                            </Link>
                             

                        </Box>
                        
                  </Paper>
                    
                </Grid>

                <Grid item xs={3}>

                </Grid>

                </Grid>
            </Container>
    
    ) }
}

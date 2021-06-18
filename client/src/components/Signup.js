import React, {useState} from 'react'
import {Container, Grid, Box, Button, TextField, FormControl, Select, MenuItem, InputLabel} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const SIZE=100

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  

export default function Signup() {
    const [age, setAge]=useState('')
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')


    const classes=useStyles()
    const buildOptions=()=> {
        var arr = [];

        for (let i = 1; i <= 100; i++) {
            arr.push(<MenuItem value={i}>{i}</MenuItem>)
        }

        return arr; 
    }
    const handleAgeChange=(e)=>
    {
        setAge(e.target.value)
    }

    const handleNameChange=(e)=>
    {
        setName(e.target.value)
    }

    const handleEmailChange=(e)=>
    {
        setEmail(e.target.value)
    }

    const handlePasswordChange=(e)=>
    {
        setPassword(e.target.value)
    }

    const handleSubmit=(e)=>
    {
        e.preventDefault()

        const signupData={
            name: name, password: password, email: email, age: age
        }
        console.log(signupData)
        fetch('/user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(signupData)
        })
        .then((res)=>res.json())
        .then(data=>console.log(data))
    }
    return (
        <Container>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <Box mt={3}>
                            <h1>Create a new Account</h1>
                            Just a few moments to get started
                            <form>
                                <TextField onChange={handleNameChange} fullWidth style={{marginTop: "10px"}} label="Name"/>
                                <TextField onChange={handlePasswordChange} fullWidth type="password" style={{marginTop: "10px"}} label="Password"/>
                                <TextField onChange={handleEmailChange} fullWidth type="email" style={{marginTop: "10px"}} label="Email Address" />
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={handleAgeChange}
                                    >
                                    {buildOptions()}

                                    
                                    </Select>
                                </FormControl>
                                <br />
                                <Button fullWidth onClick={handleSubmit} size="large" style={{ marginTop: "10px"}} variant="contained" color="secondary">Sign Up</Button>
                            </form>
                        </Box>
                    </Grid>

                </Grid>
        </Container>
    )
}

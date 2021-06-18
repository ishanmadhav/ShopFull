import React, {useContext} from 'react'
import authContext from '../context/AuthContext'
import {Redirect} from 'react-router-dom'
import Login from './Login'
import ProductPage from './ProductPage'

export default function Home() {
    const authInfo=useContext(authContext)
    const handleClick=()=>
    {
        authInfo.setEmail('theishanmadhav@gmail.com')
    }
    
        return (
        <Login />) }
    


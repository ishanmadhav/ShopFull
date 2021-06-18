import './App.css';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home'
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Box} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ProductPage from './components/ProductPage';
import Signup from './components/Signup'
import { findByLabelText } from '@testing-library/dom';
import { useState} from 'react'
import authContext from './context/AuthContext'
import AddProduct from './components/Admin/AddProduct';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from './components/Cart'

const useStyles=makeStyles((theme)=>(
{
  title: {
    flexGrow: 1
  }
}))




function App() {
  const classes=useStyles()
  
  //Auth State for React Context
  const [login, setLogin]=useState(0)
  const [email, setEmail]=useState('')
  const [userId, setUserId]=useState('')
  const [jwtToken, setJwtToken]=useState('')
  const [changeDetector, setChangeDetector]=useState(false)

  const handleLogout=()=>
  {
      setLogin(0)
      setEmail('')
      setUserId('')
      setJwtToken('')
  }

  const handleLogin=()=>
  {
    setLogin(1)
  }

  return (
    <Router>
    <Container >
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.title}>
          <Link to='/' style={{textDecoration: "none"}}>
            <Button color="secondary" variant="contained" >Home</Button>
          </Link >
          <Link to='/productpage' style={{textDecoration: "none", marginLeft: "10px"}}>
            <Button color="secondary" variant="contained">Products</Button>
          </Link>
          </Box>
          <Link to ='/addproduct' style={{textDecoration: "none",marginLeft :"10px"}}>
          <Button color="secondary" variant="contained">Add Product</Button>
          </Link>
          <Link to ='/cart' style={{textDecoration: 'none', marginLeft: '10px'}}>
            <Button color="secondary" variant="contained"><ShoppingCartIcon />Cart</Button>
          </Link>
          {login==1?
            <Button color="secondary" variant="contained" onClick={handleLogout} style={{marginLeft :"10px"}}>Logout</Button>
          : <Link to='/' style={{textDecoration: "none"}}>
            <Button color="secondary" variant="contained" style={{textDecoration: "none", marginLeft:"10px"}}>Login</Button>
          </Link>}

          
         
        </Toolbar>
      </AppBar>

      <authContext.Provider value={{login, setLogin, email, setEmail, userId, setUserId, jwtToken, setJwtToken, changeDetector, setChangeDetector}}>
      <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/productpage">
            <ProductPage />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/addproduct'>
            <AddProduct />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
      </Switch>
      </authContext.Provider>
    </Container>
    </Router>
  );
}

export default App;

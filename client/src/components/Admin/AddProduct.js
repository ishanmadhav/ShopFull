import React, {useState, useContext, useRef, useEffect} from 'react'
import {Container, Grid, Box, Button, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import authContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
})

export default function AddProduct() {
    const classes=useStyles()
    const [name, setName]=useState('')
    const [description, setDescription]=useState('')
    const [brand, setBrand]=useState('')
    const [category, setCategory]=useState('')
    const [price, setPrice]=useState('')
    const [stock, setStock]=useState('')
    const [source, setSource]=useState('')
   // const imgInput=useRef(null)

    const authInfo=useContext(authContext)
    
    useEffect(()=>
    {

    }, [source])

    const handleNameChange=(e)=>
    {
        setName(e.target.value)    
    }
    const handleDescChange=(e)=>
    {
        setDescription(e.target.value)
    }
    const handleBrandChange=(e)=>
    {
        setBrand(e.target.value)
    }
    const handleCategoryChange=(e)=>
    {
        setCategory(e.target.value)
    }
    const handlePriceChange=(e)=>
    {
        setPrice(e.target.value)
    }
    const handleStockChange=(e)=>
    {
        setStock(e.target.value)
    }
    const handleImageChange= async (e)=>
    {
        
        const files=e.target.files
        const imgSource=await toBase64(files[0])
        setSource(imgSource)
            
        
    }

    const handleSubmit=(e)=>
    {
        e.preventDefault()
        
        const productData={
            name: name, description: description, brand: brand, category: category, price: price, stock: stock, image: source
        }
        console.log(productData)
        fetch('/product', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+authInfo.jwtToken
              },
            body: JSON.stringify(productData)
        })
        .then((res)=>res.json())
        .then(data=>setSource(data))
    }


    return (
        <Container>
            <img src={source } />
            <TextField onChange={handleNameChange} fullWidth style={{marginTop: "10px"}} label="Product Name"/>
            <TextField onChange={handleDescChange}
            id="standard-multiline-flexible"
            label="Description"
            multiline
            rowsMax={4}
            fullWidth
            style={{marginTop: "10px"}}
            />
            <TextField onChange={handleBrandChange} id="standard-basic" label="Brand" style={{marginTop: "10px"}}/>
            <TextField  onChange={handleCategoryChange} id="standard-basic" label="Category" style={{marginTop: "10px"}}/>
            <TextField onChange={handlePriceChange} id="standard-basic" label="Price" style={{marginTop: "10px"}}/>
            <TextField onChange={handleStockChange} id="standard-basic" label="Stock" style={{marginTop: "10px"}}/>
            <input id="fileUpload" type="file" onChange={handleImageChange} />
            <Button onClick={handleSubmit} fullWidth size="large" style={{ marginTop: "10px"}} variant="contained" color="secondary">Add Product</Button>
        </Container>
    )
}

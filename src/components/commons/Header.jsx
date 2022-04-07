import React,{useContext} from 'react'
import {CartContext} from '../../contex/GeneralCart'
import {GeneralAuthContext} from '../../contex/GeneralAuthContext'
import { Grid, Button,Box,Typography,CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
export default function Header() {
  const {allProductsInCart} = useContext(CartContext)
  const {user,logOut} = useContext(GeneralAuthContext)
  const amountOfProducts = allProductsInCart.reduce((acc,product)=> product.qqt + acc,0)
  return (
    <Grid container spacing={2} style={{display:"flex",justifyContent:"space-around"}}>
      <Grid item sx={12} md={4}><Link to="/"><CardMedia component="img" image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/ITunes_Store_logo.svg/1280px-ITunes_Store_logo.svg.png" height="80"/></Link></Grid>
      <Grid item sx={12} md={8} style={{display:"flex",alignItems:"center",textAlign:"center"}}>
        <Box sx={{display:"flex",alignItems:"center",textAlign:"center"}}>
          <Link to="/" style={{textDecoration:"none",color:"black"}}><Typography sx={{minWidth:150}}>Home</Typography></Link>
          <Link to="/dashboard" style={{textDecoration:"none",color:"black"}}><Typography sx={{minWidth:150}}>DashBoard</Typography></Link>
          <Typography sx={{minWidth:150}}>About US</Typography>
          <Link to="/cart-description"><Button color='secondary' variant="contained">CART {amountOfProducts} Products</Button></Link>
          {!user?(<Link to="/login"><Button variant="contained">Login</Button></Link>):(<Button onClick={()=> logOut()} variant='contained' style={{backgroundColor:"red"}}>Log Out</Button>)}
        </Box>
      </Grid>
    </Grid>
  )
}

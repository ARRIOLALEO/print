import React,{useContext,useState} from 'react'
import {CartContext} from '../contex/GeneralCart'
import {FirestoreContext} from '../contex/GeneralFireStore'
import {Grid,List,ListItem,FormControl,Input,Button,Typography,Dialog,DialogContent,DialogTitle} from '@mui/material'
import Header from '../components/commons/Header'
import { useNavigate} from 'react-router-dom'

export default function MakeAndOrder() {
  const {allProductsInCart}  = useContext(CartContext)
  const [response,setResponse] = useState(false)
  const [responseFromServer,setResponseFromServer] = useState("")
  const {newOrder} = useContext(FirestoreContext)  
  const [customerData,setCustomerData] = useState({})
  const redirecion = useNavigate()
  const handlerNewOrder = async () =>{
     const responseServer = await newOrder(customerData,allProductsInCart)
     setResponse(!response)
    //  console.log(responseServer)
     setResponseFromServer(responseServer) 
  }
  return (
      <>
      <Header/>
      <Typography variant='h1' style={{width:"100",display:"flex",flexAlign:"center",margin:"2rem",textAlign:"center",justifyContent:"space-around"}}>
        Make your Order
      </Typography>
      <Grid container spacing={2} >
        <Grid item  md={6} sx={{borderRight:2}}>
          <List>
            {
              allProductsInCart.map(el=>(
                <ListItem key={el.id}>
                <Grid container spacing={2}>
                <Grid item md={3}>
                  <strong>{el.name}</strong>
                </Grid>
                <Grid item md={3}>
                  {el.qqt}
                </Grid>
                <Grid item md={3}>
                  {el.price}
                </Grid>
                <Grid item md={3}>
                  <Button variant='contained' style={{backgroundColor:"red"}}>Delete</Button>
                </Grid>

                </Grid>
                </ListItem>
              ))
            }
          </List>
        </Grid>
        <Grid item md={6} style={{padding:"1rem"}}>
          <Input placeholder='Write your name' className='inputMakeAndOrder' fullWidth onChange={(e)=> setCustomerData({...customerData,name:e.target.value})}/>
          <Input placeholder='Write your name' className='inputMakeAndOrder' fullWidth onChange={(e)=> setCustomerData({...customerData,Adress1:e.target.value})}/>
          <Input placeholder='Write your name' className='inputMakeAndOrder' fullWidth onChange={(e)=> setCustomerData({...customerData,Address2:e.target.value})}/>
          <Input placeholder='Write your name' className='inputMakeAndOrder' fullWidth onChange={(e)=> setCustomerData({...customerData,PhoneNumber:e.target.value})}/>
          <Input placeholder='Write your name' className='inputMakeAndOrder' fullWidth onChange={(e)=> setCustomerData({...customerData,extraInfomation:e.target.value})}/>
          <Button variant='contained' style={{backgroundColor:"green",float:"right",marginTop:"1.5rem"}} onClick={handlerNewOrder}>Pay and Order</Button>
          </Grid>
      </Grid>
      <Dialog open={response} onClose={()=>setResponse(!response)}>
        <DialogTitle>Order Result</DialogTitle>
        <DialogContent>
          {responseFromServer}
        </DialogContent>
      </Dialog>
    </>
  )
}

import React,{useContext} from 'react'
import {FirestoreContext} from '../contex/GeneralFireStore'
import {Grid,Button} from "@mui/material"
export default function SeeProducts() {
  const {allProducts} = useContext(FirestoreContext)
  return (

    <Grid container spacing={2}>{
      allProducts.map((product)=>(
        <>
        <Grid item sx={2}>{product.name}</Grid>
        <Grid item sx={2}></Grid>
        <Grid item sx={2}></Grid>
        <Grid item sx={2}><Button>Modify</Button></Grid>
        <Grid item sx={2}><Button>Delete</Button></Grid>
        </>
      )
      )
    }
    </Grid>
  )
}

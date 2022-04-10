import React,{useContext,useState} from 'react'
import {FirestoreContext} from '../contex/GeneralFireStore'
import {Grid,Button,Dialog,DialogContent,DialogTitle,FormControl,Input,Box} from "@mui/material"
export default function SeeProducts() {
  const {allProducts,deleteProduct,modifyProduct} = useContext(FirestoreContext)
  const [dialog,setDialog] = useState(false)
  const [dataDialog,setDataDialog] = useState({})

  const hanlderModify = (data,id) =>{
    setDialog(!dialog)
    setDataDialog({...data,id})
   
    console.log(dataDialog.img)
  }
  const handleClose = () =>{
    console.log("im closing")
    setDialog(!dialog)
  }

  const handlerSaveUpdatedProduct = () =>{
    console.log("i will save this data")
    modifyProduct(dataDialog)
    console.log(dataDialog)

  }
  const handlerDelete =(id,imgUrl) =>{
    imgUrl = [...imgUrl]
    //console.log(imgUrl)
    const start = imgUrl.indexOf("%")
    //console.log(start)
    const end = imgUrl.indexOf("?")
    console.log(imgUrl.slice(start + 3,end).join(""))
    deleteProduct(id,imgUrl.slice(start + 3,end).join(""))
  }
  return (

    <Grid container spacing={2}>{
      allProducts.map(({data,id})=>(
        <>
        <Grid item sx={12} key={id}>
          <Grid container>
        <Grid item sx={2}>{data.name}</Grid>
        <Grid item sx={2}>{data.price}</Grid>
        <Grid item sx={2}><img src={data.img} width="100"/></Grid>
        <Grid item sx={2}><Button onClick={()=>hanlderModify(data,id)}>Modify</Button></Grid>
        <Grid item sx={2} onClick={()=>handlerDelete(id,data.img)}><Button>Delete</Button></Grid>
          </Grid>
        </Grid>
        </>
      )
      )
    }
    <Dialog open={dialog} onClose={handleClose}>
      <DialogTitle>Modify this Product</DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{m:"2rem"}}>
        <Input value={dataDialog.name} onChange={(e)=>setDataDialog({...dataDialog,name:e.target.value})}style={{padding:"0.5rem"}}/>
        </FormControl>
      <FormControl fullWidth>
        <Input value={dataDialog.price} onChange={(e)=> setDataDialog({...dataDialog,price:e.target.value})} style={{padding:"0.5rem"}}/>
        </FormControl>
      <FormControl fullWidth>
        <Input  type="file" style={{padding:"1rem"}} onChange={(e)=> setDataDialog({...dataDialog,newImg:e.target.files[0]})}/>
        </FormControl>
        <Box style={{display:"flex",justifyContent:"right",padding:"0.5rem"}}>
        <Button variant='contained'onClick={()=> handlerSaveUpdatedProduct()} >Save</Button>
        <Button variant='contained' style={{backgroundColor:"red"}} onClick={()=> setDialog(!dialog)}>Cancel</Button>
        </Box>
      </DialogContent>
    </Dialog>
    </Grid>
  )
}

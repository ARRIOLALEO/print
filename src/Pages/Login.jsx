import {useContext,useState} from 'react'
import {GeneralAuthContext} from '../contex/GeneralAuthContext'
import {Grid,FormControl,Input,Button} from '@mui/material'
import {Navigate} from 'react-router-dom'
import Header from '../components/commons/Header'



function Login(){
    const [seePassword,setSeePassword] = useState(false)
    const [loginInformation,setLoginInformation] = useState({})
    const {logignWithEmail,user} = useContext(GeneralAuthContext)
    const handlerLogin = () =>{
        logignWithEmail(loginInformation.email,loginInformation.password)
    }
    return(
        <>
        {!user?(
            <>
        <Header/>
        <Grid container spacing={2}>
            <Grid item sx={12}>
                <FormControl>
                    <Input placeholder='Write your email' onChange={(e)=> setLoginInformation({...loginInformation,email:e.target.value})}></Input>
                </FormControl>
            </Grid>
            <Grid item sx={12}>
                <FormControl>
                    <Input type={seePassword?"texrt":"password"} onChange={(e)=> setLoginInformation({...loginInformation,password:e.target.value})} placeholder='write your password'></Input> <Button onClick={()=>setSeePassword(!seePassword)}>see</Button>
                </FormControl>
            </Grid>
            <Grid item sx={12}>
                <FormControl>
                    <Button onClick={()=> handlerLogin()}> Login</Button>
                </FormControl>
            </Grid>
        </Grid>
        </>):(<Navigate to="/dashboard"/>)
}
        </>
    )
}

export default Login
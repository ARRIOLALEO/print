import {useState,useContext} from 'react'
import {CartContext } from '../../contex/GeneralCart'
import * as actions from '../../contex/actions'
function Product({id,data}){
    const [qqt,setQtt] = useState(0)
    const {dispacher} = useContext(CartContext)
    const handlerAddToCart = () =>{
        dispacher({type:actions.ADDTOCAR,payload:{...data,id:id,qqt:qqt}})
        setQtt(0)
    }
    return(
        <div>
            <h2>{data.name}</h2>
            <img src={data.img}  width="150px"/>
            <h3>{data.price}</h3>
             <button  onClick={()=>setQtt(prev => prev+ 1)}>+</button><span>{qqt}</span><button onClick={()=>setQtt(prev => prev+ 1)} >-</button><button onClick={()=> handlerAddToCart()}>Add To Card</button>
        </div>
    )
}
export  default Product
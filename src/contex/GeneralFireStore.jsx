import { createContext,useState,useEffect } from "react";
import {collection,addDoc,getDocs, doc,onSnapshot,deleteDoc,updateDoc} from 'firebase/firestore'
import * as firebaseApp from '../firebase/configFirebase'
import {ref,uploadBytesResumable,getDownloadURL,deleteObject,} from 'firebase/storage'
export const  FirestoreContext = createContext();

const refCollection = collection(firebaseApp.firestore,'products')

const FirestoreProvider = ({children}) =>{
    const [allProducts,setAllProducts] = useState([])

    // this function create my product 
    const addProduct = async(newProduct,image)=>{
        const refHosting = ref(firebaseApp.storage,`images/${image.name}`)
        const uploadImage = uploadBytesResumable(refHosting,image);
        uploadImage.on(
            'state_change',(snapshot)=>{
                const proggress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`you have upload the ${proggress} %`)
            },(err)=>{console.log(err.message)},()=>getDownloadURL(uploadImage.snapshot.ref).then((url)=> addDoc(refCollection,{...newProduct,img:url}))
        )
    }

    //  this function get the data from firestore and save it in my state
    const getAllProducts = async () =>{
        const productsFromFirestore = await getDocs(refCollection)
        console.log(productsFromFirestore)
        setAllProducts(productsFromFirestore.docs.map((product)=>({
            data:product.data(),
            id:product.id
        })))
    }
    useEffect(()=>{
        getAllProducts()
    },[])
    // this is an observer that check if there is new data on my database that is locaded on firestore

   
    
    //TODOS modify Products
    const modifyProduct = async (productNewInfo) =>{
        const doctReference = doc(firebaseApp.firestore,'products',productNewInfo.id)
        if(productNewInfo.newImg){
            console.log(productNewInfo.newImg)
            console.log("im getting a new image")
            let imgUrl = [...productNewInfo.img]
            const start = imgUrl.indexOf("%")
            const end = imgUrl.indexOf("?")
            delefeFileFromStorage(imgUrl.slice(start + 3,end).join(""))
            const reftoHosting = ref(firebaseApp.storage,`images/${productNewInfo.newImg.name}`)
            const uploadImage = uploadBytesResumable(reftoHosting,productNewInfo.newImg)
            uploadImage.on('state_changed',(snapshot)=>{},(err)=>{console.log(err.message)},()=>getDownloadURL(uploadImage.snapshot.ref).then((url)=>updateProduct(doctReference,url,productNewInfo)))
            
        }else{
            await updateDoc(doctReference,{...productNewInfo})
        }

    }
    const updateProduct = (reference,url,data) =>{
        data.img = url
        delete data.newImg
        console.log(data)
        updateDoc(reference,{...data})
    }
    //DELETE producs
    const deleteProduct =  async(id,imgDelete) => {
        //console.log(imgDelete)
        await deleteDoc(doc(firebaseApp.firestore,'products',id))
        delefeFileFromStorage(imgDelete)
      
    }
    // delete file from storage
    const delefeFileFromStorage = (file) =>{
        console.log(file)
        const refImage = ref(firebaseApp.storage,`images/${file}`)
        //console.log(refImage)
        deleteObject(refImage).then(()=>{}).catch((err)=>{console.log(err.message)})
         //deleteObject(ref(firebaseApp.storage,`images/${imgDelete}`).then(()=>{console.log("it was deleted")}).catch((err)=>{console.log(err.message)    }))
 
    }

    const data = {
        allProducts:allProducts,
        addProduct:addProduct,
        deleteProduct:deleteProduct,
        modifyProduct:modifyProduct
    }

    return(
        <FirestoreContext.Provider value={data}>
            {children}
        </FirestoreContext.Provider>
    )
}
export default FirestoreProvider

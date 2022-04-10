import React,{Suspense} from 'react'
import Header from '../components/commons/Header'
import Hero from '../components/commons/Hero'
import Loading from '../components/commons/Loading'
const AllProducts = React.lazy(()=> import('../components/Products/AllPRoducts'))


export default function Home() {

  return (
      <>
    <Header/>
    <Hero/>
    <Suspense fallback={<Loading/>}>
    <AllProducts/>
    </Suspense>
    </>
  )
}

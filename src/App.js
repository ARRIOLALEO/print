import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import './App.css';
import Dashboard from './Pages/Dashboard';
import CartProductList from './Pages/CartProductList';
import MakeAndOrder from './Pages/MakeAndOrder';
import Login from './Pages/Login'
import Orders from './Pages/Orders'
import AddProduct from './Pages/AddProduct'
import SeeProducts from './Pages/SeeProducts'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart-description' element={<CartProductList/>}/>
      <Route path="/make-the-oder" element={<MakeAndOrder/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}>
          <Route path="orders" element={<Orders/>}/>
          <Route path="add-product" element={<AddProduct/>}/>
          <Route path="see-produts" element={<SeeProducts/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;

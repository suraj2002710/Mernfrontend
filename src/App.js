// https://github.com/GreatStackDev/notes/blob/main/Deploy_MERN_on_VPS.md

import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Header from "./componant/Layout/Header/Header";
import "./App.css"
import Footer from "./componant/Layout/footer/Footer";
import Home from "./componant/Home/Home"; 
import { ProductDetails } from "./componant/Products/ProductDetails";
import ProductsPage from './componant/Products/ProductsPage';
import Search from './componant/Layout/SearchBar/Search';
import Forms from './Forms/Forms';
import { Userload_action } from './actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect  } from 'react';
import Profile from './componant/User/Profile';
import Forgotpassword_form from './Forms/Forgotpassword_form';
import { loadcartitem_action } from './actions/Cartaction';
import Addtocart from './componant/Cart/Addtocart';
import Shipinfo from './componant/Cart/Shipinfo';
import Orderconfirm from './componant/Cart/Orderconfirm';
import Payment from './componant/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Ordersuccess from './componant/Cart/Ordersuccess';
import MYorders from './componant/Cart/MYorders';
import Orderdetails from './componant/Cart/Orderdetails';
import AdminDashbord from './componant/admin/AdminDashbord';
import Adminproducts from './componant/admin/Adminproducts';
import AdminproductCreate from './componant/admin/AdminproductCreate';
import AdminproductUpdate from './componant/admin/AdminproductUpdate';
import AdminAll_users from './componant/admin/AdminAll_users';
import {Cookies} from "react-cookie"
function App() {
  const cookies=new Cookies()
  const dispatch=useDispatch()
let token=cookies.get('token')
console.log(token);
  const{isAuthenticate,isAdmin}=useSelector(state=>state.userDetails)
  console.log(isAdmin);
  useEffect(() => {
    if(token!==undefined){
      let tok=token?token:""
      dispatch(Userload_action(tok))
      dispatch(loadcartitem_action(tok))
    }
  }, [dispatch,token])
let public_key="pk_test_51M2a3KSFnmfMitW2MYyOJr3utR4pUldgDXoKc0HDyt3kSFIHNaqBA7gjQxeR9jP47ewxZP6tsAICgegX2BwNPrLJ00Yzj6cKbS"  
let stripes=loadStripe(public_key)
  return (
    <Router>
        <Header/> 
      <Routes>
        <Route exact path='/'  element={<Home/>}/>
        <Route exact path='/product/:id'  element={<ProductDetails/>}/>
        <Route exact path='/products' element={<ProductsPage/>}/>
        <Route exact path='/products/:key' element={<ProductsPage/>}/>
        <Route exact path='/search' element={<Search/>}/>
        <Route exact path='/login' element={<Forms/>}/>
        <Route exact path='/forgotpass/:token' element={<Forgotpassword_form/>}/>
        {isAuthenticate&& <Route exact path='/shipinginfo' element={<Shipinfo/>}/>}
        {isAuthenticate&&<Route exact path='/orderconfirm' element={<Orderconfirm/>}/>}
       {isAuthenticate&& <Route exact path='/profile' element={<Profile/>}/>}
       {isAuthenticate&&<Route exact path="/addtocart" element={<Addtocart/>}/>}
       {isAuthenticate&&<Route exact path="/process/payment" element={  
         <Elements stripe={stripes}>
      <Payment/>
       </Elements>
      }/>}
   {isAuthenticate&& <Route exact path='/success'  element={<Ordersuccess/>}/>}
    <Route exact path='/orders'  element={<MYorders/>}/>
   {isAuthenticate&& <Route exact path='/orders/:id'  element={<Orderdetails/>}/>}
   {isAuthenticate&&isAdmin===true&&<Route  path='/admin/dashbord'  element={<AdminDashbord/>}/>}
   {isAuthenticate&&isAdmin===true&&<Route  path='/admin/products'  element={<Adminproducts/>}/>  }
   {isAuthenticate&&isAdmin===true&&<Route  path='/admin/product/create'  element={<AdminproductCreate/>}/>  }
   {isAuthenticate&&isAdmin===true&&<Route  path='/admin/product/:id'  element={<AdminproductUpdate/>}/>  }
   {isAuthenticate&&isAdmin===true&&<Route  path='/admin/allusers'  element={<AdminAll_users/>}/>  }
      </Routes>
      <Footer/>
    </Router>
    );
}

export default App;

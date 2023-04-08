import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import "./AdminDashboard.css"

import {useSelector,useDispatch} from 'react-redux'
import { admin_products_action } from '../../actions/Productaction'
import Metadeta from '../Layout/Metadeta'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Layout/Loader/Loader'
import { baseurl } from '../../Baseurl'
import axios from 'axios'
import {Cookies} from "react-cookie"

const AdminDashbord = () => {
  const dispatch=useDispatch()
  const {product,errors,loading}=useSelector(state=>state.products)
  const {isAuthenticate,isAdmin}=useSelector(state=>state.userDetails)
  const cookies=new Cookies()
  let token=cookies.get("token")
  console.log(product);
const[users,setusers]=useState(null)  
const[order,setorder]=useState(null)  
  let price=0
  let outofstock=0
  let pro
   product && product.forEach(element => {
    pro=element.price+element.price
    if(element.stock===0){
      outofstock+=1
    }
  });
  console.log(price);
  
  useEffect(() => {  
    axios.get(`${baseurl}/admin/order?auth=${token}`).then((res)=>{
        console.log(res.data.data);
       setorder(res?.data?.data)
    }).catch((err)=>{
        console.log(err);
    })
}, [token])



  useEffect(() => {  
    axios.get(`${baseurl}/alluser?auth=${token}`).then((res)=>{
        console.log(res.data.data.length);
        setusers(res?.data?.data)
    }).catch((err)=>{
        console.log(err);
    })
}, [token])
console.log(order);
 
  useEffect(() => {
    if(isAuthenticate===true && isAdmin===true){
      dispatch(admin_products_action())
    }
    if(errors){
      toast.error(errors)
    }
  }, [dispatch,isAuthenticate,isAdmin,errors])
  let orderprice
  order && order.map((h1)=>{
    console.log(h1.totalprice+h1.totalprice);
    orderprice=h1.totalprice+h1.totalprice
  })
  let profit=orderprice-pro
  return (
    <>  
    {loading   ? <Loader/>:
    (
<>
    <Metadeta title={"AdminDashborad"} />
      <div className="dashbord">
        <Sidebar />
        <div className="chart">
          <div className="totusers rol">
            <h3>Total Users</h3>
          <p>{users && users?.length}</p>

          </div>
            <div className="instock rol">
              <h3>InStock</h3>
              <p>{product && product.length-outofstock}</p>
            </div>

            <div className="outofstock rol">
              <h3>OutofStock</h3>
              <p>{outofstock}</p>
            </div>
          <div className="totprofit rol">
            <h3>Profit</h3>
            <p>{profit}</p>
          </div>
          <div className="totorders rol">
            <h3>Total Orders</h3>
          <p>{order && order?.length}</p>

          </div>
        </div>
      </div>
</>
)
}
<ToastContainer/>
    </>
  )
}

export default AdminDashbord
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {  orderdetails_action } from '../../actions/OrderAction'
import Loader from '../Layout/Loader/Loader'
import "./Orderdetail.css"
import { Cookies } from 'react-cookie'
import { clearerrors } from '../../actions/Productaction'
const Orderdetails = () => {
    const cookie=new Cookies()
    let token=cookie.get("token")
    const dispatch=useDispatch()
    const {id}=useParams()
    const { user } = useSelector(state => state.userDetails)

    const {error,loading,order}=useSelector(state=>state.oderdetails)
    console.log(order);
    useEffect(() => {
      if(error){
        alert(error)
        dispatch(clearerrors())
      }
      dispatch(orderdetails_action(id,token))
    }, [dispatch,error,id,token])
    const shipinfo=order&&order.shipinginfo
    const cart=order&&order.orderItems
  return (
      <>
    {loading?(<Loader/>):(
        <>
           {order.shipinginfo&&
        <div className="allinfos">
        <div className="shipinginformation">
     <h3>Shiping Info</h3>
            <div className="name">
                <p>Name</p>:<span>{user.data && user?.data?.data?.name}</span>
            </div>

            <div>
                <p>Phone</p>:<span>{shipinfo.phoneNo}</span>
            </div>
            <div className='address'>
                <p>Address :</p><span>{shipinfo.address},</span>{" "}
                <span>{shipinfo.city},</span>{" "}
                <span>{shipinfo.pincode},</span>{" "}
                <span>{shipinfo.state},</span>{" "}
                <span>{shipinfo.country}</span>
            </div>
    </div>
    <div className="paymentinfo">
        <h3>Payment</h3>
        <p>PAID</p>
        <p className='amt'>Amount :</p><span>{order&&order.totalprice}</span>
    </div>
    <div className="orderstauts">
        <h3>Order Status</h3>
        <p>{order&&order.orderstatus}</p>
    </div>
    <div className="cartitems">
            <h3>Order Items</h3>
            {cart && cart.map((item) => {
                return (
                    <>
                        <div className='items'>

                            <div className="img">
                                <img src={item.image} alt="" />
                            </div>
                            <div className='product_info' >
                                <div id='prod-1'>
                                    <h3>{item.name}</h3>
                                </div>
                            </div>
                            <div id='price'>
                                <p>{item.price + "X" + item.quantity}</p>=  <p>${item.price * item.quantity}</p>
                            </div>
                        </div>
                    </>
                )

            })}
        </div>
</div>    
}
        </>
        )}
        </>
    
  )
}

export default Orderdetails
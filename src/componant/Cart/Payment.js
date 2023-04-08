import React, { useEffect, useRef } from 'react'
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from "@stripe/react-stripe-js"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';
import Metadeta from '../Layout/Metadeta';
import Checkoutsteps from './Checkoutsteps';
import { Typography } from '@mui/material';
import "./Paymetn.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearerrors, ordercreate_action } from '../../actions/OrderAction';
import {Cookies} from "react-cookie"
import { baseurl } from '../../Baseurl';
const Payment = () => {
   const paybtn= useRef(null)
   const cookies=new Cookies()
   let token=cookies.get("token")
   const dispatch=useDispatch()
   const stripe=useStripe()
   const element=useElements()
  const navigate= useNavigate()
   const { user } = useSelector(state => state.userDetails)
   const { cart } = useSelector(state => state.cart)
const {error}=useSelector(state=>state.orders)
    const ordereinfo=JSON.parse(sessionStorage.getItem("orderitem"))
    const shipinginfo = JSON.parse(sessionStorage.getItem("shipinginfo"))
    const paymentdata={
        amount:Math.round(ordereinfo.total*100)
    }
    const order_data={
        shipinginfo,
        orderItems:cart,
        itemprice:ordereinfo.subtotal,
        totalprice:ordereinfo.total,
        shippingprice:ordereinfo.deliviry,
        taxprice:ordereinfo.gst
    }

    const paymenthandler=async(e)=>{
        e.preventDefault()
        paybtn.current.disabled=true
        try {
            const config = {
                headers:{"Access-Control-Allow-Origin": "http://localhost:3333/",
                "Content-Type": "application/json"

            },
                withCredentials: true,
                credentials: 'same-origin'
            }
            const {data}= await axios.post(`${baseurl}/proceess/payment?auth=${token}`,paymentdata,config)
            const client_screte=data.client_secret
            console.log(data);

            if(!stripe || !element)return
                const result=await stripe.confirmCardPayment(client_screte,{
                    payment_method:{
                        card:element.getElement(CardNumberElement),
                        billing_details:{
                            name:user.data && user?.data?.data?.name,
                            email:user.data && user?.data?.data?.email,
                            address:{
                                line1:shipinginfo.address,
                                city:shipinginfo.city,
                                state:shipinginfo.state,
                                postal_code:shipinginfo.pincode,
                                country:shipinginfo.country,
                            }
                        }
                    }
                })
                console.log(result
                    );
if(result.error){
    paybtn.current.disabled=false
    alert(result.error.message)
}
else{
    if(result.paymentIntent.status==="succeeded"){
        order_data.paymentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status
        }
        dispatch(ordercreate_action(order_data,token))
        navigate("/success")
    }else{
        alert("there the some issue while proccesing payment")
    }
}
                
        } catch (error) {
            console.log(error);
            paybtn.current.disabled=false
            alert(error)
        }
    }
    useEffect(() => {
      if(error){
        alert(error)
        dispatch({
            type:clearerrors
        })
      }
    }, [dispatch,error])
    
  return (
    <>
    <Metadeta title={"Payment Process"}/>
    <Checkoutsteps activeStep={2}/>
    <div className="paymentcontainer">
        <form onClick={paymenthandler} className='paymentform' action="">
        <Typography>Card Info</Typography>
            <div className='ele'>
                <CreditCardIcon/>
                <CardNumberElement className='paymentInput'/>
            </div>
            <div className='cvcele'>
                <EventIcon/>
                <CardCvcElement className='paymentInput'/>
            </div>
            <div className='exp'>
                <VpnKeyIcon/>
                <CardExpiryElement className='paymentInput'/>
            </div>
            <input className='paymentbtn' ref={paybtn} type="submit" value={`Pay ${ordereinfo&&ordereinfo.total}`} />
        </form>
    </div>
    </>
    )
}

export default Payment
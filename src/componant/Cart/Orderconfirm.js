import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Checkoutsteps from './Checkoutsteps';
import "./Orderconfirm.css"

const Orderconfirm = () => {
    const { cart } = useSelector(state => state.cart)
    const navigate=useNavigate()
    const { user } = useSelector(state => state.userDetails)
    const shipinfo = JSON.parse(sessionStorage.getItem("shipinginfo"))
    console.log(shipinfo);
    console.log(cart);
    const subtotal = cart.reduce((it, it1) => {
        return it + it1.price * it1.quantity
    }, 0)
    console.log(subtotal);

    const deliviry = subtotal * 1 / 100
    const gst = (subtotal + deliviry) * 12 / 100
    const total = Math.round(subtotal + deliviry + gst)

    const orderconfirm=()=>{
        console.log("suraj");
        const data={
            subtotal,
            deliviry,
            gst,
            total
        }
        sessionStorage.setItem("orderitem",JSON.stringify(data))
        navigate("/process/payment")
    }
    return (
        <>
        <Checkoutsteps activeStep={1}/>

            <div className="orders">
                <div className="allinfo">
                    <div className="shipinginformation">
                        <h3>Shiping Info</h3>
                        <div className="name">
                            <p>Name</p>:<span>{user.data && user?.data?.data?.name}</span>
                        </div>

                        <div>
                            <p>Phone</p>:<span>{shipinfo.phoneNo}</span>
                        </div>
                        <div className='address'>
                            <p>Address</p>:<span>{shipinfo.address},</span>
                            <span>{shipinfo.city},</span>
                            <span>{shipinfo.pincode},</span>
                            <span>{shipinfo.state},</span>
                            <span>{shipinfo.country},</span>
                        </div>

                    </div>
                    <div className="cartitems">
                        <h3>Your Cart Items</h3>
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
                <div className="ordersummary">
                            <h3>Order Summary</h3>
                    <div className="subtotal">
                        <p>Subtotal :</p><p>{subtotal}</p></div>
                    <div className="shipcharge">
                        <p>Delivery :</p><p>{deliviry}</p></div>
                    <div className="gst">
                        <p>GST :</p><p>{gst}</p>
                    </div>
                    <div className="total">
                        <p>Total :</p><p>{total}</p>
                    </div>
                    <div className='ordbtn'>
                        <button className='ordbtn' onClick={orderconfirm}>Procceds to payment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orderconfirm
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadcartitem_action, removeitem, updatequantity_action } from '../../actions/Cartaction'
import Loader from '../Layout/Loader/Loader'
import Metadeta from '../Layout/Metadeta'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import "./Addtocart.css"
import {Cookies} from "react-cookie"
const Addtocart = () => {
    const cookies=new Cookies()
    let token=cookies.get("token")
    console.log(cookies.get("token"));
    const navigate = useNavigate()
    const { cart, loading } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const inresequantity = (id, quantity, stock) => {
        let qty = quantity + 1
        if (qty > stock) {
            return
        }
        console.log(qty);
        dispatch(updatequantity_action(id, qty))
        //  navigate("/addtocart")
    }
    const decresequantity = (id, quantity) => {
        let qty = quantity - 1

        if (qty <= 0) {
            return
        }
        console.log(qty);
        dispatch(updatequantity_action(id, qty))
    }
    console.log("cart", cart);
    useEffect(() => {
        dispatch(loadcartitem_action(token))
    }, [dispatch,token])
    console.log(cart);
    let tot = cart.reduce((totalValue, currValue) => {
        return totalValue + currValue.price*currValue.quantity;
    }, 0)
    console.log(tot);
    const checkout=()=>{
        navigate('/shipinginfo')
    }
    return (
        <>
        <Metadeta title={"cart"}/>
            {loading ? <Loader /> :
                <>
                        {cart[0]?(
                            <>
                    <div className='maincart'>
                        <div className="allitem">
                                {cart[0] && cart.map((item) => {
                                 
                                    console.log(item);
                                    return (
                                        <div className="allitems">
                                            <div className="img">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="iteminfo">
                                                <div className='product_info' >
                                                    <div id='prod-1'>
                                                        <h3>{item.name}</h3>
                                                        <p id='p-id'>product # {item.id}</p>
                                                    </div>
                                                </div>
                                                <div id='price'>
                                                    <p>${item.price * item.quantity}</p>
                                                </div>
                                                <div id='stock'>
                                                    <p>Status:</p>
                                                    <b className={item.stock >= 1 ? 'greenclass' : 'redclass'}>
                                                        {item.stock >= 1 ? 'inStock' : 'outOfStock'}
                                                    </b>
                                                </div>

                                                <div className='addtocart-1'>
                                                    <div id='addtocart'>
                                                        <button onClick={() => decresequantity(item.id, item.quantity)}>-</button>
                                                        <input type="text" value={item.quantity} readOnly />
                                                        <button onClick={() => inresequantity(item.id, item.quantity, item.stock)}>+</button>
                                                    </div>
                                                    <div className="remove_btn">
                                                        <button onClick={() => dispatch(removeitem(item.id,token))}>remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className="payment">
                            <h3 className='heading'>Order Summary</h3>
                            <div className="subtot">
                                <p>subtotal</p>
                                <p>{tot}</p>
                            </div>
                            <div className="subtot">
                                <p>Total</p>
                                <p>{tot}</p>
                            </div>
                            <div className="checkout">
                                <button onClick={checkout}>CheckOut</button>
                            </div>
                        </div>
                    </div>
                    </>):<>
<div className="nocart">
<RemoveShoppingCartIcon className='removecart'/>
<p className='nocartheading'>No Cart Items</p>
</div>
</>
}

                </>
            }
        </>
    )
}

export default Addtocart
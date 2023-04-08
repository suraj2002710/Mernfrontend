import React, { useEffect, useState } from 'react'
import Carousel  from 'react-material-ui-carousel'
import {useDispatch,useSelector } from 'react-redux'
import {getProductDetails, review_action} from '../../actions/Productaction'
import {useParams} from 'react-router-dom'
import Metadeta from '../Layout/Metadeta'
import './ProductDetails.css'
import Loader from '../Layout/Loader/Loader'
import ReviewCard from './ReviewCard'
import {Dialog,DialogActions,DialogContent,DialogTitle,Button, Rating} from "@mui/material"
import { addcartactions} from "../../actions/Cartaction"
import { REVIEW_CREATE_RESET } from '../../constant/productconstant'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Cookies} from "react-cookie"

export const ProductDetails = () => {
    const {id}=useParams()
    const cookies=new Cookies()
    let token=cookies.get("token")
    const [open, setopen] = useState(false)
    const [rating,setRating]=useState("")
    const [comment,setComment]=useState("")
    const{product,error,loading}=useSelector(state=>state.productDetails)
    const{isAuthenticate}=useSelector(state=>state.userDetails)
        const {error:review_err}=useSelector(state=>state.reviewcreate)
    const [quantity, setquantity] = useState(1)
   const dispatch= useDispatch()
   function increse() {
  quantity<product.stock?setquantity(quantity+1):setquantity(quantity)
   }

   function decrese() {
   quantity>0?setquantity(quantity-1):setquantity(0)
   }
   function addtocart() {
    if(isAuthenticate){
        if(quantity>0){
            dispatch(addcartactions(product._id,quantity,token))
            toast.success('Product added to cart')
        }
        else{
            toast.info('quantity is more than 0')

        }
    }
    else{
alert("please login")
    }
    // dispatch(loadcartitems_action())
}

const review_create=()=>{
    let reviewdata={
        productid:id,
        rating:rating,
        comment:comment
    }
    dispatch(review_action(reviewdata,token))
    setopen(false)
    dispatch(getProductDetails(id))
}

const submitreview=()=>{
if(open){
    setopen(false)
}
else{
    setopen(true)
}
}

   useEffect(() => {
    if(error){
        alert(error)
        console.log(error);
    }
    if(review_err){
        alert(review_err)
        dispatch({
            type:REVIEW_CREATE_RESET
        })
    }
     dispatch(getProductDetails(id))
   }, [dispatch,id,error,review_err])
   
//    console.log(product);
    // setdata(product.image)
    console.log(product.image);
  
   let rval=product.ratings
console.log(rval);
let options={
    edit:false,
    color:"rgba(23,25,25,0.4)",
    isHalf:true,
    size:window.innerWidth<600? 25:20,
    value:product.rating
}
console.log(options.value);

  return (
    <>
    {loading?<Loader/>:<>
     <Metadeta title={`${product.name}`}/>

        <div className="productdetails">
            <>
                <div className='prod_img'>

                    <Carousel>
                    {
                        product.image && product.image.map((item)=>{
                            return(
                            <img src={item.url} alt="product" srcset="" />
                        
                        )
                    })
                }
                </Carousel>
                </div>
                </>
                    
                    <div className='product_info'>
                    <div id='prod-1'>
                    <h3>{product.name}</h3>
                    <p id='p-id'>product # {product._id}</p>
                    </div>

                    {/* <div id='prod-2'>
                    </div> */}

                    <div id='ratings'>  
                    <Rating size='large'  precision={0.5} value={product.ratings} readOnly/><span>({product.numofreview}Reviews)</span>
                    </div>
                    <div id='price'>
                        <p>${product.price}</p>    
                    </div>
                    <div className='addtocart-1'>
                    <div id='addtocart'>
                    <button onClick={decrese}>-</button>
                    <input type="text" value={quantity}/>
                    <button onClick={increse}>+</button>
                    </div>
                    <button disabled={product.stock<1?true:false} className='btn' onClick={addtocart}>Add to Cart</button>
                    </div>
                    <div id='stock'>
                        <p>Status:</p>
                    <b className={product.stock>=1?'greenclass':'redclass'}>
                    {product.stock>=1?'inStock':'outOfStock'}
                    </b>
                    </div>
                    <div className='description'>
                    Description:<p>{product.description}</p>
                    </div>
                    
                    <button onClick={submitreview} className='submitreview'>Submit Review</button>
                    </div>
        </div>
        <h3 className='reviewheading'>Reviews</h3>
        <Dialog
        aria-labelledby='simple-dialog-title'
        open={open}
        onClose={submitreview}
        >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitdialog'>
                <Rating
                onChange={(e)=>setRating(e.target.value)}
                value={rating}
                size="large"
                precision={0.5}
                />
                <textarea
                className='submitdialogtextarea'
                cols="30"
                rows="5"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                >

                </textarea>
            </DialogContent>
            <DialogActions>
                <Button onClick={submitreview} color="secondary">Cancle</Button>
                <Button color="primary" onClick={review_create}>Submit</Button>
            </DialogActions>
        </Dialog>
        <div className='reviewcards'>
        {product.reviews&&product.reviews.map((item)=>{
            console.log("reviews",item);
            return    <ReviewCard reviews={item}/>
        })}
        </div>
    </>}
    <ToastContainer/>
    </>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
const Product = (product) => {
    // console.log("gdgdg",product.product);
    const option={
        edit:false,
        isHalf:true,
        color:"rgba(23,23,23,0.4)",
        size:window.innerWidth>600? 20:25,
        value:product.product.ratings  
    }
    console.log(product.product.image);
  return (
    <Link className='productcard' to={`/product/${product.product._id}`}>
        <div className='imgcls'>
        <img src={product?.product?.image[0]?.url} alt={product.product.name}/>
        </div>
        <p>{product.product.name}</p>
        <div>
            <ReactStars {...option}/><span>{product.product.numofreview}</span>
        </div>
        <span>
                {product.product.price}
        </span>
    </Link>
    )
}

export default Product
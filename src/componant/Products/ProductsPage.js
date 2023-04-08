import { Pagination, Typography } from '@mui/material'
import Slider from '@mui/material/Slider';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getproducts } from '../../actions/Productaction'
import Product from '../Home/Product'
import Loader from '../Layout/Loader/Loader'
import './ProductPage.css'
const ProductsPage = () => {
    const location=useLocation()
    const searchquery=new URLSearchParams(location.search)
    const q=searchquery.get('page')?searchquery.get('page'):1
    const [page, setpage] = useState(parseInt(q))
    const dispatch = useDispatch()
    const { key } = useParams()
    const navigate=useNavigate()
    const [price, setprice] = useState([0,25000])
    const [calsss, setcalss] = useState("category-list-close")
    let categories=[
        "laptop",
        "mobile",
        "t-shirt",
        "pants",
        "shirts",
        "shoes",
        "lower",
        "sleeper"
    ]

    const sendquery=(val)=>{
        navigate({
            pathname:'/products',
            search:`?page=${val}`
        })
    }
    const [passcate,setpasscate]=useState("")

    const { loading, error, product, resultpage, productCount } = useSelector(state => state.products)
    useEffect(() => {
        if (error) {
            alert(error)
        }
        dispatch(getproducts(page, key,price[0],price[1],passcate))
    }, [dispatch, page, key,price,passcate,error])
    console.log("key", key);
    
    console.log(passcate);
    let count = productCount / resultpage
    let counts = Math.ceil(count)
    return (
        <>
        <h3 className='productheading'>Products</h3>
            {loading ? <Loader/> :
                <>
                    <div className="container">

                        {product && product.map((product) =>
                            // console.log(product)

                            <Product product={product} />
                        )}
                    </div>
            
                <h3 className='categoryheading'  onClick={()=>calsss==="category-list-close"?setcalss("category-list-open"):setcalss('category-list-close')}>Category</h3>
                
            <div className='category'>
            {categories.map((item)=>{
                return(<>
                <div className={calsss}>
                    <ul>
                        <li onClick={()=>setpasscate(item)}>{item}</li>
                    </ul>
                </div>
                </>
                )
            })}
            </div>
            <div className='filter-box'>
                <Typography color={"tomato"}>Price</Typography>
                <Slider
                    aria-labelledby='range-slider'
                    value={price}
                    onChange={(e, v) => setprice(v)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={25000}
                />
            </div>
            <div className="pagination_bar">
                {q}
                {page &&
                <Pagination
                    count={counts}
                    page={page}
                    onChange={(e, val) => {
                        sendquery(val)
                        setpage(val)}}
                    color='success'
                    
                    showLastButton
                    showFirstButton
                />}
            </div>
            </>

}
        </>
    )
}

export default ProductsPage
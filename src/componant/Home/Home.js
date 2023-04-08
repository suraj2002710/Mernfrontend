import {React,useEffect} from 'react'
import {CgMouse} from 'react-icons/cg'
import './Home.css';
import Product from './Product';
import Metadeta from '../Layout/Metadeta';
import { clearerrors, getproducts } from '../../actions/Productaction';
import{useSelector,useDispatch} from "react-redux"
import Loader from '../Layout/Loader/Loader';


const Home = () => {
  const{error,product,loading}=useSelector(state=>state.products)
    const {isAuthenticate}=useSelector(state=>state.userDetails)
  const dispatch=useDispatch()

  useEffect(() => {
    console.log("suraj",error);
    if(error){
      //  toast.error("server error")
      alert("Server error")
      dispatch(clearerrors())
      //  console.log("dfgg");
    }
    
    
    dispatch(getproducts())
  }, [dispatch,error,isAuthenticate])
  
  console.log(product);
  return (
    <>
    {loading? (<Loader/>):<>
    <Metadeta title={"Ecommerce"}/>
        <div className="home">
            <h1>welcome to mycart </h1>
            <p>find amazing products </p>

            <a hidden href="#con">
                <button>
                    scrol <CgMouse/>
                </button>
            </a>
        </div>
        <h2 className='products' id='con'>products</h2>
        <div className="container">
        {product && product.map((product)=>
          <Product product={product}/>)}
        </div>
    </>}
    
    </>
  )
}

export default Home
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { admin_products_create, getProductDetails } from '../../actions/Productaction'
import profile from "../../images/profile.jpg"
import "./AdminproductCreate.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cookies } from 'react-cookie'
const AdminproductCreate = () => {
    const createbtn=useRef(null)
    const cookies=new Cookies()
    let token=cookies.get("token")
    const dispatch=useDispatch()
    const {error,success}=useSelector(state=>state.product_create)
    console.log(success);
    const {id}=useParams()
    const [prdouctdata, setprdouctdata] = useState({
        name:"",
        description:"",
        stock:0,
        price:"",
        category:""
    })
    const {product}=useSelector(state=>state.productDetails)
    console.log(product);
    const navigate=useNavigate()
    const [images,setimages] = useState([])
    let categories=[
        "Select Category",
        "laptop",
        "mobile",
        "t-shirt",
        "pants",
        "shirts",
        "shoes",
        "lower",
        "sleeper"
    ]
    const [imgpreview,setimgpreview]=useState([])
    let imgarr=[]
function imgconvert(img) {
    console.log(img);
    for (let i = 0; i < img.length; i++) {
        const ele = img[i];
        
        const reader=new FileReader()
        reader.onload=()=>{
            console.log(reader.result);
            imgarr.push(reader.result)
            setimgpreview([...imgarr])
        }
        console.log(imgarr);
        // setimgpreview(imgarr)
        reader.readAsDataURL(ele)
    }
    console.log(imgpreview);
}
   const handlechange=(e)=>{
       let imge=e.target.files
       console.log("imge",typeof(imge));
            imgconvert(imge)
            setimages([...imge])
   }
   useEffect(() => {
     if(error){
        createbtn.current.disabled=false

        toast.error(error)
     }
     if(success===true){
         navigate("/admin/products")
        }
       
dispatch(getProductDetails(id))
    }, [dispatch,error,success,navigate,id])
    
    const productSubmit=(e)=>{
        e.preventDefault()
        if(prdouctdata.price<1 || prdouctdata.name==="" || prdouctdata.description==="" || prdouctdata.stock<0){
            toast.info("all field are filled")
        }
        else{
            createbtn.current.disabled=false
            const formdata=new FormData()
            formdata.set('name',prdouctdata.name)
            formdata.set('description',prdouctdata.description)
            formdata.set('stock',prdouctdata.stock)
            formdata.set('price',prdouctdata.price)
            formdata.set('category',prdouctdata.category)
            // let images=prdouctdata.image
            images.forEach((img)=>{
                formdata.append('image',img)
            })
            console.log(prdouctdata);
            console.log(images);
            dispatch(admin_products_create(formdata,token))
        }
   }
  return (
        <>
            
         <p className='productheading'>Product Create</p>
                    <form className='productform' onSubmit={productSubmit} encType="multipart/form-data">
                    <input type="text" name='name' value={prdouctdata.name} placeholder='Enter productName'
                        onChange={(e)=>setprdouctdata({...prdouctdata, name:e.target.value})}
                    />
                                <select
                                onChange={(e)=>setprdouctdata({...prdouctdata,category:e.target.value})}
                                >
                                {
                                    categories&&categories.map((it)=>{
                                        return(
                                            <option value={it}>{it}</option>
                                        )
                                    })
                                }
                                </select>
                            
                            <input type="text" name="text" value={prdouctdata.stock} placeholder='Enter 
                            Stock'
                            onChange={(e)=>setprdouctdata({...prdouctdata,stock:e.target.value})}
                            />
                            <input type="text" name="text" value={prdouctdata.price} placeholder='Enter 
                            Price'
                            onChange={(e)=>setprdouctdata({...prdouctdata,price:e.target.value})}
                            />
                            <textarea name="" id="" value={prdouctdata.description} placeholder='Enter Description' cols="30" rows="10" onChange={(e)=>setprdouctdata({...prdouctdata,description :e.target.value})}/>
                        <div className='img_container'>
                            <div className='images'>
                                {imgpreview.length?(
                                imgpreview.map((it)=>{
                                    return(
                                        <img src={it} alt="sfadf"/>
                                        )
                                    })):
                                 (<img src={profile} alt="sfadf"/>)
                                }
                            </div>
                        <label for='file'>Choose files</label>
                            <input  id='file' multiple accept='image/*' name='image' type="file" onChange={handlechange}/>
                        </div>

                            <button ref={createbtn} type='submit'>Product Create</button>
                        </form>
 
<ToastContainer/>
        </>
    )
}

export default AdminproductCreate
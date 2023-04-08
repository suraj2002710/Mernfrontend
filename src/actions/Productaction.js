import{ALL_PRODUCT_REQUEST,ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,CLEAR_ERROR, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_SUCCESS, REVIEW_CREATE_FAIL, ADMIN_GETPRODUCT_REQUEST, ADMIN_GETPRODUCT_SUCCESS, ADMIN_GETPRODUCT_FAIL, ADMIN_CREATEPRODUCT_REQUEST, ADMIN_CREATEPRODUCT_SUCCESS, ADMIN_CREATEPRODUCT_FAIL, ADMIN_updatePRODUCT_REQUEST, ADMIN_updatePRODUCT_SUCCESS, PRODUCTDELETE_REQUEST, PRODUCTDELETE_SUCCESS, PRODUCTDELETE_FAIL, Clearproduct} from "../constant/productconstant"
import axios from 'axios';
import { baseurl } from "../Baseurl";

export const getproducts=(page=1,name="",gte="",lte="",cate="")=>async(dispatch)=>{
    console.log("action",cate);
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });
        let link=`${baseurl}/product?key=${name}&gte=${gte}&lte=${lte}&cate=${cate}&page=${page}`
    //   const data=  await axios.get(`http://localhost:3333/api/product?page=${page}`)
    const data=  await axios.get(link)
console.log("data",data);
      dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data
      })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error
        })
        console.log(error);
    }
}

export const getProductDetails=(id)=>async(dispatch)=>{
    try{
    dispatch({type:PRODUCT_DETAILS_REQUEST})
    const data=await axios.get(`${baseurl}/productdetails/${id}`)
    dispatch({type:PRODUCT_DETAILS_SUCCESS,
    payload:data
    })

    }
    catch(error){

        dispatch({type:PRODUCT_DETAILS_FAIL,
            error:"error"
        })
    }
}
 

//clear error
export const clearerrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERROR})
}

export const review_action=(reviewdata,token)=>async(dispatch)=>{
    try{dispatch({type:REVIEW_CREATE_REQUEST})
    const config={
        headers:{
            "Access-Control-Allow-Origin":`${baseurl}`,
            "content-type":"application/json"
        },
        withCredentials:true,
        credential:"same-origin",
    }
    const data=await axios.put(`${baseurl}/review?auth=${token}`,reviewdata,config)
    console.log(data);
    dispatch({type:REVIEW_CREATE_SUCCESS,
        payload:data
    })}
    catch(error){
        console.log(error);
        dispatch({
            type:REVIEW_CREATE_FAIL,
            error:error
        })
    }
}

export const admin_products_action=()=>async(dispatch)=>{
    try{dispatch({type:ADMIN_GETPRODUCT_REQUEST})
    
    const data=await axios.get(`${baseurl}/admin/product`)
    console.log(data);
    dispatch({type:ADMIN_GETPRODUCT_SUCCESS,
        payload:data
    })}
    catch(error){
        console.log(error);
        dispatch({
            type:ADMIN_GETPRODUCT_FAIL,
            error:error
        })
    }
}

export const admin_products_create=(productdata,token)=>async(dispatch)=>{
    try{dispatch({type:ADMIN_CREATEPRODUCT_REQUEST})
    const config={
        headers:{"Access-Control-Allow-Origin": `${baseurl}`,
        "content-type": "multipart/form-data"
    },
      withCredentials: true,

    }
    const data=await axios.post(`${baseurl}/product/new?auth=${token}`,productdata,config)
    console.log(data);
    dispatch({type:ADMIN_CREATEPRODUCT_SUCCESS,
        payload:data
    })}
    catch(error){
        console.log(error);
        dispatch({
            type:ADMIN_CREATEPRODUCT_FAIL,
            error:error
        })
    }
}


export const admin_productupdate_action=(productdata,id,token)=>async(dispatch)=>{
    try{dispatch({type:ADMIN_updatePRODUCT_REQUEST})
    const config={
        headers:{"Access-Control-Allow-Origin": `${baseurl}`,
        "content-type": "multipart/form-data"
    },
      withCredentials: true,
        credentials: 'include'
    }
    const data=await axios.put(`${baseurl}/product/${id}?auth=${token}`,productdata,config)
    console.log(data);
    dispatch({type:ADMIN_updatePRODUCT_SUCCESS,
        payload:data
    })}
    catch(error){
        console.log(error);
        dispatch({
            type:ADMIN_GETPRODUCT_FAIL,
            error:error
        })
    }
}

export const productdelete_action=(id,token)=>async(dispatch)=>{
    try{dispatch({type:PRODUCTDELETE_REQUEST})
    const config={
        headers:{"Access-Control-Allow-Origin": `${baseurl}`,
        "content-type": "multipart/form-data"
    },
      withCredentials: true,
        credentials: 'include'
    }
    const data=await axios.delete(`${baseurl}/product/${id}?auth=${token}`,config)
    console.log(data);
    dispatch({type:PRODUCTDELETE_SUCCESS,
        payload:data
    })}
    catch(error){
        console.log(error);
        dispatch({
            type:PRODUCTDELETE_FAIL,
            error:error
        })
    }
}

export const productclear_action=()=>(dispatch)=>{    
    dispatch({type:Clearproduct})
}
import {
     ADDTOCARTITEM_RESPONSE, ADDTOCARTITEM_REQUEST, ADDTOCARTITEM_FAILD, LOADCARTITEMS_REQUEST, LOADCARTITEMS_RESPONSE, LOADCARTITEMS_FAILD, UPDATEQUANTITY_REQUEST, UPDATEQUANTITY_RESPONSE, UPDATEQUANTITY_FAILD, REMOVECARTITEMS_REQUEST, REMOVECARTITEMS_RESPONSE, REMOVECARTITEMS_FAILD
} from "../constant/Cartconstant"
import axios from "axios"
import { baseurl } from "../Baseurl";




export const addcartactions = (id, quantity,token) => async (dispatch) => {
    dispatch({
        type: ADDTOCARTITEM_REQUEST,

    })
    try {
        console.log(id);
        const data = await axios.get(`${baseurl}/productdetails/${id}`)
        console.log(data, quantity);
        let iteminfo = {
            id: data.data.product._id,
            name: data.data.product.name,
            price: data.data.product.price,
            image: data.data.product.image[0].url,
            stock: data.data.product.stock,
            quantity: quantity
        }
        const config = {
            headers: {
                "Access-Control-Allow-Origin": `${baseurl}`,
                "Content-Type": "application/json"
            },
            withCredentials: true,
            
        };
        console.log(token
            );
        const adddata = await axios.post(`${baseurl}/addtocart?auth=${token}`, iteminfo, config)
        console.log(adddata);
        dispatch({
            type: ADDTOCARTITEM_RESPONSE,
            payload: adddata
        })
    }
    catch (err) {
        dispatch({
            type: ADDTOCARTITEM_FAILD,
            error: err
        })
    }
}



export const loadcartitem_action = (token) => async (dispatch) => {
    console.log("suraj");
    dispatch({
        type: LOADCARTITEMS_REQUEST,

    })
    try {

        
        const adddata = await axios.get(`${baseurl}/loaditem?auth=${token}`)
        dispatch({
            type: LOADCARTITEMS_RESPONSE,
            payload: adddata
        })
    }
    catch (err) {
        dispatch({
            type: LOADCARTITEMS_FAILD,
            error: err
        })
    }
}


export const updatequantity_action = (id, quantity) => async (dispatch) => {
    console.log("suraj");
    dispatch({
        type: UPDATEQUANTITY_REQUEST,

    })
    try {
        console.log(id);

        const config = {
            headers: {
                "Access-Control-Allow-Origin": baseurl,
                "Content-Type": "application/json"
            },
            withCredentials: true,
            
        };
        const adddata = await axios.put(`${baseurl}/updateitem/?id=${id}&qty=${quantity}`, config)
        console.log(adddata);
        dispatch({
            type: UPDATEQUANTITY_RESPONSE,
            payload: adddata
        })
    }
    catch (err) {
        dispatch({
            type: UPDATEQUANTITY_FAILD,
            error: err
        })
    }
}


export const removeitem = (id,token) => async (dispatch) => {
    console.log("suraj");
    dispatch({
        type: REMOVECARTITEMS_REQUEST,

    })
    try {
        console.log(id);

        const config = {
            headers: {
                "Access-Control-Allow-Origin": baseurl,
                "Content-Type": "application/json"
            },
            withCredentials: true,
            
        };
        const adddata = await axios.delete(`${baseurl}/removeitem/${id}?auth=${token}`, config)
        console.log(adddata);
        dispatch({
            type: REMOVECARTITEMS_RESPONSE,
            payload: adddata
        })
    }
    catch (err) {
        dispatch({
            type: REMOVECARTITEMS_FAILD,
            error: err
        })
    }
}
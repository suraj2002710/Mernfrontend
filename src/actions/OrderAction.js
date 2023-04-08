import axios from "axios"
import { baseurl } from "../Baseurl";
import { ORDER_REQUEST, ORDER_FAILED, ORDER_RESPONSE, CLEAR_ERRORS, LOAD_ORDER_REQUEST, LOAD_ORDER_RESPONSE, LOAD_ORDER_FAILED, ORDERDETAILS_REQUEST, ORDERDETAILS_RESPONSE, ORDERDETAILS_FAILED } from "../constant/Orderconstant"

export const ordercreate_action = (orderdata,token) => async (dispatch) => {
    console.log(orderdata);
    try {
        dispatch({
            type: ORDER_REQUEST
        })
        const config = {
            headers: {
                "Access-Control-Allow-Origin": `${baseurl}`,
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'same-origin'
        };
        const data = await axios.post(`${baseurl}/ordercreate?auth=${token}`, orderdata, config)
        console.log(data);
        dispatch({
            type: ORDER_RESPONSE,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_FAILED,
            error: error
        })
    }
}


export const clearerrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

export const loadorder_action = (token) => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_ORDER_REQUEST,
        })
        console.log("order",token);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": `${baseurl}`,
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'same-origin'
        };
        const data = await axios.get(`${baseurl}/orderme?auth=${token}`, config)
        console.log(data
        );
        dispatch({
            type: LOAD_ORDER_RESPONSE,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: LOAD_ORDER_FAILED,
            error:error
        })
        console.log(error);
    }
}

export const orderdetails_action = (id,token) => async (dispatch) => {
    console.log(id);
    try {
        dispatch({
            type: ORDERDETAILS_REQUEST,
        })
        const config = {
            headers: {
                "Access-Control-Allow-Origin": `${baseurl}`,            },
            withCredentials: true,
            credentials: 'same-origin'
        };
        const data = await axios.get(`${baseurl}/singleorderfind/${id}?auth=${token}`, config)
        console.log(data
        );
        dispatch({
            type: ORDERDETAILS_RESPONSE,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ORDERDETAILS_FAILED,
            error:error
        })
        console.log(error);
    }
}
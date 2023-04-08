import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS,LOADUSER_FAILED,LOADUSER_SUCCESS,LOADUSER_REQUEST,SINUP_REQUEST,SINUP_SUCCESS,SINUP_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS, FORGOTPASSWORD_mail_REQUEST, FORGOTPASSWORD_mail_SUCCESS, FORGOTPASSWORD_mail_FAILED, PASSWORDCHANGE_REQUEST, PASSWORDCHANGE_SUCCESS, PASSWORDCHANGE_FAILED} from '../constant/UserConstant'

import axios from 'axios'

import { baseurl } from '../Baseurl';
export const userLoginAction = (loginDetails) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers:{"Access-Control-Allow-Origin": `${baseurl}`,
            "Content-Type": "application/json"
        },
            withCredentials: true,
            credentials: 'same-origin'
        };
        const data = await axios.post(`${baseurl}/login`, loginDetails, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log("data", error);
        dispatch({
            type: LOGIN_FAILED,
            error:error
        })
    }
}

export const Userload_action=(token="")=>async(dispatch)=>{
    try{dispatch({
        type:LOADUSER_REQUEST})
    const config = {
        headers:{"Access-Control-Allow-Origin": `${baseurl}`,
    },
        withCredentials: true,
        credentials: 'same-origin'
    }
    const data= await axios.get(`${baseurl}/me?auth=${token}`,config)
    dispatch({
        type:LOADUSER_SUCCESS,
        payload:data
    })}
    catch(error) {
        dispatch({
            type:LOADUSER_FAILED,
            error:error
        })
    }
}

export const logout=()=>async(dispatch)=>{
    console.log("log");
    try{dispatch({type:LOGOUT_REQUEST})

    const config = {
        headers:{"Access-Control-Allow-Origin": `${baseurl}`,
    },
        withCredentials: true,
        credentials: 'same-origin'
    }

    await axios.get(`${baseurl}/logout`,config)
    dispatch({type:LOGOUT_SUCCESS})
}catch(err){
    dispatch({type:LOGOUT_FAILED,
    error:err
    })
    console.log(err);
}
}

export const userSinup=(sinup_details)=>async(dispatch)=>{
    console.log(sinup_details);
    try{dispatch({type:SINUP_REQUEST})
    const config={
        headers:{"Access-Control-Allow-Origin": `https://mernbackend-ouqf.onrender.com/api/register`,
        "content-type": "multipart/form-data"
    },
      withCredentials: true,
        // credentials: 'same-origin'
    }
    const data= await axios.post(`https://mernbackend-ouqf.onrender.com/api/register`,sinup_details,config)
    console.log(data);
    dispatch({type:SINUP_SUCCESS,
        payload: data
    })
    }
    catch(error){
        dispatch({type:SINUP_FAILED,
        error:error
        })
    }
}

export const Userupdate_profile=(updateprofile_details,token)=>(dispatch)=>{
    console.log("action",updateprofile_details);
    try{dispatch({type:UPDATE_PROFILE_REQUEST})
    const config={
        headers:{"Access-Control-Allow-Origin": `${baseurl}`,
        "content-type": "multipart/form-data"
    },
    withCredentials:true,
    credentials:"same-origin"
    }
    const data=axios.put(`${baseurl}/updateprofile?auth=${token}`,updateprofile_details,config)
    dispatch({type:UPDATE_PROFILE_SUCCESS,
        payload: data
    })
    }
    catch(error){
        dispatch({type:UPDATE_PROFILE_FAILED,
        error:error
        })
    }
}

export const forgotpassword_action=(email,token)=>async(dispatch)=>{
    console.log(email);

    try{dispatch({type:FORGOTPASSWORD_mail_REQUEST})
    const config={
        headers:{"Access-Control-Allow-Origin": `${baseurl}`,
        "content-type": "application/json"
    },
    withCredentials:true,
    credentials:"same-origin"
    }
    const data=await axios.post(`${baseurl}/forgotpass?auth=${token}`,email,config)
    console.log(data);
    dispatch({type:FORGOTPASSWORD_mail_SUCCESS,
        payload: data
    })
    }
    catch(error){
        dispatch({type:FORGOTPASSWORD_mail_FAILED,
        error:error
        })
    }
}


export const passwordchange_action=(password_detail,token)=>async(dispatch)=>{
    try{dispatch({type:PASSWORDCHANGE_REQUEST})
    const config={
        headers:{"Access-Control-Allow-Origin": `${baseurl}`,
        "content-type": "application/json"
    },
    withCredentials:true,
    credentials:"same-origin"
    }
    const data=await axios.put(`${baseurl}/forgotpassword/${token}`,password_detail,config)
    console.log(data);
    dispatch({type:PASSWORDCHANGE_SUCCESS,
        payload: data
    })
    }
    catch(error){
        dispatch({type:PASSWORDCHANGE_FAILED,
        error:error
        })
    }
}
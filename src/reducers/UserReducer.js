import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOADUSER_FAILED, LOADUSER_SUCCESS, LOADUSER_REQUEST, SINUP_REQUEST, SINUP_SUCCESS, SINUP_FAILED, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS,UPDATE_PROFILE_FAILED,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_RESET ,FORGOTPASSWORD_mail_REQUEST,FORGOTPASSWORD_mail_FAILED,FORGOTPASSWORD_mail_SUCCESS, FORGOTPASSWORD_mail_RESET,PASSWORDCHANGE_FAILED,PASSWORDCHANGE_REQUEST,PASSWORDCHANGE_SUCCESS} from '../constant/UserConstant'
import {
     CLEAR_ERROR
} from "../constant/productconstant"

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOADUSER_REQUEST:
        case LOGOUT_REQUEST:
        case SINUP_REQUEST:
            return {
                loading: true,
                user: {}
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticate: false,
            }

        case LOGIN_SUCCESS:
        case LOADUSER_SUCCESS:
        case SINUP_SUCCESS:
            return {
                
                loading: false,
                user: action.payload,
                isAuthenticate: action.payload.data.authenticat,
                isAdmin:action.payload.data.isadmin
                // isAuthenticate:action.payload.data.authenticat?action.payload.data.authenticat:true,
            }

        case LOGOUT_FAILED:
        case SINUP_FAILED:
            return {
                loading: false,
                user: null,
                isAuthenticate: false,
                error: action.err
            }

        case LOADUSER_FAILED:
            return {
                loading: false,
                user: null,
                isAuthenticate: false,
                error: action.error
            }

        case LOGIN_FAILED:
            return {
                loading: false,
                isAuthenticate: false,
                error: action.error
            }
        default:
            return state
    }
}


export const Updateprofile_Reducer = (state = {  }, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        return {
                loading: true,
                ...state
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                isUpdated:action.payload
            }
        case UPDATE_PROFILE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
            case UPDATE_PROFILE_RESET:
                return{
                    ...state,
                    isUpdated:false
                }
        case CLEAR_ERROR:
            return{
                error:null
            }
        default:
            return state
    }
}

export const forgotpassword_reducer=(state={},action)=>{
    switch (action.type) {
        case FORGOTPASSWORD_mail_REQUEST:
        case PASSWORDCHANGE_REQUEST:
            return{
                loading:true,
                ...state
            }    
            case FORGOTPASSWORD_mail_SUCCESS:
            case PASSWORDCHANGE_SUCCESS:
            return{
                loading:false,
                passwordUpdated:action
            }    
            case FORGOTPASSWORD_mail_RESET:
            return{
                loading:false,
                passwordUpdated:false
            }    
            case FORGOTPASSWORD_mail_FAILED:
            case PASSWORDCHANGE_FAILED:
            return{
                loading:false,
                error:action.error
            }    
        default:
            return state
    }   
}
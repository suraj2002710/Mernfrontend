
import {ORDER_REQUEST,ORDER_FAILED,ORDER_RESPONSE, CLEAR_ERRORS, LOAD_ORDER_REQUEST, LOAD_ORDER_RESPONSE, LOAD_ORDER_FAILED, ORDERDETAILS_REQUEST, ORDERDETAILS_FAILED, ORDERDETAILS_RESPONSE} from "../constant/Orderconstant"

export const orderreducer=(state={order:[]},action)=>{
    switch(action.type){
        case ORDER_REQUEST:
        case LOAD_ORDER_REQUEST:
            return{
                loading:true,
                order:[]
            }
            case ORDER_RESPONSE:
                case LOAD_ORDER_RESPONSE:
                return{
                    loading:false,
                    order:action.payload
                }
            case ORDER_FAILED:
                case LOAD_ORDER_FAILED:
                return{
                    loading:false,
                    order:action.error
                }
                case CLEAR_ERRORS:
            return{
                error:null
            }
                default:
                    return state
    }
}

export const myorderreducer=(state={order:[]},action)=>{
    switch(action.type){
        
        case LOAD_ORDER_REQUEST:
            return{
                loading:true,
                order:[]
            }
            
                case LOAD_ORDER_RESPONSE:
                return{
                    loading:false,
                    order:action.payload.data.data
                }

                case LOAD_ORDER_FAILED:
                return{
                    loading:false,
                    order:action.error
                }
                case CLEAR_ERRORS:
            return{
                error:null
            }
                default:
                    return state
    }
}


export const orderdetails_reducer=(state={order:{}},action)=>{
    switch(action.type){
        
        case ORDERDETAILS_REQUEST:
            return{
                loading:true,
                order:{}
            }
            
                case ORDERDETAILS_RESPONSE:
                return{
                    loading:false,
                    order:action.payload.data.data
                }

                case ORDERDETAILS_FAILED:
                return{
                    loading:false,
                    order:action.error
                }
                case CLEAR_ERRORS:
            return{
                error:null
            }
                default:
                    return state
    }
}

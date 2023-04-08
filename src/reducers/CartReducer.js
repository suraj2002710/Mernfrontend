import {
    ADDTOCARTITEMS, LOAD_CARTITEMS, ADDTOCARTITEM_REQUEST, ADDTOCARTITEM_RESPONSE, ADDTOCARTITEM_FAILD, LOADCARTITEMS_REQUEST, LOADCARTITEMS_RESPONSE, LOADCARTITEMS_FAILD, UPDATEQUANTITY_REQUEST, UPDATEQUANTITY_RESPONSE, UPDATEQUANTITY_FAILD, REMOVECARTITEMS_RESPONSE, REMOVECARTITEMS_FAILD
} from "../constant/Cartconstant"
export const addcartreducer = (state = [{}], action) => {
    switch (action.type) {
        case ADDTOCARTITEMS:
        case LOAD_CARTITEMS:
            console.log(action.payload);
            return action.payload  
        default:
            return state
    }
}

export const addcartreducers = (state ={cart:[]}, action) => {
    switch (action.type) {
        case ADDTOCARTITEM_REQUEST:
            case LOADCARTITEMS_REQUEST:
                case UPDATEQUANTITY_REQUEST:
            return{
                loading:true,
                cart:[]
            }
        case ADDTOCARTITEM_RESPONSE:
            case LOADCARTITEMS_RESPONSE:
                case UPDATEQUANTITY_RESPONSE:
                    case REMOVECARTITEMS_RESPONSE:
            console.log(action.payload);
            return {
                loading:false,
                cart:action.payload.data.data
            }
            case ADDTOCARTITEM_FAILD:
                case LOADCARTITEMS_FAILD:
                    case UPDATEQUANTITY_FAILD:
                        case REMOVECARTITEMS_FAILD:
                return{
                    loading:false,
                    error:action.error
                }
        default:
            return state
    }
}

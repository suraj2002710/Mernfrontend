import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productreducer ,productDetailsreducer, review_create_reducer, adminproduct_reducer} from './reducers/Productreduce'
import { forgotpassword_reducer, Updateprofile_Reducer, userReducer } from './reducers/UserReducer'
import {  addcartreducers } from './reducers/CartReducer'
import { myorderreducer, orderdetails_reducer, orderreducer } from './reducers/Orderreducer'

const reducer=combineReducers({
    products:productreducer,
    productDetails:productDetailsreducer,
    userDetails:userReducer,
    user:Updateprofile_Reducer,
    forgotpassword:forgotpassword_reducer,
    cart:addcartreducers,
    orders:orderreducer,
    myorder:myorderreducer,
    oderdetails:orderdetails_reducer,
    reviewcreate:review_create_reducer,
    product_create:adminproduct_reducer
})
let initialstate={
    // cart:{
    //     cart:localStorage.getItem("cartitems")
    //     ?JSON.parse(localStorage.getItem("cartitems")):[]
    // }
}
const middilware=[thunk]

const store=createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middilware))
)
export default store
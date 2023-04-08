import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, CLEAR_ERROR
    , PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, REVIEW_CREATE_REQUEST, REVIEW_CREATE_SUCCESS, REVIEW_CREATE_FAIL, REVIEW_CREATE_RESET, ADMIN_GETPRODUCT_REQUEST, ADMIN_GETPRODUCT_SUCCESS, ADMIN_GETPRODUCT_FAIL, ADMIN_CREATEPRODUCT_REQUEST, ADMIN_CREATEPRODUCT_FAIL, ADMIN_updatePRODUCT_REQUEST, ADMIN_CREATEPRODUCT_SUCCESS
    , ADMIN_updatePRODUCT_SUCCESS, ADMIN_updatePRODUCT_FAIL, PRODUCTDELETE_SUCCESS, PRODUCTDELETE_FAIL, Clearproduct, PRODUCTDELETE_REQUEST
} from "../constant/productconstant"

export const productreducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_GETPRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }
        case ALL_PRODUCT_SUCCESS:
        case ADMIN_GETPRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.data.product,
                productCount: action.payload.data.prodcount,
                resultpage: action.payload.data.resultpage,
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_GETPRODUCT_FAIL:
            return {
                loading: false,
                error: ALL_PRODUCT_FAIL
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const productDetailsreducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            console.log("suraj");
            return {
                loading: true,
                product: {}
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.data.product,
            }
        case PRODUCT_DETAILS_FAIL:

            return {
                loading: false,
                error: ALL_PRODUCT_FAIL
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const review_create_reducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            console.log("suraj");
            return {
                loading: true,
                product: {}
            }
        case REVIEW_CREATE_SUCCESS:
            return {
                loading: false,
                product: action.payload.data.product,
            }
        case REVIEW_CREATE_FAIL:
            return {
                loading: false,
                error: action.error
            }
        case REVIEW_CREATE_RESET:
            return {
                loading: false,
                error: null
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const adminproduct_reducer = (state = { productcreate: {} }, action) => {
    switch (action.type) {
        case ADMIN_CREATEPRODUCT_REQUEST:
        case ADMIN_updatePRODUCT_REQUEST:
        case PRODUCTDELETE_REQUEST:
            return {
                loading: true,
                productcreate: {},
                
            }
        case ADMIN_CREATEPRODUCT_SUCCESS:
        case ADMIN_updatePRODUCT_SUCCESS:
        case PRODUCTDELETE_SUCCESS:
            return {
                loading: false,
                productcreate: action,
                success: true
            }
        case ADMIN_CREATEPRODUCT_FAIL:
        case ADMIN_updatePRODUCT_FAIL:
        case PRODUCTDELETE_FAIL:
            return {
                loading: false,
                error: action.error
            }
        case Clearproduct:
            return {
                productcreate: null,
            }
        default:
            return state
    }
}


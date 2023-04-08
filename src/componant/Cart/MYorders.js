import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadorder_action } from '../../actions/OrderAction'
import { CLEAR_ERRORS } from '../../constant/Orderconstant'
import Loader from '../Layout/Loader/Loader'
import Metadeta from '../Layout/Metadeta'
import {DataGrid} from "@material-ui/data-grid"
import { Typography } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom'
import "./Myorder.css"
import {Cookies} from "react-cookie"
import {createBrowserHistory} from "history"
const MYorders = () => {
let cookie=new Cookies()
let token=cookie.get("token")
let history=createBrowserHistory()
console.log(token);
    const dispatch=useDispatch()
    const { user } = useSelector(state => state.userDetails)
    const {error,loading,order}=useSelector(state=>state.myorder)
    console.log("hsdfhj");
    useEffect(() => {
            if(!token){
                console.log("suraj");
                history.push("/")
            }
    }, [])
    
    useEffect(() => {
      if(error){
        alert(error)
        dispatch({
            type:CLEAR_ERRORS
        })
      }
      dispatch(loadorder_action(token))
    }, [dispatch,error,token])
  const columns=[
    {
        field:"id",
        headerName:"OrderID",
        minwidth:90,
        flex:1
    },
    {
        field:"status",
        headerName:"Status",
        minwidth:120,
        flex:0.5,
        cellClassName:(params)=>{
            return params.getValue(params.id,"status")==="Delivered"?
            "greencls":
            "redcls"
        }
    },
    {
        field:"itemqty",
        headerName:"Items",
        type:"number",
        minwidth:150,
        flex:0.6
    },
    {
        field:"amount",
        headerName:"Amount",
        type:"number",
        minwidth:150,
        flex:0.9
    },
    {
        field:"action",
        headerName:"Actions",
        // type:"number",
        minwidth:150,
        flex:0.6,
        sortable:false,
        renderCell:(params)=>{
            return(
                <Link style={{paddingBottom:"40px"}} to={`${params.getValue(params.id, "id")}`}>
                    <LaunchIcon />
                </Link> 
            )
        }
    }
  ]
  const row=[]
  order&&order.forEach((it,index)=>{
    row.push({
        itemqty:it.orderItems.length,
        id:it._id,
        status:it.orderstatus,
        amount:it.totalprice
    })
  })  
  return (
    <>
    <Metadeta title={`${user.data && user?.data?.data?.name}`-'Orders'}/>
    {loading?(<Loader/>):(
        <>
        <div className="myorderpageg">
        <DataGrid
        rows={row}
        columns={columns}
        disableSelectionOnClick
        pageSize={10}
        autoHeight
        
        className='myorderstable'
        />

        <Typography className='myorderheading'>{`${user.data && user?.data?.data?.name}'s Orders`}</Typography>
        </div>
        </>
    )}
    </>
    )
}

export default MYorders
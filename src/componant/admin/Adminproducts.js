import { DataGrid } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'
import Metadeta from '../Layout/Metadeta'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { admin_products_action, productclear_action, productdelete_action } from '../../actions/Productaction'
import Loader from '../Layout/Loader/Loader';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import "./Adminproduct.css"
import { Cookies } from 'react-cookie';
const Adminproducts = () => {
    const dispatch=useDispatch()
    const {product,loading}=useSelector(state=>state.products)
    const cookies=new Cookies()
    let token=cookies.get("token")
    const {isAuthenticate,isAdmin}=useSelector(state=>state.userDetails)
    const [temp, settemp] = useState("temp")
    const productdelet=(id)=>{
        dispatch(productdelete_action(id,token))
        settemp("")
      }
    useEffect(() => {
        if(isAuthenticate===true && isAdmin===true){
          dispatch(admin_products_action())
        }
        dispatch(productclear_action())
        settemp("temp")
      }, [dispatch,temp,isAuthenticate,isAdmin])
      
    
    console.log(product);
    const columns=[
        {
            field:"id",
            headerName:"product_id",
            minwidth:150,
            flex:0.8
        },
        {
            field:"status",
            headerName:"Status",
            type:"number",
            minwidth:120,
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status")==="Instock"?
                "greencls":
                "redcls"
            }
        },
        {
            field:"name",
            headerName:"Name",
            minwidth:100,
            flex:0.5
        },
        {
            field:"price",
            headerName:"Price",
            type:"number",
            minwidth:150,
            flex:0.4
        },{
            field:"desc",
            headerName:"Description",
            minwidth:170,
            flex:0.5
            
        },{
            field:"category",
            headerName:"Category",
            minwidth:270,
            flex:0.5
        },
        {
            field:"action",
            headerName:"Actions",
            type:"number",
            minwidth:150,
            flex:0.5,
            sortable:false,
            renderCell:(params)=>{
                return(
                    <>
                    <Link style={{ paddingBottom:"40px",paddingRight:"50px"}} to={`/admin/product/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link> 
                    <button onClick={()=>productdelet(params.getValue(params.id, "id"))} style={{outline:"none", border:"none", cursor:"pointer", backgroundColor:"white",  paddingBottom:"40px",paddingRight:"50px"}}>
                        <DeleteIcon />
                    </button> 
                    </>
                )
            }
        }
      ]
      const row=[]
      product&&product.forEach((it,index) =>{
        console.log(product);
        row.push({
            id:it._id,
            category:it.category,
            desc:it.description,
            status:it.stock>1?'Instock':'Outofstock',
            price:it.price,
            name:it.name,
        })
      })
      console.log(row);
  return (
      <>
        <Metadeta title={"Adminproducts"}/>
      {loading ?(<Loader/>):(<>
      <div className="sideplustable">
      <Sidebar class={"productcreate_displayblock"}/>

        <div className="myorderpageg">
    
        <DataGrid
        rows={row}
        columns={columns}
        disableSelectionOnClick
        pageSize={10}
        autoHeight
        className='myorderstable'
        />
    
        <Typography className='myorderheading'>{`Mycart All Products`}</Typography>
        </div>
        </div>
            </>)
        }
    </>
    )
}

export default Adminproducts
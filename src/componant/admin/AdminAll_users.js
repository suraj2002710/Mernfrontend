import { DataGrid } from '@material-ui/data-grid'
import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../Baseurl'
import Metadeta from '../Layout/Metadeta'
import Sidebar from './Sidebar'
import {Cookies} from "react-cookie"

const AdminAll_users = () => {
    const [users, setusers] = useState(null)
    const cookie=new Cookies()
    let token=cookie.get("token")
    useEffect(() => {
        const config = {
            headers:{"Access-Control-Allow-Origin": `${baseurl}`,
            "Content-Type": "application/json"
        },
            withCredentials: true,
            credentials: 'same-origin'
        };
        axios.get(`${baseurl}/alluser?auth=${token}`,config).then((res)=>{
            // console.log(res.data.data);
            setusers(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }, [])


    const columns=[
        {
            field:"id",
            headerName:"userid",
            minwidth:150,
            flex:0.8
        },
        {
            field:"name",
            headerName:"Name",
            minwidth:100,
            flex:0.5
        },
        {
            field:"email",
            headerName:"email   ",
            minwidth:150,
            flex:0.4
        },{
            field:"role",
            headerName:"role",
            minwidth:270,
            flex:0.5
            
        }
      ]
      
    console.log(users);
    let row=[]
    users&&users.data.forEach((it,index) =>{
        console.log(it);
        row.push({
            id:it._id,
            email:it.email,
            desc:it.description,
            role:it.role,
            name:it.name,
        })
      })
    return (
        <>
        
              <>
        <Metadeta title={"All users"}/>
      
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
            
    
    </>
        </>
    )
}

export default AdminAll_users
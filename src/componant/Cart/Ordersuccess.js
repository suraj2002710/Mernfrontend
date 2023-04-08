import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./Ordersuccess.css"
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Ordersuccess = () => {
  return (
<>
<div className="ordersuccess">
    <CheckCircleOutlineIcon/>
    <Typography>Your Order has been Placed Successfuly </Typography>
    <Link to={"/orders"} >View Order</Link>
</div>
</>
    )
}

export default Ordersuccess
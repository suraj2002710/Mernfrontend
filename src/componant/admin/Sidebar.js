import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Link } from 'react-router-dom';
// import TreeView from '@mui/lab/TreeView';
// import TreeItem from '@mui/lab/TreeItem';

import "./Sidebar.css"
const Sidebar = (props) => {
    return (
        <>
            <div className="siderbar">
                <div className='df'>
                    <Link to="/admin/dashbord">
                    <DashboardIcon/><p>Dashbord</p>
                    </Link>
                </div>
                <div className='df'> 
                <Link  to="/admin/products">
                    <Inventory2Icon/><p> Products</p>
                    </Link>
                </div>
                <div className={props.class?props.class:"productcreate_displaynone"}>
                <Link to="/admin/product/create">
                    <AddIcon/><p> Product Create</p>
                    </Link>
                </div>
                
                <div className='df'>
                <Link to="/admin/allusers">
                    <GroupIcon/><p>Users</p>
                    </Link>
                </div>
                <div className='df'>
                <Link to="/admin/product/reviews">
                    <ReviewsIcon/><p>Reviews</p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar
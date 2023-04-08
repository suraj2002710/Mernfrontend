import { SpeedDial, SpeedDialAction } from '@mui/material'
import React from 'react'
import profile from '../../../images/profile.jpg'
import AppsIcon from '@mui/icons-material/Apps';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Userload_action } from '../../../actions/UserAction';
import {useCookies} from "react-cookie"
const Account = () => {
  const navigate=useNavigate()
  const [cookie,removecookie]=useCookies(["token"])

  
  const dispatch=useDispatch()
  const {isAdmin,user}=useSelector(state=>state.userDetails)
    
    function profiles() {
        navigate('/profile')
    }
    function dashborad() {
      navigate('/admin/dashbord'  )
    }

    function logouts() {
      removecookie("token")
      navigate('/')
      dispatch(Userload_action(cookie))
        console.log("logout");
    }
    function addtocart() {
      navigate('/addtocart')
  }
  function orderdetail(){
    navigate("/orders")
  }
    const actions = [
        { icon: <PersonIcon />, name: 'Your Profile',func:profiles },
        { icon: <LogoutIcon />, name: 'Logout',func:logouts},
        { icon: <AddShoppingCartIcon />, name: 'View Cart',func:addtocart},
        { icon: <ViewListIcon />, name: 'Orders',func:orderdetail},
      ];
      // if(user.data.data && user.data.data.role==="admin"){
        console.log(isAdmin);
        if(isAdmin===true){
        actions.push({ icon: <AppsIcon/>, name: 'Dashborad',func: dashborad})
      }
  return (
    <>
    <div className='speedial'>
    <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={
            <img src={user.data.data&&user.data.data.avtar[0]?user.data.data.avtar[0].url:profile} style={{width:"68px",borderRadius:"50%"}}
            alt="profile"
            />
            
        }
        direction="left"
        >
        {actions.map((action) => (
            <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            />
            ))}
      </SpeedDial>
            </div>
    </>
  )
}

export default Account

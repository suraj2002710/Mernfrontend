import React from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../Layout/Loader/Loader'
import "./Profile.css"
import UpdateProfile from './UpdateProfile'

const Profile = () => {
    const navigate=useNavigate()
    const myorder=()=>{
      navigate("/orders")
    }
    const{user,loading}=useSelector(state=>state.userDetails)
    console.log(user.data.data.avtar[0].url);
    let date=new Date(user.data.data.create_at).toDateString()
    return (
        <>
    {loading?<Loader/>:<>
    <div className="profile-container">

      <div className="imgcontainer">
        <h2>My Profile</h2>
        <div>
        <img src={user.data.data.avtar[0].url} alt="" srcset="" />
        </div>
        {/* <button >Edit Profile</button> */}
        <UpdateProfile/>
      </div>
      <div className="userinfo">
        <div className="name">
            <h3>Full Name</h3>
            <p>{user.data.data.name}</p>
        </div>
        <div className="name">
            <h3>Email</h3>
            <p>{user.data.data.email}</p>
        </div>
        <div className="name">
            <h3>Joining Date</h3>
            <p>{date}</p>
        </div>
        <button className='myorder' onClick={myorder}>My Orders</button>

      </div>
    </div>

    </>}
        </>
  )
}

export default Profile

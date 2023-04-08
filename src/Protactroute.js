import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadcartitem_action } from './actions/Cartaction';
import { Userload_action } from './actions/UserAction';

const Protactroute = (props) => {
    const {Componant}=props
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{user,loading,isAuthenticate,isAdmin}=useSelector(state=>state.userDetails)
    console.log(isAdmin);
    useEffect(() => {
        if(!isAuthenticate){
            navigate('/')
          }
    }, [])
  return(
    <>
        <Componant/>
    </>
    )
}

export default Protactroute
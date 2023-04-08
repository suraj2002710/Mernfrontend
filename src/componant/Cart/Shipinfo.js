import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import "./Shipinfo.css"
import Checkoutsteps from './Checkoutsteps';
import { useNavigate } from 'react-router-dom'
import {getCode} from "country-list"
const Shipinfo = () => {
console.log(getCode("india"));
const navigate=useNavigate()
  const [shipinfo,setshipinfo]=useState({
    address:"",
    city:"",
    phoneNo:"",
    pincode:"",
    country:"",
    state:""
  })

  const shipinfo_click=()=>{
    console.log("shipinfo",shipinfo);
    sessionStorage.setItem("shipinginfo",JSON.stringify(shipinfo))
    navigate("/orderconfirm")
  }

  return (
    <>
<Checkoutsteps activeStep={0}/>

      <div className='shipinginfo'>
      <div className="address">

      <HomeIcon/>  <input type="text" name="" value={shipinfo.address} onChange={(e)=>setshipinfo({...shipinfo,address:e.target.value})} placeholder='Address' id="" />
      </div>
      <div className="city">

        <ApartmentIcon/>
        <input type="text" name="" value={shipinfo.city} onChange={(e)=>setshipinfo({...shipinfo,city:e.target.value})} placeholder='City' id="" />
      </div>
      <div className="pincode">

        <PlaceIcon/>
        <input type="text" name="" placeholder='Pin Code' id="" value={shipinfo.pincode} onChange={(e)=>setshipinfo({...shipinfo,pincode:e.target.value})}/>
      </div>
      <div className="phone">

        <PhoneIcon/>
        <input type="text" name="" placeholder='Phone Number' id="" value={shipinfo.phoneNo} onChange={(e)=>setshipinfo({...shipinfo,phoneNo:e.target.value})}/>
      </div>
      <div className="publicio">

        <PublicIcon/>
        <input type="text" name="" placeholder='countory' id=""  onChange={(e)=>setshipinfo({...shipinfo,country:getCode(e.target.value)})
}/>
      </div>
      <div className="state">

        <MarkunreadMailboxIcon/>
        <input type="text" name="" placeholder='state' id="" value={shipinfo.state} onChange={(e)=>setshipinfo({...shipinfo,state:e.target.value})}/>
      </div>
      <div className="submit">
        <button onClick={shipinfo_click}>Submit</button>
      </div>
      </div>




    </>
    )
}

export default Shipinfo
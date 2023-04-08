import React, { useState } from 'react'

import "./Forgotpassword.css"
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { passwordchange_action } from '../actions/UserAction';
const Forgotpassword_form = () => {
    const {token}=useParams()
    const dispatch=useDispatch()
    const [forgotpass_detail,setforgotpass_detail]=useState({
        newpassword:"",
        confirmpassword:""
    })
    const[lable_txt_pass,setlablle_txt_pass]=useState("show")
    const[lable_txt,setlablle_txt]=useState("show")
    
    const [passwordshow_hide_pass, setpasswordshow_hide_pass] = useState("password")
    const [passwordshow_hide, setpasswordshow_hide] = useState("password")
    function changelablleText() {
        if(passwordshow_hide==='password'){
            setlablle_txt("Hide")
        }
        else{
            setlablle_txt("Show")
        }
    }
    function changelablleText_pass() {
        if(passwordshow_hide_pass==='password'){
        setlablle_txt_pass("Hide")
        }
        else{
            setlablle_txt_pass("Show")
        }
    }

    function passwordchange(e) {
        e.preventDefault()
        // if(error){
        //     alert(error)
        // }
        // else{

            console.log(forgotpass_detail);
            console.log(token);
            dispatch(passwordchange_action(forgotpass_detail,token))
        // }


    }


  return (
    <>

            <div className="forgot">
                        <p className='loginHeading'>UserLogin</p>
                        <form onSubmit={passwordchange}>
                            <input className='pass' type={passwordshow_hide_pass} onChange={(e)=>setforgotpass_detail({...forgotpass_detail,newpassword:e.target.value})} value={forgotpass_detail.newpassword} placeholder='Enter New Password'/>
                            <label for="check" onClick={()=>{passwordshow_hide_pass==='password'? setpasswordshow_hide_pass("text"):setpasswordshow_hide_pass("password")
                                                    changelablleText_pass()
                        }} className='check_lable_pass'>{lable_txt_pass}</label>

                            <input className='conpass' type={passwordshow_hide} onChange={(e)=>setforgotpass_detail({...forgotpass_detail,confirmpassword:e.target.value})} value={forgotpass_detail.confirmpassword} placeholder='Enter ConfirmPassword'/>
                            <label for="check" onClick={()=>{passwordshow_hide==='password'? setpasswordshow_hide("text"):setpasswordshow_hide("password")
                                                    changelablleText()
                        }} className='check_lable'>{lable_txt}</label>
                            <button type='submit'>Login</button>
                        </form>
                        </div>
                    
    </>
  )
}

export default Forgotpassword_form

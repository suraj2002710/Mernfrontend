import { Modal } from '@mui/material'
import React, {  useState } from 'react'
import Box from '@mui/material/Box';
import './Forms.css'
import {useDispatch,useSelector} from 'react-redux'
import { forgotpassword_action, Userload_action} from '../actions/UserAction';
import { FORGOTPASSWORD_mail_RESET } from '../constant/UserConstant';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useCookies} from "react-cookie"
import { baseurl } from '../Baseurl';
const Forms = (props) => {
    const [cookie,setcookie]=useCookies(["token"])
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [file,setfile]=useState("")
    const [forgotemail,setforgotemail]=useState({
        email:""
    })
    const {user}=useSelector(state=>state.userDetails)
    const [open, setOpen] = useState("");
    const [sinup,setsinup]=useState({
        name:"",
        email:"",
        password:"",
        image:""
    })
    const {error:forgoterror}=useSelector(state=>state.forgotpassword)
    const [passwordshow_hide, setpasswordshow_hide] = useState("password")
    const[lable_txt,setlablle_txt]=useState("show")
    const handleOpen = () => setOpen("login");
    const [loginDetails,setloginDetails]=useState({
        email:"",
        password:""
    })
    const forgotPassword_sendmail=(e)=>{
        e.preventDefault()
        if(forgoterror){
        toast.error(forgoterror)
        }
        else{
            console.log(forgotemail);
            dispatch(forgotpassword_action(forgotemail))
            dispatch({
                type:FORGOTPASSWORD_mail_RESET
            })
        }
    }

    const login_submit=async(e)=>{
        e.preventDefault();
    //    dispatch(userLoginAction(loginDetails))
        try{console.log(loginDetails);
        const data = await axios.post(`${baseurl}/login`, loginDetails)
        console.log(data.data.success)
        if(data.data.success===true){   
            navigate("/profile")
            dispatch(Userload_action(data.data.token))
            console.log(user);
            setcookie("token",data.data.token,{path:'/',expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        })
        }}catch(error){
            if(error){
                console.log(error.response.data.msg);
                toast.error(error.response.data.msg)
            }
        }
    }

    function img_convert(file) {
        let reader=new FileReader()
        reader.onload=()=>{
        //   console.log(reader.result);
          setfile(reader.result)
        }
        reader.readAsDataURL(file)
        // console.log(file);
      }
    const handlechange=(e)=>{
      let file=e.target.files[0]
    //   console.log(file.name);
      setsinup({...sinup,image:file})
      img_convert(file)
    }

    const sinup_submit=async(e)=>{
        e.preventDefault()
     try{
        const formdata=new FormData()
        formdata.set("name",sinup.name)
        formdata.set("email",sinup.email)
        formdata.set("password",sinup.password)
        formdata.set("image",sinup.image)
        const data = await axios.post(`${baseurl}/register`, formdata)
        console.log(data.data.success)
        if(data.data.success===true){   
            toast.success("you are login")
            navigate("/profile")
            dispatch(Userload_action(data.data.token))
            console.log(user);
            setcookie("token",data.data.token,{path:'/',expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        })
    }
}catch(error){
            if(error){
                console.log(error.response.data.msg);
                toast.error(error.response.data.msg)
            }

        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height:480,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    function changelablleText() {
        if(passwordshow_hide==='password'){
            setlablle_txt("Hide")
        }
        else{
            setlablle_txt("Show")
        }
    }
    // const notify = () => toast("Wow so easy!");

    
    return (
        <>
            <button className='btn' onClick={handleOpen}>Login</button>
            <div className='Login_container'>
                <Modal
                    open={open==="login"}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <p className='loginHeading'>UserLogin</p>
                        <form onSubmit={login_submit}>
                            <input type="email" onChange={(e)=>setloginDetails({...loginDetails,email:e.target.value})} value={loginDetails.email} placeholder='Enter Email'/>
                            <input type={passwordshow_hide} onChange={(e)=>setloginDetails({...loginDetails,password:e.target.value})} value={loginDetails.password} placeholder='Enter Password'/>
                            <label for="check" onClick={()=>{passwordshow_hide==='password'? setpasswordshow_hide("text"):setpasswordshow_hide("password")
                                                    changelablleText()
                        }} className='check_lable'>{lable_txt}</label>
                            <input id='check'  type="checkbox"/>
                            <button type='submit'>Login</button>
                        </form>
                        <div className='other_forms'>
                        <button onClick={()=>setOpen("forgotpassword")}>Forgot Password</button>
                        <button
                        onClick={()=>setOpen("sinup")}
                        >Registre</button>
                        </div>
                    </Box>
                </Modal>
            </div>

            <div className='Sinup_container'>
                <Modal
                    open={open==="sinup"}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <p className='loginHeading'>Ragistration</p>
                    <form onSubmit={sinup_submit} encType="multipart/form-data">
                    <input type="text" name='name' value={sinup.name} placeholder='Enter UserName'
                        onChange={(e)=>setsinup({...sinup, name:e.target.value})}
                    />
                            <input type="email" name='email' value={sinup.email} placeholder='Enter Email'
                            onChange={(e)=>setsinup({...sinup, email:e.target.value})}
                            />
                            <input type={passwordshow_hide} name="password" value={sinup.password} placeholder='Enter 
                            Password'
                            onChange={(e)=>setsinup({...sinup,password:e.target.value})}
                            />
                            <label for="check" onClick={()=>{passwordshow_hide==='password'? setpasswordshow_hide("text"):setpasswordshow_hide("password")
                                                    changelablleText()
                        }} className='check_lble'>{lable_txt}</label>
                        <div className='img_container'>
                            <div className='image'>
                            <img src={file} alt="sfadf" srcset="" />
                            </div>
                        <label for='file'>Choose files</label>
                            <input  id='file' accept='image/*' name='image' type="file" onChange={handlechange}/>
                        </div>

                            <button type='submit'>Sinup</button>
                        </form>

                    </Box>
                </Modal>
            </div>

            <Modal
                    open={open==="forgotpassword"}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <p className='loginHeading'>Ragistration</p>
                    <form onSubmit={forgotPassword_sendmail} encType="multipart/form-data">
                            <input type="email" name='email' value={forgotemail.email} placeholder='Enter Email'
                            onChange={(e)=>setforgotemail({...forgotemail,email: e.target.value})}
                            />
                            <button type='submit'>next</button>
                        </form>
                    </Box>
                </Modal>
                <ToastContainer/>
        </>
    )
}

export default Forms
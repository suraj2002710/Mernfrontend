import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux'
import { Userupdate_profile } from '../../actions/UserAction';
import { UPDATE_PROFILE_RESET } from '../../constant/UserConstant';
import {Cookies} from "react-cookie"
const UpdateProfile = (props) => {
    const dispatch = useDispatch()
    const cookie=new Cookies()
    const [open, setopen] = useState("")
    let token=cookie.get("token")
    const { user,  } = useSelector(state => state.userDetails)


    const [file, setfile] = useState(user.data.data? user.data.data.avtar[0].url:"")

    const [updateprofile, setupdateprofile] = useState({
        name: user.data.data?user.data.data.name:"",
        email: user.data.data?user.data.data.email:"",
        image: ""
    })
        function imgconvert(file) {
            console.log("img");
            let reader=new FileReader()
            reader.onload=()=>{
                console.log(reader.result);
                setfile(reader.result)
            }
            return reader.readAsDataURL(file)
        }
    console.log(user.data.data.name);
    function handlechange(e) {
        console.log(e.target.files[0]);
        let img=e.target.files[0]
        imgconvert(img)
        setupdateprofile({...updateprofile,image:img})
    }
    const handleClose = () => setopen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 480,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        
    }, [open])
    
    
    function submit(e) {
        e.preventDefault();
        console.log(updateprofile);
        dispatch(Userupdate_profile(updateprofile,token))
        
        dispatch({type:UPDATE_PROFILE_RESET})
        // setopen(false)
    }
    return (
        <>
            <button onClick={() => setopen("updateProfile")}>UpdateProfile</button>
            <Modal
                open={open === "updateProfile"}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='loginHeading'>ProfileUpdate</p>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <input type="text" name='name'  value={updateprofile.name}
                        placeholder="Enter your name"
                            onChange={(e) => setupdateprofile({...updateprofile, name: e.target.value })}
                        />
                        <input type="email" name='email' value={updateprofile.email} placeholder='Enter Email'
                            onChange={(e) => setupdateprofile({ ...updateprofile, email: e.target.value })}
                        />
                        <div className='img_container'>
                            <div className='image'>
                                <img src={file} alt="sfadf"/>
                            </div>
                            <label for='file'>Choose files</label>
                            <input id='file' accept='image/*' name='image' type="file" onChange={handlechange} />
                        </div>

                        <button type='submit'>update profile</button>
                    </form>

                </Box>
            </Modal>

        </>
    )
}

export default UpdateProfile
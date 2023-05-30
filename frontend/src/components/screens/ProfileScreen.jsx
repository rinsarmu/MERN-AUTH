import { useState, useEffect } from "react";
import {Link } from 'react-router-dom'
import {Form, Button } from 'react-bootstrap'
import FormContainer from "../FormContainer";
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { useUpdateProfileMutation } from "../../slices/userApiSlice";

const ProfileScreen =()=>{
    const[name, setName]= useState('')
    const[email, setEmail]= useState('')
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [updateProfile] = useUpdateProfileMutation()

    const { userInfo } = useSelector((state) => state.auth);
    const {user} = userInfo

    useEffect(() => {
      setName(user.name)
      setEmail(user.email)
    }, [navigate, userInfo]);

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(confirmPassword !== password){
            toast.error('Password do not match')
            return;

        }

        try{
          const res = await updateProfile({name,email,oldPassword,password}).unwrap()
          dispatch(setCredentials({...res}))
          toast.success('Profile is updated successfully');


        }catch(err){
          toast.error(err?.data?.message || err.error)
        }

        

    }
    return(
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <h1>Profile</h1>
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={name}
                        placeholder="Enter name"
                        onChange={(e)=>setName(e.target.value)}
                        >

                    </Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e)=>setEmail(e.target.value)}
                        >

                    </Form.Control>
                </Form.Group>

               

                <Form.Group className="my-2" controlId="oldPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={oldPassword}
                        placeholder="Enter old password"
                        onChange={(e)=>setOldPassword(e.target.value)}

                        >

                    </Form.Control>

                    <Form.Group className="my-2" controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={password}
                        placeholder="Enter password"
                        onChange={(e)=>setPassword(e.target.value)}

                        >

                    </Form.Control>
                </Form.Group>

                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={confirmPassword}
                        placeholder="Re-enter password"
                        onChange={(e)=>setConfirmPassword(e.target.value)}

                        >

                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type='submit' className='mt-3'>
                    Update
                </Button>

            </Form>

        </FormContainer>
    )
}

export default ProfileScreen
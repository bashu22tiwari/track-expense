import React, {useState, useEffect} from 'react';
import {Form, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import "../styles/Loginpage.css";

const Login = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    //form submit
    const submitHandler = async(values) => {
        try {
           setLoading(true);
           const {data} = await axios.post("api/v1/users/login", values); 
           setLoading(false);
           message.success('logged in successfully');
           localStorage.setItem('user', JSON.stringify({...data.user, password: ""}));
           navigate("/");
        } catch(error) {
            setLoading(false);
            message.error("something went wrong");

        }
    };
    //prevent for login user
    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate("/");
        }
    }, [navigate]);
  return (
    <>
    <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftallysolutions.com%2Fus%2Faccounting%2Fcogs-vs-expenses%2F&psig=AOvVaw3ajyS93HoJUBMFwHDI3q6t&ust=1703423509913000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNilsZ7RpYMDFQAAAAAdAAAAABAD" alt='yashi my name'/>
            <h1>Login Form</h1>
            <Form.Item label="Email" name="email">
                <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
                <Link to="/register">Not a user? Click Here to Register</Link>
                <button className="btn btn-primary">Login</button>
            </div>
        </Form>
    </div>
        
    </>
  );
};

export default Login;
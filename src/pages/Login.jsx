import React from 'react'

import "../components/Login/Login.css"
import LoginImg from "../assets/login image.png"
import LoginForm from '../components/Login/LoginForm'

const Login = () => {
    return (
        <div className='login'>
            <div className='login__img'>
                <img src={LoginImg} alt="login_Image" />
            </div>
            <div className='login__right'>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
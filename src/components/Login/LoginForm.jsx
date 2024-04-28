import React, { useState } from 'react'
import { VscEyeClosed, VscEye } from "react-icons/vsc";



const LoginForm = () => {
    const [visible, setVisible] = useState(true)

    const handleVisible = () => {
        setVisible(!visible)
    }
    return (
        <div className='login__form'>
            <div className='login__form-head'>
                <h2>Hello, Admin</h2>
                <p>Good to see you again</p>
            </div>
            <form>
                <input type="email" placeholder='Email Address' />
                <div>
                    <input type={visible ? "password" : "text"} placeholder='Password' />
                    {visible ? (
                        <VscEye id='visible' onClick={handleVisible} />
                    ) : (
                        <VscEyeClosed id='visible' onClick={handleVisible} />
                    )}
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm
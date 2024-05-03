import React, { useContext, useState } from 'react'
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import AuthContext from '../../context/AuthContext';



const LoginForm = () => {
    const [visible, setVisible] = useState(true)

    const { email, password, setEmail, setPassoword, loginUser } = useContext(AuthContext)

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
                <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div>
                    <input type={visible ? "password" : "text"} placeholder='Password' value={password} onChange={(e) => setPassoword(e.target.value)} />
                    {visible ? (
                        <VscEye id='visible' onClick={handleVisible} />
                    ) : (
                        <VscEyeClosed id='visible' onClick={handleVisible} />
                    )}
                </div>
                <button onClick={loginUser}>Login</button>
            </form>
        </div>
    )
}

export default LoginForm
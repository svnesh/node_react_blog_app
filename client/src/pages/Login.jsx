import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Login = () => {

  const {login} = useContext(AuthContext) 

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrormessage] = useState(null)
  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    
    try{
      await login(inputs)
      navigate("/")
    }catch(err){
      setErrormessage(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" name="username" placeholder='Username' onChange={handleChange}/>
        <input required type="password" name="password" placeholder='Password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {errorMessage && <p>{errorMessage}</p>}
        <span>Don't have an account? <Link className='link' to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login
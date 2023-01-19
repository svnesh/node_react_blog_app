import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
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
      await axios.post("/auth/register", inputs)
      navigate("/login")
    }catch(err){
      setErrormessage(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type="text" name="username" placeholder='Username' onChange={handleChange}/>
        <input required type="text" name="email" placeholder='Email' onChange={handleChange}/>
        <input required type="password" name="password" placeholder='Password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        {errorMessage && <p>{errorMessage}</p>}
        <span>Already have an account? <Link className='link' to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register
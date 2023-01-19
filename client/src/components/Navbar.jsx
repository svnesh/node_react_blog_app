import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from "../img/logo.png"

const Navbar = () => {

  const {currentUser,logout} = useContext(AuthContext) 

  return (
    <div className='navbar'>
      <div className='container'>
          <div className='logo'>
            <Link to="/">
              <img src={Logo} alt=""></img>
            </Link>
            <span className='blogname'>My Blog</span>
          </div>
          <div className='links'>
            <Link className='link' to="/?cat=art"><h6>ART</h6></Link>
            <Link className='link' to="/?cat=tech"><h6>TECH</h6></Link>
            <Link className='link' to="/?cat=health"><h6>HEALTH</h6></Link>
            <Link className='link' to="/?cat=travel"><h6>TRAVEL</h6></Link>
            <Link className='link' to="/?cat=movies"><h6>MOVIES</h6></Link>
            <Link className='link' to="/"><h6>HOME</h6></Link>
            <Link className='link' to="/about"><h6>ABOUT</h6></Link>
            <span>{currentUser?.username}</span>
            {currentUser ? <span onClick={logout}>Logout</span> : <Link className='link' to="/login">Login</Link>}
            <span className='write'>
            {currentUser ? <Link className='link' to="/write">Write</Link> : <Link className='link' to="#">Write</Link>}
            </span>
          </div>

      </div>
    </div>
  )
}

export default Navbar
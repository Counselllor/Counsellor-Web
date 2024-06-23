import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Logo from '../../assets/logo.webp'

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
        <img id='logo' src={Logo} alt="logo" />
        <ul>
          <li><NavLink className={({isActive})=>isActive?'active': 'none'} to='/'>Home</NavLink></li>
          <li><NavLink className={({isActive})=>isActive?'active': 'none'} to='/about'>About</NavLink></li>
          <li>
            <div className='loginSignUpBtn'><NavLink className={({isActive})=>isActive?'active': 'none'} to='/login'>Login</NavLink></div>
            <div className='loginSignUpBtn'><NavLink className={({isActive})=>isActive?'active': 'none'} to='/signup'>Sign Up</NavLink></div>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default Navbar
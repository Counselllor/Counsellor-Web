import { NavLink } from 'react-router-dom'
import '../styles/App.css'
import Logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
        <img id='logo' src={Logo} alt="logo" />
        <ul>
          <li><NavLink activeClassName='active' exact to='/'>Home</NavLink></li>
          <li><NavLink activeClassName='active' to='/about'>About</NavLink></li>
          <li>
            <div className='loginSignUpBtn'><NavLink activeClassName='active' to='/login'>Login</NavLink></div>
            <div className='loginSignUpBtn'><NavLink activeClassName='active' to='/signup'>Sign Up</NavLink></div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar

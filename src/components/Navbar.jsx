import { Link } from 'react-router-dom'
import '../styles/App.css'
import Logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
        <img id='logo' src={Logo} alt="logo" />
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li>
            <div className='loginSignUpBtn'><Link to='/login'>Login</Link></div>
            <div className='loginSignUpBtn'><Link to='/signup'>Sign Up</Link></div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar

import '../styles/App.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Pages</li>
          <li>Contact</li>
          <li>
            <div className='loginSignUpBtn'>Login</div>
            <div className='loginSignUpBtn'>Sign Up</div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar

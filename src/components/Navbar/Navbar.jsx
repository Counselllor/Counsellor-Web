import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/logo.webp';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav id="navbar">
        <img id='logo' src={Logo} alt="logo" />
        <ul>
        {!isHomePage ? (
            <>
          <li><NavLink className={({isActive})=>isActive?'active': 'none'} to='/'>Home</NavLink></li>
          <li><NavLink className={({isActive})=>isActive?'active': 'none'} to='/about'>About</NavLink></li>
          </>
          ) : null}
              <li><NavLink className={({isActive})=>isActive?'active': 'none'} to='/login'>Login</NavLink></li>
              <li><NavLink className={({isActive})=>isActive?'active': 'none'} to='/signup'>Sign Up</NavLink></li>
        
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

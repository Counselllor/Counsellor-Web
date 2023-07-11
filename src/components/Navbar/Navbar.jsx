import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.webp";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  let navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <>
      <nav id="navbar">
        <img id="logo" src={Logo} alt="logo" />
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "none")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "none")}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <button
              className={`loginSignUpBtn ({isActive})=>isActive?'active': 'none'`}
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

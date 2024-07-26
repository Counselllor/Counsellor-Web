import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.css";
import { useState } from "react";


const ErrorPage = () => {
  const error = useRouteError();
 const [login, setLogin] = useState(localStorage.getItem("login"));
  return (
    <>
    {/* <Navbar /> */}
      <div className="ErrorPage">
        <h1>Oops! Something went wrong</h1>
        {/* <img className="Image" src={img} alt="404"></img> */}
        <p>The link you followed may be broken, or the page may have been removed. Go back .</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
        <Link className="Btn" to={`${login ? "/dashboard" :"/"}`}>
          Go back to home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;

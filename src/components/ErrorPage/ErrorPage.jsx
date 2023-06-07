import { Link, useRouteError } from "react-router-dom";
// import '../styles/App.css'
import "./ErrorPage.css";
import img from "../../assets/error404.svg";
import Navbar from "../Navbar/Navbar";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
    <Navbar />
      <div className="ErrorPage">
        <h1>Oops! Something went wrong</h1>
        <img className="Image" src={img} alt="404"></img>
        <p>Sorry, an unexpected error has occured.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
        <Link className="Btn" to={"/"}>
          Go back to home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;

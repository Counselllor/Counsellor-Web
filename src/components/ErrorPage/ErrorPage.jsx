import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.css";
import imgx from "../../assets/404.png";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
    {/* <Navbar /> */}
      <div className="ErrorPage">
        <img className="error_emg" src={imgx} alt="404 pic"></img>
        <h1>Oops! Something went wrong</h1>
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

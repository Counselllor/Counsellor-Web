import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.css";


const ErrorPage = () => {
  const error = useRouteError();

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
        <Link className="Btn" to={"/"}>
          Go back to home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;

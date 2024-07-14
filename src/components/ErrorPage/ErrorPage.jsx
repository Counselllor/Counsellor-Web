import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.css";
import { auth } from "../../firebase/auth";
import { useNavigate } from 'react-router-dom'
const ErrorPage = () => {
  let navigate=useNavigate()
  const error = useRouteError();
  function handelClick()
{
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            navigate('/dashboard')

          } else {
           navigate('/')
          }
        });
        return () => unsubscribe();
} 
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
        <Link className="Btn" onClick={handelClick}>
          Go back to home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;

import {Link, useRouteError} from 'react-router-dom'
import '../styles/App.css'

const ErrorPage = () => {
    const error = useRouteError()
    
    return(
        <div className="ErrorPage">
            <h1>Oops! Something went wrong</h1>
            <p>Sorry, an unexpected error has occured.</p>
            <p>
                <i>
                    {error?.statusText || error?.message}
                </i>
            </p>
            <Link to={'/'}>Go back to home</Link>
        </div>
    )
}

export default ErrorPage
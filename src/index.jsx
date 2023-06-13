import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home,About,LoginForm,SignUpForm,ErrorPage} from './components/index'
import App from './App'
import HashLoader from "react-spinners/HashLoader";

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    element: <App/>,
    children: [
      {
        path: '/',
        errorElement: <ErrorPage/>,
        element: <Home/>
      },
      {
        path: '/about',
        errorElement: <ErrorPage/>,
        element: <About/>
      },
      {
        path: '/login',
        errorElement: <ErrorPage/>,
        element: <LoginForm/>
      },
      {
        path: '/signup',
        errorElement: <ErrorPage/>,
        element: <SignUpForm/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div className="loader ">
                          <HashLoader aria-label="Loading Spinner"
                            data-testid="loader" color={"#0603a9"} />
                        </div>}>
      <RouterProvider router={router}/>
    </Suspense>
  </React.StrictMode>
)

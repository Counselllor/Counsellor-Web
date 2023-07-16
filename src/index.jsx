import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home,About,LoginForm,SignUpForm,ErrorPage,Dashboard} from './components/index'
import App from './App'
import Loading from './components/Loading/Loading'
import './index.css'
import Login from './components/Login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    element: <Suspense fallback={<Loading/>}><App/></Suspense>,
    children: [
      {
        path: '/',
        errorElement: <ErrorPage/>,
        element: <Login/>
      },
      {
        path: '/dashboard',
        errorElement: <ErrorPage/>,
        element: <Dashboard/>
      },
      // {
      //   path: '/about',
      //   errorElement: <ErrorPage/>,
      //   element: <About/>
      // },
      // {
      //   path: '/login',
      //   errorElement: <ErrorPage/>,
      //   element: <LoginForm/>
      // },
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
    
    <RouterProvider router={router}/>
  
  </React.StrictMode>
)

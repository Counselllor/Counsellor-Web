import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './components/Home'
import About from './components/About'
import LoginForm from './components/Login'
import SignUpForm from './components/SignUp'
import ErrorPage from './components/ErrorPage'
import './styles/index.css'

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
    <RouterProvider router={router}/>
  </React.StrictMode>
)

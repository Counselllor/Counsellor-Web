import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Dashboard, ErrorPage, ForgotPasswordForm, SignUpForm } from './components/index'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Suspense fallback={<Loading />}><App /></Suspense>,
    children: [
      {
        path: '/',
        errorElement: <ErrorPage />,
        element: <Login />
      },
      {
        path: '/dashboard',
        errorElement: <ErrorPage />,
        element: <Dashboard />
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
        errorElement: <ErrorPage />,
        element: <SignUpForm />
      },
      {
        path: '/forgotpassword',
        errorElement: <ErrorPage />,
        element: <ForgotPasswordForm />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>
)

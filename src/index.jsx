import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CollegePage from "./components/CollegePage/CollegePage";
import {
  About,
  Dashboard,
  ErrorPage,
  ForgotPasswordForm,
  SignUpForm,
  FAQs,
  Contribute,
} from "./components/index";
import Loading from "./components/Loading/Loading";
import Login from "./components/Login/Login";
import "./index.css";
import Contact from "./components/Contact/Contact";
import ProfilePage from "./Pages/Profile";
import Courses from "./components/Courses/Courses";
import Privacy from "./components/Privacy-Policy/Privacy";
import Terms from "./components/Terms/Terms";
import JoinUs from "./components/Joinus/JoinUs";
import Help from "./components/Help/Help";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Login />,
      },
      {
        path: "/dashboard",
        errorElement: <ErrorPage />,
        element: <Dashboard />,
      },
      {
        path: "/about",
        errorElement: <ErrorPage />,
        element: <About />,
      },
      {
        path: "/contact",
        errorElement: <ErrorPage />,
        element: <Contact />,
      },
      {
        path: "/courses",
        errorElement: <ErrorPage />,
        element: <Courses />,
      },
      {
        path: "/help",
        errorElement: <ErrorPage />,
        element: <Help />,
      },
      {
        path: "/privacy-policy",
        errorElement: <ErrorPage />,
        element: <Privacy />
      },
      {
        path: "/terms",
        errorElement: <ErrorPage />,
        element: <Terms />
      },
      {
        path: "/join-us",
        errorElement: <ErrorPage />,
        element: <JoinUs />
      },
      // {
      //   path: '/login',
      //   errorElement: <ErrorPage/>,
      //   element: <LoginForm/>
      // },
      {
        path: "/signup",
        errorElement: <ErrorPage />,
        element: <SignUpForm />,
      },
      {
        path: "/forgotpassword",
        errorElement: <ErrorPage />,
        element: <ForgotPasswordForm />,
      },
      {
        path: "/college/:id",
        errorElement: <ErrorPage />,
        element: <CollegePage />,
      },
      {
        path: "/profile",
        errorElement: <ErrorPage />,
        element: <ProfilePage />,
      },
      {
        path: "/FAQs",
        errorElement: <ErrorPage />,
        element: <FAQs />,
      },
      {
        path: "/Contribute",
        errorElement: <ErrorPage />,
        element: <Contribute />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

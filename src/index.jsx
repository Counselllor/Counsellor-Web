import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "../src/index.css";
import "./styles/App.css";
import "./styles/errorStyles.css";

import {
  Dashboard,
  About,
  Contact,
  ErrorPage,
  ForgotPasswordForm,
  SignUpForm,
  Login,
  CounsellorAddUpdatePage,
  ViewCollege,
} from "./Pages/index";
import Loading from "./components/Loading/Loading";

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
        path: "/login",
        errorElement: <ErrorPage />,
        element: <Login />,
      },
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
        path: "/new",
        errorElement: <ErrorPage />,
        element: <CounsellorAddUpdatePage />,
      },
      {
        path: "/college/:id",
        errorElement: <ErrorPage />,
        element: <ViewCollege />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

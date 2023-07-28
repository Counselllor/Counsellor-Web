import { lazy } from "react";
import Navbar from "./Navbar/Navbar.jsx";
const LoginForm = lazy(() => import('./Login/Login.jsx'));
const SignUpForm = lazy(() => import('./SignUp/SignUp.jsx'));
const ForgotPasswordForm = lazy(() => import("./ForgotPassword/ForgotPassword.jsx"));
import Dashboard from './Dashboard/Dashboard.jsx'

const Home = lazy(() => import("./Home/Home.jsx"));
const About = lazy(() => import("./About/About.jsx"));
const ErrorPage = lazy(() => import("./ErrorPage/ErrorPage.jsx"));



export {
    About, Dashboard, ErrorPage, ForgotPasswordForm, Home,
    LoginForm,
    Navbar,
    SignUpForm
};


import { lazy } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import LoginForm from './Login/Login.jsx';
import SignUpForm from './SignUp/SignUp.jsx';

const Home = lazy(() => import("./Home/Home.jsx"));
const About = lazy(() => import("./About/About.jsx"));
const ErrorPage = lazy(() => import("./ErrorPage/ErrorPage.jsx"));


export {
    About,
    ErrorPage,
    Home,
    LoginForm,
    Navbar,
    SignUpForm
};
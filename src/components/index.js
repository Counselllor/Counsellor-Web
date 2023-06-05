import { lazy } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Loading from "./Loading/Loading.jsx";

const Home = lazy(() => import("./Home/Home.jsx"));
const About = lazy(() => import("./About/About.jsx"));
const LoginForm = lazy(() => import("./Login/Login.jsx"));
const SignUpForm = lazy(() => import("./SignUp/SignUp.jsx"));
const ErrorPage = lazy(() => import("./ErrorPage/ErrorPage.jsx"));

export { About, ErrorPage, Home, LoginForm, Navbar, SignUpForm, Loading };

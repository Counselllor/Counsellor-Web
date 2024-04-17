import { lazy } from "react";
import "./SignUp/SignUp.css";
import "./Login/Login.css";
import "./About/About.css";
import "./Contact/Contact.css";
import "./StudentDashboard/StudentDashboard.css";
import "./Home/Home.css";
import "../components/ForgotPassword/ForgotPassword.css";
import "../components/CounsellorDashboardNavBar/CounsellorDashboardNavBar.css";

const Home = lazy(() => import("./Home/Home.jsx"));
const ErrorPage = lazy(() => import("./ErrorPage/ErrorPage.jsx"));
const Login = lazy(() => import("./Login/Login.jsx"));
const SignUpForm = lazy(() => import("./SignUp/SignUp.jsx"));
const About = lazy(() => import("./About/About.jsx"));
const Contact = lazy(() => import("./Contact/Contact.jsx"));
const CounsellorAddUpdatePage = lazy(() =>
  import("./CounsellorAddUpdatePage/CounsellorAddUpdatePage.jsx")
);
const StudentDashboard = lazy(() =>
  import("./StudentDashboard/StudentDashboard.jsx")
);
const ForgotPasswordForm = lazy(() =>
  import("../components/ForgotPassword/ForgotPassword.jsx")
);
const Dashboard = lazy(() => import("./Dashboard/Dashboard.jsx"));
const ViewCollege = lazy(() => import("./ViewCollege/ViewCollege.jsx"));

export {
  Home,
  ErrorPage,
  Login,
  SignUpForm,
  About,
  Contact,
  StudentDashboard,
  ForgotPasswordForm,
  Dashboard,
  CounsellorAddUpdatePage,
  ViewCollege,
};

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Contact = () => {
  const navigate = useNavigate();
  let form = useRef();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    let params = {
      name: form.current.name.value,
      email: form.current.email.value,
      feedback: form.current.feedback.value,
    };
    emailjs.send("service_kszura2", "template_u8shl9d", params, {
      publicKey: "rSYpY_RsF76o4MgcA",
    });
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <main>
      <Navbar />
      {/* <nav className="navbar">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? 'show' : ''}`}>
            <ul>
              
              <li><a href="#">Top Universities</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Carrier Support</a></li>
              <li className='dot'><a href="#">•</a></li>
              <li><a href="#" onClick={handleSignOut}>Log Out</a></li>
              <li><a href="#"><button className='profile_btn'>Profile</button></a></li>
            </ul>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
          </div>
        </nav> */}
      <section className="contact-section w-full px-2 max-w-screen-md">
        <h2>Let&apos;s Get in Touch</h2>
        <p>
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>
        <div className="contactbox">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="name" />
              Name
              <input
                id="name"
                type="text"
                required
                className="name-input"
                placeholder="Enter your name"
                name="name"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="email" /> Email
              <input
                id="email"
                placeholder="Enter your email"
                type="email"
                className="flex h-10 w-full rounded-md border border-slate-700 bg-background px-3 py-2 text-sm file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 shadow-inner shadow-slate-800 hover:border-slate-400 hover:transition-al"
                name="email"
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="message" className="text-lg" />
              Message
              <textarea
                className="min-h-[100px] mb-5 text-white shadow-inner shadow-slate-800
                flex w-full rounded-md border border-slate-700 bg-background px-3 py-2 text-sm ring-offset-background   placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-400 hover:transition-all"
                id="message"
                placeholder="Enter your message"
                name="message"
              />
            </div>
            <button
              className="bg-gradient-to-br relative group/btn from-slate-800 to-slate-700 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] py-2 hover:from-slate-700 hover:to-slate-800 hover:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] duration-300 ease-in-out text-center transition-all"
              type="submit"
            >
              Send
              <LuSend className="inline mx-2 h-4" />
            </button>
          </form>
          <div>
            <h3 className="text-2xl font-semibold mb-10 text-slate-300">
              Connect with Us
            </h3>
            <div className="flex gap-8 mb-12">
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-600 shadow-inner shadow-gray-800 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
                href="#"
              >
                <MdEmail className="w-5 h-5" />
              </Link>
              <div className="text-md text-slate-300">
                <p>Email to us at </p>
                <p>innov8@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-8 mb-12">
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-600 shadow-inner shadow-gray-800 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
                href="#"
              >
                <FaPhone className="w-5 h-5" />
              </Link>
              <div className="text-md text-slate-300">
                <p>Call us at </p>
                <p>XXXXX XXXXX</p>
              </div>
            </div>

            <div className="flex gap-8 mb-12">
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-600 px-2 shadow-inner shadow-gray-800 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
                href="#"
              >
                <IoLocationOutline className="w-5 h-5" />
              </Link>
              <div className="text-md text-slate-300">
                <p>Location at </p>
                <p>Techno Main Salt Lake, Sector-V, Kolkata-700091</p>
              </div>
            </div>

            <div className="flex space-x-12 py-7">
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-slate-600 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
                href="#"
              >
                <FaTwitter className="w-5 h-5 text-white" />
              </Link>
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-slate-600 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
                href="#"
              >
                <FaFacebook className="w-5 h-5 text-white" />
              </Link>
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-slate-700  hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
                href="#"
              >
                <FaLinkedin className="w-5 h-5 text-white" />
              </Link>
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-slate-700 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
                href="#"
              >
                <FaGithub className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;

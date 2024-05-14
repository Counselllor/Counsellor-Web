// import "./Footer.css";
// import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

// function Footer() {
//   return (
//     <footer>
//       <div>
//         <ul>
//           <li>
//             <a
//               style={{ textDecoration: "none", color: "inherit" }}
//               href="./about"
//             >
//               About
//             </a>
//           </li>
//           <li>Blog</li>
//           <li>Help</li>
//           <li>Privacy</li>
//           <li>Terms</li>
//           <li>
//             <a
//               style={{ textDecoration: "none", color: "inherit" }}
//               href="./contact"
//             >
//               Contact
//             </a>
//           </li>
//           <li>Our Countributors</li>
//           <li>Join Us</li>
//         </ul>
//         <p>© 2023 Counsellor</p>
//         <div id="icons">
//           <a
//             href="https://github.com/Counselllor/Counsellor-Web"
//             target="_blank"
//           >
//             <FaGithub />
//           </a>
//           <FaFacebook />
//           <FaInstagram />
//           <FaLinkedin />
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import "./Footer.css";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <footer>
           
  <div style={{ textAlign: 'left' , paddingLeft:'20px'}}>
  <span style={{ fontSize: '100px' }}>Counsellor.</span>
  </div>
<div className="footer-container">
        <ul >
          <li>Home</li>
          <li>About</li>
          <li>Blog</li>
          <li>Help</li>
          <li>Privacy</li>
        <li>Terms</li>

        <li>
        <a
        style={{ textDecoration: "none", color: "inherit" }}
     href="./contact"
    >             Contact
           </a>
          </li>
        </ul>
       </div>


      </footer>
    </div>
  );
}

export default Footer;

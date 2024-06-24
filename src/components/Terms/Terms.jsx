import "./Terms.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-item">
        Home
      </Link>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-item active">Terms & Conditions</span>
    </nav>
  );
};

const Terms = () => {
  return (
    <>
      {/* breadcrumb */}
      <div className="terms-container">
        <Breadcrumb />

        {/* terms page */}
        <div className="contents">
          <h1>Terms & Conditions</h1>
          <section id="cookies">
            <h2>Cookies</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              aut esse deserunt corrupti neque, animi pariatur inventore porro
              amet ducimus dolores praesentium nam nostrum, ex rerum! Excepturi
              molestiae voluptates eaque!
            </p>
          </section>
          <section id="license">
            <h2>License</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              eum explicabo quae totam voluptatum. Expedita nisi quo facere odio
              quas obcaecati porro architecto minus, eum sed commodi ratione
              modi deleniti perspiciatis! Labore ipsa sapiente ab minima
              incidunt tempora perferendis iure at et placeat. Praesentium
              temporibus nisi et est eius fugit.
            </p>
            <ul>
              <li>Republish material from CrickClub24</li>
              <li>Sell, rent or sub-license material from CrickClub24</li>
              <li>Reproduce, duplicate or copy material from CrickClub24</li>
              <li>Redistribute content from CrickClub24</li>
            </ul>
          </section>
          <section id="hyperlinking">
            <h2>Hyperlinking to our Content</h2>
            <p>
              The following organizations may link to our Website without prior
              written approval:
            </p>
            <ul>
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors;</li>
              <li>System wide Accredited Businesses.</li>
            </ul>
          </section>
          <section id="iframes">
            <h2>iFrames</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              ullam repudiandae voluptatem corrupti deleniti dolores iusto quo
              beatae modi possimus.
            </p>
          </section>
          <section id="liability">
            <h2>Content Liability</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
              itaque iusto sed a consequuntur adipisci corporis quidem est.
              Similique optio esse placeat reiciendis velit nemo rerum corporis
              consectetur, perspiciatis, hic nostrum et illum recusandae ea,
              asperiores ducimus distinctio temporibus nam!
            </p>
          </section>
        </div>
      </div>

      <hr />

      <Footer />
    </>
  );
};

export default Terms;

import React, { useEffect, useState } from 'react';
import './Testimonial.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const testimonialData = [
  { id: 1, name: "John Doe", role: "Software Engineer", text: "This service transformed my career path! The guidance and resources provided were invaluable.", rating: 5, image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Jane Smith", role: "UX Designer", text: "Incredibly helpful resources and support. I found my dream job thanks to this platform.", rating: 4, image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 3, name: "Alice Johnson", role: "Data Analyst", text: "The career guidance was spot on! It helped me transition to a new field seamlessly.", rating: 5, image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 4, name: "Bob Brown", role: "Marketing Manager", text: "The resume builder is a game-changer! It helped me land interviews at top companies.", rating: 5, image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 5, name: "Emma Wilson", role: "Product Manager", text: "Excellent tools for job seekers. The mock interviews really boosted my confidence.", rating: 4, image: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 6, name: "Michael Lee", role: "Startup Founder", text: "As an entrepreneur, the networking features were incredibly valuable. Highly recommended!", rating: 5, image: "https://randomuser.me/api/portraits/men/3.jpg" }
];

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    setTestimonials(testimonialData);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="testimonial-container">
      <h2 className="testimonial-heading">What Our Users Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-slide">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <div className="rating">{"★".repeat(testimonial.rating)}</div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
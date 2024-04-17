import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

const SmoothScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      // Smoothly scroll to the top of the page when scrolling down
      if (window.scrollY > 100) {
        scroll.scrollToTop({
          duration: 500,
          smooth: true,
        });
      }
    };

    // Attach event listener to the window's scroll event
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmoothScroll;

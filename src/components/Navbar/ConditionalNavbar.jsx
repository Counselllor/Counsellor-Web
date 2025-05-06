import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../../firebase/auth";
import Navbar from "./Navbar";

/**
 * ConditionalNavbar - Shows navbar only when user is logged in for specific pages
 * If user is not logged in, it doesn't render the navbar for these pages
 */
const ConditionalNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Pages where navbar should be conditionally shown based on login status
  const conditionalPages = [
    "/about",
    "/blogs",
    "/contribute",
    "/join-us",
    "/help",
    "/contact",
    "/terms",
    "/privacy-policy"
  ];

  // Check if current path is in the conditional pages list
  const isConditionalPage = conditionalPages.some(page => 
    location.pathname === page || 
    location.pathname.startsWith(`${page}/`)
  );

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Convert user object to boolean
      setIsLoading(false);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  // Don't render anything while checking auth status
  if (isLoading) {
    return null;
  }

  // If it's a conditional page and user is not logged in, don't show navbar
  if (isConditionalPage && !isLoggedIn) {
    return null;
  }

  // Otherwise, show the navbar
  return <Navbar />;
};

export default ConditionalNavbar;

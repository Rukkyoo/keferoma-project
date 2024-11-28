"use client";

import styles from "../page.module.scss";
import React, { useState, useEffect } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { SiGmail } from "react-icons/si";



const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles["landing-page-body"]}>
      <header className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1 className={styles["logo"]}>Keferoma Global Resources</h1>
          {isMobile ? (
            <div className={styles["hamburger-menu"]}>
              <button onClick={toggleMenu} className={styles["hamburger-button"]}>
                ☰
              </button>
              <nav className={`${styles["menu"]} ${isMenuOpen ? styles["open"] : ""}`}>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#products">Shop</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </nav>
            </div>
          ) : (
            <nav className={styles["desktop-menu"]}>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Shop</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          )}
        </div>
      </header>
      <main className={styles["main-content"]}>
        <section className={styles["hero"]}>
          <div className={styles["hero-content"]}>
            <h2>Premium Groundnut Oil Retail at Your Fingertips</h2>
            <p>Bringing nature's golden goodness straight to your kitchen</p>
            <a href="#products" className={styles["cta-button"]}>Shop Here</a>
          </div>
          <img className={styles["hero-image"]} src="gnut-group.jpg" alt="Groundnut Oil" />
        </section>
        <section className={styles["product-highlights"]}>
          <h2>Why Choose Us?</h2>
          <div className={styles["highlights"]}>
            <div className={styles["highlight"]}>
              <img src="/icon-quality.svg" alt="Quality icon" />
              <h3>Superior Quality</h3>
              <p>We source only the finest groundnut oil for our customers</p>
            </div>
            <div className={styles["highlight"]}>
              <img src="/icon-variety.svg" alt="Variety icon" />
              <h3>Wide Selection</h3>
              <p>Various sizes and packaging options to suit your needs</p>
            </div>
            <div className={styles["highlight"]}>
              <img src="/icon-delivery.svg" alt="Delivery icon" />
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping right to your doorstep</p>
            </div>
          </div>
        </section>
        <section className={styles["about"]}>
          <h2>Your Trusted Groundnut Oil Retailer</h2>
          <p>At Keferoma Global Resources, we're committed to bringing you the best groundnut oil on the market. With years of experience in the retail industry, we understand the importance of quality, value, and customer satisfaction.</p>
          <a href="#about" className={styles["learn-more"]}>Learn More About Us</a>
        </section>
{/*         <section className={styles["testimonials"]}>
          <h2>What Our Customers Say</h2>
          <div className={styles["testimonial"]}>
            <p>"Keferoma's groundnut oil is simply the best. The quality is unmatched!"</p>
            <span>- Sarah K.</span>
          </div>
        </section> */}
      </main>
      <footer className={styles["footer"]}>
        <p>&copy; 2024 Keferoma Global Resources. All rights reserved.</p>
        <div className={styles["social-links"]}>
        <BsFillTelephoneFill />
        <SiGmail />
        </div>
      </footer>
    </div>
  );
};

export default Landing;
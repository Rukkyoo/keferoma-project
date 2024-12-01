"use client";

import styles from "../page.module.scss";
import React, { useState, useEffect } from "react";
import Shop from "../Shop";
import { BsFillTelephoneFill } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaRegThumbsUp } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { IoLogoWhatsapp } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { CiUser } from "react-icons/ci";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles["landing-page-body"]}>
      <header id="home" className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1 className={styles["logo"]}>Keferoma Global Resources</h1>
          {isMobile ? (
            <div className={styles["hamburger-menu"]}>
              <button
                onClick={toggleMenu}
                className={styles["hamburger-button"]}
              >
                ☰
              </button>
              <nav
                className={`${styles["menu"]} ${
                  isMenuOpen ? styles["open"] : ""
                }`}
              >
                <ul>
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#about">About Us</a>
                  </li>
                  <li>
                    <a href="#products">Shop</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <nav className={styles["desktop-menu"]}>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#products">Shop</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
      <main className={styles["main-content"]}>
        <div className={styles["hero"]}>
          <div className={styles["hero-content"]}>
            <h2>Premium Soya Oil Retail at Your Fingertips</h2>
            <p>Bringing nature's golden goodness straight to your kitchen</p>
            <a href="#products" className={styles["cta-button"]}>
              Shop Here
            </a>
          </div>
          <img
            className={styles["hero-image"]}
            src="gnut-group.jpg"
            alt="Soya Oil"
          />
        </div>
        <div className={styles["product-highlights"]}>
          <h2>Why Choose Us?</h2>
          <div className={styles["highlights"]}>
            <div className={styles["highlight1"]}>
              <FaRegThumbsUp title="Thumbs up icon" />
              <h3>Superior Quality</h3>
              <p>We source only the finest soya oil for our customers</p>
            </div>
            <div className={styles["highlight2"]}>
              <FiPackage  title="Package icon"/>
              <h3>Wide Selection</h3>
              <p>Various sizes to suit your needs</p>
            </div>
            <div className={styles["highlight3"]}>
              <TbTruckDelivery title="Truck delivery icon"/>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping</p>
            </div>
            <div className={styles["highlight4"]}>
              <GiMoneyStack title="Money stack icon"/>
              <h3>Affordable Pricing</h3>
              <p>
                Whether you’re buying in small quantities or bulk, we provide
                competitive pricing without compromising on quality.
              </p>
            </div>
            <div className={styles["highlight5"]}>
              <CiUser title="User icon"/>
              <h3>Customer-Centric Approach</h3>
              <p>
                Your satisfaction is our top priority. From easy ordering to
                reliable delivery, we strive to provide a seamless customer
                experience.
              </p>
            </div>
          </div>
        </div>
        <div id="about" className={styles["about"]}>
          <div className={styles["about-title"]}>
            {" "}
            <h2>Your Trusted Soya Oil Retailer</h2>
          </div>
          <div className={styles["about-description"]}>
            {" "}
            <p>
              At Keferoma Global Resources, we are key distributors and
              wholesalers of Grand oil and other consumables. We're committed to
              bringing you the best soya oil on the market. With years of
              experience in the retail industry, we understand the importance of
              quality, value, and customer satisfaction.
              <br />
              <br />
              Our clients include families seeking healthy cooking oils, retail
              shops, restaurants aiming to enhance their dishes, and wholesale
              businesses needing reliable bulk supplies. No matter the size of
              your order, we are equipped to serve you with efficiency and
              professionalism.
              <br />
              <br />
              And we aim to be a leading name in the wholesale and retail
              industry, recognized for our commitment to quality,
              sustainability, and customer satisfaction.
            </p>
          </div>
        </div>
        <div id="products">
          <Shop />
        </div>
      </main>
      <footer id="contact" className={styles["footer"]}>
        <p>&copy; 2024 Keferoma Global Resources.</p>
        <div className={styles["social-links"]}>
          <a target="blank" href="tel:08033702460">
            <BsFillTelephoneFill title="Telephone icon"/>
          </a>
          <a target="blank" href="mailto:keferomaglobalresources@gmail.com">
            <SiGmail title="Gmail Icon"/>
          </a>
          <a target="blank" href="https://wa.me/+2348033702460">
            <IoLogoWhatsapp title="Whatsapp Icon"/>
          </a>
        </div>
        <p>
          Built by{" "}
          <a
            href="https://michael-portfolio-v3-yrkh.vercel.app/"
            target="blank"
          >
            Michael
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Landing;

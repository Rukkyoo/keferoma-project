"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className={styles["shop-container"]}>
      <div className={styles["search-bar-container"]}>
        <form onSubmit={handleSearchSubmit} className={styles["search-form"]}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles["search-input"]}
          />
          <button type="submit" className={styles["search-button"]}>
            <CiSearch size={25} title="Search icon" />
          </button>
        </form>
        <div className={styles["cart-icon"]}>
          <CiShoppingCart size={25} title="Shopping cart icon" />
        </div>
      </div>
      <div className={styles["cart-item-body"]}>Item menu</div>
    </div>
  );
};

export default Shop;
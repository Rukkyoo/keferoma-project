"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { products } from "./data";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const updateQuantity = (productId, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(0, (prevQuantities[productId] || 0) + change),
    }));
  };

  const handleInputChange = (productId, value) => {
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue)) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: Math.max(0, newValue),
      }));
    }
  };

  const addToCart = (productId) => {
    // Add to cart logic here
    console.log(
      `Added product ${productId} to cart with quantity ${quantities[productId]}`
    );
    // Optionally reset quantity after adding to cart
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: 0,
    }));
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
      <div className={styles["cart-item-body"]}>
        {products.map((product) => (
          <div key={product.id} className={styles["cart-item"]}>
            <div>
              <img src={product.image} width={250} alt={product.name} />
            </div>
            <div className={styles["cart-item-details"]}>
              <span>
                {product.name}
                <br />
                {product.price}
              </span>
              <div className={styles["quantity"]}>
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  disabled={quantities[product.id] === 0}
                >
                  -
                </button>
                <input
                  className={styles["quantity-input"]}
                  type="number"
                  min="0"
                  value={quantities[product.id] || 0}
                  onChange={(e) =>
                    handleInputChange(product.id, e.target.value)
                  }
                />
                <button onClick={() => updateQuantity(product.id, 1)}>+</button>
              </div>
              <button
                className={styles["add-to-cart"]}
                onClick={() => addToCart(product.id)}
                disabled={!quantities[product.id]}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;

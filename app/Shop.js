"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { products } from "./data";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
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
    const quantity = quantities[productId];
    if (quantity > 0) {
      const productToAdd = products.find((product) => product.id === productId);
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === productId);
        if (existingItem) {
          // If item already in cart, update quantity
          return prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // If item not in cart, add new item
          return [...prevCart, { ...productToAdd, quantity }];
        }
      });

      // Reset quantity for this product
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: 0,
      }));

      // Confirmation message
      alert(`Added ${quantity} ${productToAdd.name}(s) to cart`);
    }
  };

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

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
        <div className={styles["cart-icon"]} onClick={() => setCartModal(true)}>
          <CiShoppingCart size={25} title="Shopping cart icon" />
          {cart.length > 0 && (
            <span className={styles["cart-count"]}>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </div>
      </div>
      <div className={styles["cart-item-body"]}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles["cart-item"]}>
            <div>
              <img
                src={product.image}
                className={styles["cart-item-image"]}
                width={250}
                alt={product.name}
              />
            </div>
            <div className={styles["cart-item-details"]}>
              <span>
                {product.name}
                <br />₦{product.price}
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
      {cartModal && (
        <div className={styles["cart-modal"]}>
          <div className={styles["cart-modal-content"]}>
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity} - Price: ₦
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <p>
                Total: ₦
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </p>
            )}
            <button onClick={() => setCartModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
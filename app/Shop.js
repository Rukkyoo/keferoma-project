"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { products } from "./data";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dateTime: "",
    total: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

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

  const updateTotal = () => {
    const newTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setFormData((prevData) => ({
      ...prevData,
      total: newTotal,
    }));
  };

  useEffect(() => {
    updateTotal();
  }, [cart]);

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

  /* Add to Cart */
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
      /*  alert(`Added ${quantity} ${productToAdd.name}(s) to cart`); */
    }
  };

  /* Delete Specific Cart */
  const deleteSpecificCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartId));
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
            <div className={styles["image-container"]}>
              <img
                src={product.image}
                className={styles["cart-item-image"]}
                width={250}
                alt={product.name}
              />
              {product.isSoldOut && (
                <div className={styles["sold-out-overlay"]}>Sold Out</div>
              )}
            </div>
            <div className={styles["cart-item-details"]}>
              <span className={styles["cart-item-name"]}>
                {product.name}
                <br />
                <span className={styles["cart-item-price"]}>₦{product.price}</span>
                
              </span>
              {!product.isSoldOut ? (
                <>
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
                    <button onClick={() => updateQuantity(product.id, 1)}>
                      +
                    </button>
                  </div>
                  <button
                    className={styles["add-to-cart"]}
                    onClick={() => addToCart(product.id)}
                    disabled={!quantities[product.id]}
                  >
                    Add to Cart
                  </button>
                </>
              ) : (
                <p className={styles["sold-out-text"]}>This item is sold out</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {cartModal && (
        <div className={styles["cart-modal"]}>
          <div className={styles["cart-modal-outer"]}>
            <div className={styles["cart-modal-inner"]}>
              <h2>Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      {item.name} - Quantity: {item.quantity} - Price: ₦
                      {item.price * item.quantity}
                      <FaRegTrashCan
                        size={15}
                        className={styles["trash-icon"]}
                        onClick={() => deleteSpecificCart(item.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <p className={styles["total"]}>
                  Total: ₦
                  {cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </p>
              )}
              {cart.length > 0 && (
                <form className={styles["form"]} onSubmit={handleSubmit}>
                  <div className={styles["formGroup"]}>
                    <label htmlFor="name">Name: &nbsp;</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles["formGroup"]}>
                    <label htmlFor="address">Address: &nbsp;</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles["formGroup"]}>
                    <label htmlFor="dateTime">Date/Time: &nbsp;</label>
                    <input
                      type="datetime-local"
                      id="dateTime"
                      name="dateTime"
                      value={formData.dateTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles["formGroup"]}>
                    <label htmlFor="total">Total: </label>
                    <input
                      type="text"
                      id="total"
                      name="total"
                      value={`₦${cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}`}
                      readOnly
                    />
                  </div>
                  <button type="submit" className={styles["submit-button"]}>
                    Book
                  </button>
                </form>
              )}
            </div>
            <button
              className={styles["close-button"]}
              onClick={() => setCartModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import '../App.css'; // Apni CSS file import karo

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const userId = "user123"; 

  useEffect(() => {
    fetch(`http://localhost:3002/cart/${userId}`)
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Bag ({cartItems.length} Items)</h1>

      <div className="cart-layout">
        {/* Left Side: Items */}
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your bag is empty!</p>
              <button className="checkout-btn" style={{width: '200px'}}>SHOP NOW</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="item-details">
                  <img src={item.thumbnail} alt={item.title} className="item-img" />
                  <div className="item-info">
                    <h3>{item.title}</h3>
                    <p style={{color: '#888', fontSize: '12px'}}>{item.category}</p>
                    <p className="item-price">₹{Math.round(item.price * 83)}</p>
                  </div>
                </div>
                
                <div className="quantity-controls">
                  <div style={{display: 'flex', border: '1px solid #ddd'}}>
                    <button className="qty-btn">-</button>
                    <span style={{padding: '5px 15px'}}>{item.quantity || 1}</span>
                    <button className="qty-btn">+</button>
                  </div>
                  <button className="remove-btn">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Summary */}
        <aside className="order-summary">
          <h2 style={{marginBottom: '20px'}}>Order Summary</h2>
          <div className="summary-row">
            <span>Bag Total</span>
            <span>₹{Math.round(totalPrice * 83)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{color: 'green'}}>FREE</span>
          </div>
          
          <div className="total-row">
            <span>Total Amount</span>
            <span style={{color: '#ff0050'}}>₹{Math.round(totalPrice * 83)}</span>
          </div>
          
          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
        </aside>
      </div>
    </div>
  );
}
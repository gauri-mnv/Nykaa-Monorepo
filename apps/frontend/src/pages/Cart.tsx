/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import '../App.css'; // Apni CSS file import karo

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const userId = "user123"; 

  // Function to Clear Cart
  const handleClearCart = async () => {
    const confirmClear = window.confirm("Kya aap poora bag khali karna chahte hain?");
    if (!confirmClear) return;

    try {
      const response = await fetch(`https://nykaa-cart-service.onrender.com/cart/clear/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCartItems([]); // Frontend state ko turant khali kar do
        alert("Bag khali kar diya gaya hai! ✅");
      }
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };
const updateQty = async (productId: number, action: 'inc' | 'dec', currentQty: number) => {
  // Agar quantity 1 hai aur user '-' dabaye, toh kuch mat karo (ya remove pucho)
  if (action === 'dec' && currentQty <= 1) return;

  try {
    const response = await fetch(`https://nykaa-cart-service.onrender.com/cart/update/${userId}/${productId}`, {

      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });

    if (response.ok) {
      const updatedCart = await response.json();
      setCartItems(updatedCart.items);
    }
  } catch (err) {
    console.error("Update failed", err);
  }
};
  useEffect(() => {
    fetch(`https://nykaa-cart-service.onrender.com/cart/${userId}`)
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Bag ({cartItems.length} Items)</h1>

      <div className="cart-layout">
        
                      <div className="cart-items-list">
                  {cartItems.length === 0 ? (
                    <div className="empty-cart">
                      <p>Your bag is empty!</p>
                      <button className="checkout-btn" style={{ width: '200px' }}>SHOP NOW</button>
                    </div>
                  ) : (
                    <>
                      {/* --- Clear Bag Button (Sirf ek baar, sabse upar) --- */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <button 
                          onClick={handleClearCart}
                          style={{ 
                            color: '#ff4d4d', 
                            border: '1px solid #ff4d4d', 
                            background: 'none', 
                            padding: '8px 15px', 
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '12px'
                          }}
                        >
                          CLEAR BAG 🧹
                        </button>
                      </div>

                      {/* --- Individual Cart Items --- */}
                      {cartItems.map((item, index) => (
                        // Key ko unique banane ke liye item.id ya index use karein
                        <div key={item.id || index} className="cart-item-card">
                          <div className="item-details">
                            <img src={item.thumbnail} alt={item.title} className="item-img" />
                            <div className="item-info">
                              <h3>{item.title}</h3>
                              <p style={{ color: '#888', fontSize: '12px' }}>{item.category}</p>
                              <p className="item-price">₹{Math.round(item.price * 83)}</p>
                            </div>
                          </div>
                          
                          <div className="quantity-controls">
                            <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                              <button 
                                  className="qty-btn" 
                                  style={{ border: 'none', background: '#f9f9f9', cursor: 'pointer' }}
                                  onClick={() => updateQty(item.productId, 'dec', item.quantity)}
                                >
                                  -
                                </button>
                              <span style={{ padding: '5px 15px', background: '#fff' }}>{item.quantity || 1}</span>
                             {/* Plus Button */}
                                <button 
                                  className="qty-btn" 
                                  style={{ border: 'none', background: '#f9f9f9', cursor: 'pointer' }}
                                  onClick={() => updateQty(item.productId, 'inc', item.quantity)}
                                >
                                  +
                                </button>
                            </div>
                            
                            {/* --- Remove Individual Item Button --- */}
                            <button 
                              className="remove-btn"
                              style={{ 
                                color: '#888', 
                                fontSize: '12px', 
                                background: 'none', 
                                border: 'none', 
                                cursor: 'pointer',
                                textDecoration: 'underline'
                              }}
                              // Yahan tum single item delete karne ka function daal sakti ho
                              onClick={() => console.log("Delete single item", item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
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
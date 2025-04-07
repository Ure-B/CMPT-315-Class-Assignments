import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      productId: product._id,
      quantity: Number(quantity),
      email: email,
      deliveryDate,
    };

    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    if (response.ok) {
      navigate("/orders");
    } else {
      console.log(`Error: ${data.error}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#f9f9f9' }}>
      <Header pageName={"Place Order"} />
      {product ? (
        <>
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Product:</strong> {product.name}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Available Stock:</strong> {product.stock}</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'inline-block', marginBottom: '25px',textAlign: 'left', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', width: '300px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Quantity:</label>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                min="1" 
                max={product.stock} 
                required 
                style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Delivery Date:</label>
              <input 
                type="date" 
                value={deliveryDate} 
                onChange={(e) => setDeliveryDate(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              />
            </div>

            <button 
              type="submit" 
              style={{
                backgroundColor: '#333', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                fontSize: '16px', 
                border: 'none', 
                cursor: 'pointer'
              }}
            >
              Confirm Order
            </button>
          </form>
        </>
      ) : (
        <p>No product selected.</p>
      )}
      <Footer />
    </div>
  );
};

export default PlaceOrder;

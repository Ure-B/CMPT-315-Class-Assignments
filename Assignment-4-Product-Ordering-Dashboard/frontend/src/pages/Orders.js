import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data.orders))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <Header pageName={"Orders"} />

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No orders found.</p>
      ) : (
        <table 
          style={{
            width: '80%',
            margin: '20px auto',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
            borderCollapse: 'collapse'
          }}
        >
          <thead>
            <tr 
              style={{
                backgroundColor: '#333', 
                color: 'white', 
                fontWeight: 'bold'
              }}
            >
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Order ID</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Product Name</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr 
                key={order.orderId} 
                style={{
                  backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white',
                  borderBottom: '1px solid #ddd'
                }}
              >
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.orderId}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.productName}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.quantity}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.email}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {new Date(order.deliveryDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/" style={{
            textDecoration: 'none', 
            backgroundColor: '#333', 
            color: 'white', 
            fontSize: '16px', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            display: 'inline-block',
            marginBottom: '20px'
          }}>
          Back to Dashboard
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Orders;

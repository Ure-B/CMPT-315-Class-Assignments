import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/orders");
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/orders/cancel/${orderId}`, {
        method: "PUT",
      });
      if (response.ok) {
        await fetchOrders(); 
      } else {
        console.log("Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const isCancelable = (deliveryDate) => {
    const today = new Date();
    const delivery = new Date(deliveryDate);
    const diffDays = (delivery - today) / (1000 * 60 * 60 * 24);
    return diffDays > 5; 
  };

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
            <tr style={{ backgroundColor: '#333', color: 'white', fontWeight: 'bold' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Order ID</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Product Name</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Delivery Date</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Action</th>
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
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.status}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {order.status !== 'Canceled' && isCancelable(order.deliveryDate) && (
                    <button 
                      onClick={() => handleCancel(order.orderId)}
                      style={{
                        backgroundColor: 'red', 
                        color: 'white', 
                        padding: '5px 10px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  )}
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

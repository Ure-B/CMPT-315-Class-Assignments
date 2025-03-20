import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleOrderClick = (product) => {
        navigate("/placeorder", { state: { product } });
    };

    return (
        <div>
            <Header pageName={"Product Dashboard"} />
            <div style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                padding: '20px'
            }}>
                <table style={{
                    width: '80%', 
                    borderCollapse: 'collapse', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden' 
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#333', color: 'white' }}>
                            <th style={{
                                padding: '10px', 
                                textAlign: 'center', 
                                fontSize: '16px',
                                border: '1px solid #ddd' 
                            }}>Product Name</th>
                            <th style={{
                                padding: '10px', 
                                textAlign: 'center', 
                                fontSize: '16px',
                                border: '1px solid #ddd'
                            }}>Price</th>
                            <th style={{
                                padding: '10px', 
                                textAlign: 'center', 
                                fontSize: '16px',
                                border: '1px solid #ddd'
                            }}>Stock</th>
                            <th style={{
                                padding: '10px', 
                                textAlign: 'center', 
                                fontSize: '16px',
                                border: '1px solid #ddd'
                            }}>Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product._id} style={{
                                    textAlign: 'center',
                                    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' 
                                }}>
                                    <td style={{
                                        padding: '10px', 
                                        fontSize: '14px', 
                                        border: '1px solid #ddd'
                                    }}>{product.name}</td>
                                    <td style={{
                                        padding: '10px', 
                                        fontSize: '14px', 
                                        border: '1px solid #ddd'
                                    }}>${product.price}</td>
                                    <td style={{
                                        padding: '10px', 
                                        fontSize: '14px', 
                                        border: '1px solid #ddd'
                                    }}>{product.stock}</td>
                                    <td style={{
                                        padding: '10px', 
                                        fontSize: '14px', 
                                        border: '1px solid #ddd'
                                    }}>
                                        <button
                                            disabled={product.stock === 0}
                                            onClick={() => handleOrderClick(product)}
                                            style={{
                                                padding: '5px 15px', 
                                                cursor: product.stock === 0 ? 'not-allowed' : 'pointer', 
                                                backgroundColor: product.stock === 0 ? '#6c757d' : '#007BFF',
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '4px'
                                            }}
                                        >
                                            Order
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ padding: '10px', fontSize: '14px' }}>No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;

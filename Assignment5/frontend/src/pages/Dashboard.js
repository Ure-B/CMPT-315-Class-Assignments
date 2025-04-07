import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    useEffect(() => {
        applyFilters();
    }, [categoryFilter, minPrice, maxPrice, products]);

    const applyFilters = () => {
        let updatedProducts = [...products];

        if (categoryFilter) {
            updatedProducts = updatedProducts.filter(product => product.category === categoryFilter);
        }

        if (minPrice) {
            updatedProducts = updatedProducts.filter(product => product.price >= parseFloat(minPrice));
        }

        if (maxPrice) {
            updatedProducts = updatedProducts.filter(product => product.price <= parseFloat(maxPrice));
        }

        setFilteredProducts(updatedProducts);
    };

    const handleOrderClick = (product) => {
        navigate("/placeorder", { state: { product } });
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setFilteredProducts(sortedProducts);
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
        }
        return '';
    };

    const uniqueCategories = [...new Set(products.map(product => product.category))];

    return (
        <div>
            <Header pageName={"Product Dashboard"} />
            <div style={{ padding: '20px' }}>
                
                {/* Filter Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ marginRight: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category:</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            style={{
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '150px'
                            }}
                        >
                            <option value="">All</option>
                            {uniqueCategories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginRight: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Min Price:</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            style={{
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '100px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Max Price:</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            style={{
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '100px'
                            }}
                        />
                    </div>
                </div>

                {/* Product Table */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
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
                                <th
                                    onClick={() => requestSort('name')}
                                    style={{
                                        padding: '10px',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                        border: '1px solid #ddd',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Product Name{getSortArrow('name')}
                                </th>
                                <th
                                    onClick={() => requestSort('price')}
                                    style={{
                                        padding: '10px',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                        border: '1px solid #ddd',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Price{getSortArrow('price')}
                                </th>
                                <th
                                    onClick={() => requestSort('stock')}
                                    style={{
                                        padding: '10px',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                        border: '1px solid #ddd',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Stock{getSortArrow('stock')}
                                </th>
                                <th style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    border: '1px solid #ddd'
                                }}>
                                    Order
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
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
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;

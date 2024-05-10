import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Switch } from 'antd-mobile';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <>
            <List>
                {products.map(product => (
                    <List.Item key={product.id} extra={`￥${product.price}`}>
                        <div>
                            {product.brand.name}
                            {product.model.name}
                            {product.capacity.size}
                            {product.color.name}
                            {product.version.name}
                        </div>
                    </List.Item>
                ))}
            </List>
        </>
    );
};

export default HomePage;

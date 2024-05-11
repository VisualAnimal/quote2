import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Switch } from 'antd-mobile';

const apiUrl = process.env.REACT_APP_API_URL; // 使用环境变量
console.log(apiUrl);

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <>
            <List>
                {products.map(product => (
                    <List.Item key={product.id} extra={`￥${product.price}`} description={<>
                        {product.customIdentifier && (
                            <span>#{product.customIdentifier} </span>
                        )}
                        {product.describe && (
                            <span>{product.describe}</span>
                        )}
                    </>}>
                        <div>
                            {product.brand.name+' '} 
                            {product.model.name+' '} 
                            {product.capacity.size+' '}
                            {product.color.name+' '}
                            {product.version.name}
                        </div>
                    </List.Item>
                ))}
            </List>
        </>
    );
};

export default HomePage;

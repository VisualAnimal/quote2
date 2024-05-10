// React component

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        brandId: '',
        modelId: '',
        colorId: '',
        capacityId: '',
        versionId: '',
        price: '',
        describe: '',
    });

    useEffect(() => {
        getProductList();
    }, []);

    async function getProductList() {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            return;
            // await axios.post('http://localhost:3000/products', formData);
            // getProductList();
            // setFormData({
            //     brandId: '',
            //     modelId: '',
            //     colorId: '',
            //     capacityId: '',
            //     versionId: '',
            //     price: '',
            //     describe: '',
            // });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Product Management</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Brand ID:
                    <input type="text" name="brandId" value={formData.brandId} onChange={handleChange} />
                </label>
                <label>
                    Model ID:
                    <input type="text" name="modelId" value={formData.modelId} onChange={handleChange} />
                </label>
                {/* Add more input fields for other properties */}
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Product List</h2>
                {products.map((product) => (
                    <div key={product.id}>
                        <h3>{product.brand.name} / {product.model.name} / {product.capacity.size} / {product.color.name} /{product.version.name} /  </h3>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.describe}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductManagement;

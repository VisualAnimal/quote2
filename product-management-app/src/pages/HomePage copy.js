import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductCRUD() {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);
    const [capacities, setCapacities] = useState([]);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({});

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://localhost:3000/brands');
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchModelsByBrand = async (brandId) => {
        try {
            const response = await axios.get(`http://localhost:3000/models/brand/${brandId}`);
            setModels(response.data);
            setCapacities([])
            setColors([])
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const fetchColorsByModel = async (modelId) => {
        try {
            const response = await axios.get(`http://localhost:3000/colors/model/${modelId}`);
            setColors(response.data);
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };

    const fetchCapacitiesByModel = async (modelId) => {
        try {
            const response = await axios.get(`http://localhost:3000/capacities/model/${modelId}`);
            setCapacities(response.data);
        } catch (error) {
            console.error('Error fetching capacities:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/products', newProduct);
            setNewProduct({});
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleBrandChange = (e) => {
        const brandId = e.target.value;
        fetchModelsByBrand(brandId);
    };

    const handleModelChange = async (e) => {
        const modelId = e.target.value;
        fetchColorsByModel(modelId);
        fetchCapacitiesByModel(modelId);
    };

    return (
        <div>
            <h1>Product CRUD</h1>
            <form onSubmit={handleSubmit}>
                <select name="brandId" onChange={handleBrandChange}>
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                <select name="modelId" onChange={handleModelChange}>
                    <option value="">Select Model</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                </select>
                <select name="colorId" onChange={handleInputChange}>
                    <option value="">Select Color</option>
                    {colors.map((color) => (
                        <option key={color.id} value={color.id}>{color.name}</option>
                    ))}
                </select>
                <select name="capacityId" onChange={handleInputChange}>
                    <option value="">Select Capacity</option>
                    {capacities.map((capacity) => (
                        <option key={capacity.id} value={capacity.id}>{capacity.size}</option>
                    ))}
                </select>
                <input type="text" name="versionId" placeholder="Version ID" onChange={handleInputChange} />
                <input type="text" name="price" placeholder="Price" onChange={handleInputChange} />
                <input type="text" name="describe" placeholder="Description" onChange={handleInputChange} />
                <button type="submit">Add Product</button>
            </form>

            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <span>Brand Name: {product.brand.name}</span>
                        <span>Model Name: {product.model.name}</span>
                        <span>Color Name: {product.color.name}</span>
                        <span>Capacity: {product.capacity.size}</span>
                        <span>Version: {product.version.name}</span>
                        <span>Price: {product.price}</span>
                        <span>Description: {product.describe}</span>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default ProductCRUD;

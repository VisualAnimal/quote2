import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductCRUD() {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [capacities, setCapacities] = useState([]);
    const [colors, setColors] = useState([]);
    const [versions, setVersions] = useState([]);
    const [selectedCapacity, setSelectedCapacity] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [price, setPrice] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, []);

    async function fetchBrands() {
        try {
            const response = await axios.get('http://localhost:3000/api/brands');
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }

    const handleSelectBrand = async (brandId) => {
        setSelectedBrand(brandId);
        try {
            const response = await axios.get(`http://localhost:3000/api/models/brand/${brandId}`);
            setModels(response.data);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    }

    const handleSelectModel = async (modelId) => {
        setSelectedModel(modelId);
        try {
            const capacitiesResponse = await axios.get(`http://localhost:3000/api/capacities/model/${modelId}`);
            setCapacities(capacitiesResponse.data);

            const colorsResponse = await axios.get(`http://localhost:3000/api/colors/model/${modelId}`);
            setColors(colorsResponse.data);

            const versionsResponse = await axios.get(`http://localhost:3000/api/versions/model/${modelId}`);
            setVersions(versionsResponse.data);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    }

    const handleSubmit = async () => {
        try {
            // Submit the price to the server
            await axios.post('http://localhost:3000/api/products', {
                brandId: selectedBrand,
                modelId: selectedModel,
                capacityId: selectedCapacity,
                colorId: selectedColor,
                versionId: selectedVersion,
                price: parseInt(price)
            });
            // Reset the form
            setPrice('');
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting price:', error);
        }
    }

    return (
        <div>
            <h1>Product CRUD</h1>
            <div>
                <h2>All Brands</h2>
                <ul>
                    {brands.map((brand) => (
                        <li key={brand.id}>
                            {brand.name}
                            <button onClick={() => handleSelectBrand(brand.id)}>Select</button>
                            {selectedBrand === brand.id && (
                                <ul>
                                    {models.map((model) => (
                                        <li key={model.id}>
                                            {model.name}
                                            <button onClick={() => handleSelectModel(model.id)}>Select</button>
                                            {selectedModel === model.id && (
                                                <ul>
                                                    {capacities.map((capacity) => (
                                                        <li key={capacity.id}>
                                                            {capacity.size}
                                                            <button onClick={() => setSelectedCapacity(capacity.id)}>Select</button>
                                                            {selectedCapacity === capacity.id && (
                                                                <ul>
                                                                    {colors.map((color) => (
                                                                        <li key={color.id}>
                                                                            {color.name}
                                                                            <button onClick={() => setSelectedColor(color.id)}>Select</button>
                                                                            {selectedColor === color.id && (
                                                                                <ul>
                                                                                    {versions.map((version) => (
                                                                                        <li key={version.id}>
                                                                                            {version.name}
                                                                                            <button onClick={() => setSelectedVersion(version.id)}>Select</button>
                                                                                            {selectedVersion === version.id && (
                                                                                                <>
                                                                                                    <label htmlFor="price">价格:</label>
                                                                                                    <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
                                                                                                    <button onClick={handleSubmit}>提交</button>
                                                                                                    {submitted && <p>价格已提交</p>}
                                                                                                </>
                                                                                            )}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductCRUD;

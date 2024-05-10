import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModelManagement() {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [newModelName, setNewModelName] = useState('');
    const [editModelName, setEditModelName] = useState('');
    const [editModelId, setEditModelId] = useState(null);

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        if (selectedBrand) {
            fetchModels(selectedBrand);
        }
    }, [selectedBrand]);

    async function fetchBrands() {
        try {
            const response = await axios.get('http://localhost:3000/api/brands');
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }

    async function fetchModels(brandId) {
        try {
            const response = await axios.get(`http://localhost:3000/api/models/brand/${brandId}`);
            setModels(response.data);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    }

    const handleAddModel = async () => {
        try {
            await axios.post('http://localhost:3000/api/models', { name: newModelName, brandId: parseInt(selectedBrand) });
            fetchModels(selectedBrand);
            setNewModelName('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditModel = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/models/${id}`, { name: editModelName });
            fetchModels(selectedBrand);
            setEditModelId(null);
            setEditModelName('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteModel = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/models/${id}`);
            fetchModels(selectedBrand);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditInputChange = (e) => {
        setEditModelName(e.target.value);
    };

    const enableEdit = (id, name) => {
        setEditModelId(id);
        setEditModelName(name);
    };

    return (
        <div>
            <h1>Model Management</h1>
            <div>
                <h2>Select Brand</h2>
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                    <option value="">-- Select Brand --</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <h2>Add New Model</h2>
                <input
                    type="text"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                />
                <button onClick={handleAddModel}>Add Model</button>
            </div>
            <div>
                <h2>Model List</h2>
                <ul>
                    {models.map((model) => (
                        <li key={model.id}>
                            {editModelId === model.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editModelName}
                                        onChange={handleEditInputChange}
                                    />
                                    <button onClick={() => handleEditModel(model.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    {model.name}
                                    <button onClick={() => enableEdit(model.id, model.name)}>Edit</button>
                                    <button onClick={() => handleDeleteModel(model.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ModelManagement;

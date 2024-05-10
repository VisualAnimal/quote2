// React component

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BrandManagement() {
    const [brands, setBrands] = useState([]);
    const [newBrandName, setNewBrandName] = useState('');
    const [editBrandName, setEditBrandName] = useState('');
    const [editBrandId, setEditBrandId] = useState(null);

    useEffect(() => {
        getBrandList();
    }, []);

    async function getBrandList() {
        try {
            const response = await axios.get('http://localhost:3000/api/brands');
            setBrands(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleAddBrand = async () => {
        try {
            await axios.post('http://localhost:3000/api/brands', { name: newBrandName });
            getBrandList();
            setNewBrandName('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditBrand = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/brands/${id}`, { name: editBrandName });
            getBrandList();
            setEditBrandId(null);
            setEditBrandName('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteBrand = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/brands/${id}`);
            getBrandList();
        } catch (error) {
            console.error('Error:', error.response.data.message);
        }
    };

    const handleEditInputChange = (e) => {
        setEditBrandName(e.target.value);
    };

    const enableEdit = (id, name) => {
        setEditBrandId(id);
        setEditBrandName(name);
    };

    return (
        <div>
            <h1>Brand Management</h1>
            <div>
                <h2>Add New Brand</h2>
                <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                />
                <button onClick={handleAddBrand}>Add Brand</button>
            </div>
            <div>
                <h2>Brand List</h2>
                <ul>
                    {brands.map((brand) => (
                        <li key={brand.id}>
                            {editBrandId === brand.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editBrandName}
                                        onChange={handleEditInputChange}
                                    />
                                    <button onClick={() => handleEditBrand(brand.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    {brand.name}
                                    <button onClick={() => enableEdit(brand.id, brand.name)}>Edit</button>
                                    <button onClick={() => handleDeleteBrand(brand.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BrandManagement;

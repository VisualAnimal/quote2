import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; // 使用环境变量


function BrandCRUD() {
    const [brands, setBrands] = useState([]);
    const [newBrandName, setNewBrandName] = useState('');
    const [editBrandName, setEditBrandName] = useState('');
    const [editBrandId, setEditBrandId] = useState(null);
    const [showColors, setShowColors] = useState(false);
    const [showCapacities, setShowCapacities] = useState(false);
    const [showVersions, setShowVersions] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, []);

    async function fetchBrands() {
        try {
            const response = await axios.get(`${apiUrl}/api/brands`);
            const brandsWithModels = await Promise.all(response.data.map(async brand => {
                const modelsResponse = await axios.get(`${apiUrl}/api/models/brand/${brand.id}`);
                const modelsWithDetails = await Promise.all(modelsResponse.data.map(async model => {
                    const capacitiesResponse = await axios.get(`${apiUrl}/api/capacities/model/${model.id}`);
                    const colorsResponse = await axios.get(`${apiUrl}/api/colors/model/${model.id}`);
                    const versionsResponse = await axios.get(`${apiUrl}/api/versions/model/${model.id}`);
                    return {
                        ...model,
                        capacities: capacitiesResponse.data,
                        colors: colorsResponse.data,
                        versions: versionsResponse.data
                    };
                }));
                return { ...brand, models: modelsWithDetails };
            }));
            setBrands(brandsWithModels);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }

    const handleAddBrand = async () => {
        try {
            await axios.post(`${apiUrl}/api/brands`, { name: newBrandName });
            fetchBrands();
            setNewBrandName('');
        } catch (error) {
            console.error('Error adding brand:', error);
        }
    }

    const handleEditBrand = async (id) => {
        try {
            await axios.put(`${apiUrl}/api/brands/${id}`, { name: editBrandName });
            fetchBrands();
            setEditBrandId(null);
            setEditBrandName('');
        } catch (error) {
            console.error('Error editing brand:', error);
        }
    }

    const handleDeleteBrand = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/brands/${id}`);
            fetchBrands();
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    }

    const handleAddModel = async (brandId) => {
        const modelName = prompt('Enter the model name:');
        console.log(modelName);
        console.log(brandId);
        if (modelName) {
            try {
                await axios.post(`${apiUrl}/api/models`, { name: modelName, brandId: parseInt(brandId) });
                fetchBrands(); // 更新品牌列表，以便显示新添加的型号
            } catch (error) {
                console.error('Error adding model:', error);
            }
        }
    }

    const handleEditInputChange = (e) => {
        setEditBrandName(e.target.value);
    }

    const enableEdit = (id, name) => {
        setEditBrandId(id);
        setEditBrandName(name);
    }

    const handleAddCapacity = async (modelId) => {
        console.log(modelId);
        const newCapacitySize = prompt('Enter the new capacity size:');
        console.log(newCapacitySize);
        if (newCapacitySize) {
            try {
                // 发送请求将新容量添加到型号中
                await axios.post(`${apiUrl}/api/capacities`, { size: newCapacitySize, modelId: parseInt(modelId) });
                // 重新获取品牌列表以更新数据
                fetchBrands();
            } catch (error) {
                console.error('Error adding capacity:', error);
            }
        }
    }
    const handleAddColor = async (modelId) => {
        const newColorName = prompt('Enter the new color name:');
        if (newColorName) {
            try {
                // 发送请求将新颜色添加到型号中
                await axios.post(`${apiUrl}/api/colors`, { name: newColorName, modelId: parseInt(modelId) });
                // 重新获取品牌列表以更新数据
                fetchBrands();
            } catch (error) {
                console.error('Error adding color:', error);
            }
        }
    }

    const handleAddVersion = async (modelId) => {
        const newVersionName = prompt('Enter the new version name:');
        if (newVersionName) {
            try {
                // 发送请求将新版本添加到型号中
                await axios.post(`${apiUrl}/api/versions`, { name: newVersionName, modelId: parseInt(modelId) });
                // 重新获取品牌列表以更新数据
                fetchBrands();
            } catch (error) {
                console.error('Error adding version:', error);
            }
        }
    }

    const handleToggleColors = () => {
        setShowColors(!showColors);
    }

    const handleToggleCapacities = () => {
        setShowCapacities(!showCapacities);
    }

    const handleToggleVersions = () => {
        setShowVersions(!showVersions);
    }

    return (
        <div>
            <h1>Brand CRUD</h1>
            <div>
                <button onClick={handleToggleColors}>{showColors ? 'Hide Colors' : 'Show Colors'}</button>
                <button onClick={handleToggleCapacities}>{showCapacities ? 'Hide Capacities' : 'Show Capacities'}</button>
                <button onClick={handleToggleVersions}>{showVersions ? 'Hide Versions' : 'Show Versions'}</button>
            </div>
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
                                    <div>
                                        <span>{brand.name}</span>
                                        <button onClick={() => enableEdit(brand.id, brand.name)}>Edit</button>
                                        <button onClick={() => handleDeleteBrand(brand.id)}>Delete</button>
                                        <button onClick={() => handleAddModel(brand.id)}>Add Model</button>
                                    </div>
                                    <ul>
                                        {brand.models.map(model => (
                                            <li key={model.id}>
                                                {model.name}
                                                <ul>
                                                    {showCapacities && (
                                                        <>
                                                            <li>容量: <button onClick={() => handleAddCapacity(model.id)}>Add Capacity</button></li>
                                                            <ul>
                                                                {model.capacities.map(capacity => (
                                                                    <li key={capacity.id}>
                                                                        {capacity.size}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    )}
                                                    {showColors && (
                                                        <>
                                                            <li>颜色: <button onClick={() => handleAddColor(model.id)}>Add Color</button></li>
                                                            <ul>
                                                                {model.colors.map(color => (
                                                                    <li key={color.id}>{color.name}</li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    )}
                                                    {showVersions && (
                                                        <>
                                                            <li>版本: <button onClick={() => handleAddVersion(model.id)}>Add Version</button></li>
                                                            <ul>
                                                                {model.versions.map(version => (
                                                                    <li key={version.id}>{version.name}</li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    )}

                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BrandCRUD;

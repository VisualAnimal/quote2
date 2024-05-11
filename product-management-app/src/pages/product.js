import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

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
    const [showSelectedDetails, setShowSelectedDetails] = useState(false);
    const [showUl, setShowUl] = useState(true);
    const [price, setPrice] = useState('');
    const [customIdentifier, setCustomIdentifier] = useState('');
    const [description, setDescription] = useState('');
    const [describeTags, setDescribeTags] = useState([]);
    const [selectedDescribeTags, setSelectedDescribeTags] = useState([]);

    useEffect(() => {
        fetchBrands();
        // 获取描述标签数据
        fetchDescribeTags();
    }, []);

    async function fetchBrands() {
        try {
            const response = await axios.get(`${apiUrl}/api/brands`);
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }
    async function fetchDescribeTags() {
        try {
            const response = await axios.get(`${apiUrl}/api/describe-tags`);
            setDescribeTags(response.data);
        } catch (error) {
            console.error('Error fetching describe tags:', error);
        }
    }

    const handleSelectBrand = async (brand) => {
        setSelectedBrand(brand);
        try {
            const response = await axios.get(`${apiUrl}/api/models/brand/${brand.id}`);
            setModels(response.data);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    }

    const handleSelectModel = async (model) => {
        setSelectedModel(model);
        try {
            const capacitiesResponse = await axios.get(`${apiUrl}/api/capacities/model/${model.id}`);
            setCapacities(capacitiesResponse.data);

            const colorsResponse = await axios.get(`${apiUrl}/api/colors/model/${model.id}`);
            setColors(colorsResponse.data);

            const versionsResponse = await axios.get(`${apiUrl}/api/versions/model/${model.id}`);
            setVersions(versionsResponse.data);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    }

    const handleSelectVersion = async (version) => {
        setSelectedVersion(version);
        setShowSelectedDetails(true);
        setShowUl(false);
    }

    const handleAddDescription = (tagName) => {
        setDescription(description + tagName + '，');
    };


    const handleSubmit = async () => {
        // 构建需要提交的数据
        const data = {
            brandId: selectedBrand ? selectedBrand.id : null,
            modelId: selectedModel ? selectedModel.id : null,
            capacityId: selectedCapacity ? selectedCapacity.id : null,
            colorId: selectedColor ? selectedColor.id : null,
            versionId: selectedVersion ? selectedVersion.id : null,
            price: parseInt(price),
            describe: description,
            customIdentifier: customIdentifier
            // customIdentifier: 'customIdentifier'
        };
        console.log(data);

        try {
            // 发送 POST 请求，将数据提交给后端
            const response = await axios.post(`${apiUrl}/api/products`, data);
            // 处理提交成功的情况
            console.log('Product submitted successfully:', response.data);
            return
            // 清空表单数据
            setSelectedBrand(null);
            setSelectedModel(null);
            setSelectedCapacity(null);
            setSelectedColor(null);
            setSelectedVersion(null);
            setPrice('');
            setDescription('');
            setCustomIdentifier('');
            setShowSelectedDetails(false);
            setShowUl(true);
            // 可选：显示提交成功的提示或重定向到其他页面
        } catch (error) {
            // 处理提交失败的情况
            console.error('Error submitting product:', error);
            // 可选：显示提交失败的提示
        }
    }

    return (
        <div>
            <h1>Product CRUD</h1>
            <div>
                <h2>All Brands</h2>
                {showUl && (
                    <ul>
                        {brands.map((brand) => (
                            <li key={brand.id}>
                                {brand.name}
                                <button onClick={() => handleSelectBrand(brand)}>Select</button>
                                {selectedBrand && selectedBrand.id === brand.id && (
                                    <ul>
                                        {models.map((model) => (
                                            <li key={model.id}>
                                                {model.name}
                                                <button onClick={() => handleSelectModel(model)}>Select</button>
                                                {selectedModel && selectedModel.id === model.id && (
                                                    <ul>
                                                        {capacities.map((capacity) => (
                                                            <li key={capacity.id}>
                                                                {capacity.size}
                                                                <button onClick={() => setSelectedCapacity(capacity)}>Select</button>
                                                                {selectedCapacity && selectedCapacity.id === capacity.id && (
                                                                    <ul>
                                                                        {colors.map((color) => (
                                                                            <li key={color.id}>
                                                                                {color.name}
                                                                                <button onClick={() => setSelectedColor(color)}>Select</button>
                                                                                {selectedColor && selectedColor.id === color.id && (
                                                                                    <ul>
                                                                                        {versions.map((version) => (
                                                                                            <li key={version.id}>
                                                                                                {version.name}
                                                                                                <button onClick={() => handleSelectVersion(version)}>Select</button>
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
                )}
                {showSelectedDetails && (
                    <div>
                        <span>{selectedBrand ? selectedBrand.name : ''}</span>
                        <span>{selectedModel ? selectedModel.name : ''}</span>
                        <span>{selectedCapacity ? selectedCapacity.size : ''}</span>
                        <span>{selectedColor ? selectedColor.name : ''}</span>
                        <span>{selectedVersion ? selectedVersion.name : ''}</span>
                        <div>
                            价格：<input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
                        </div>
                        <div>
                            编号：（可选）<input type="text" value={customIdentifier} onChange={(e) => setCustomIdentifier(e.target.value)} placeholder="Enter custom identifier" />
                            {/* 在这里遍历出所有describe tag */}
                            {describeTags.map((tag) => (
                                <div key={tag.id}>
                                    <button onClick={() => handleAddDescription(tag.name)}>
                                        {tag.name}
                                    </button>
                                </div>
                            ))}

                        </div>
                        <div>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                        </div>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ProductCRUD;

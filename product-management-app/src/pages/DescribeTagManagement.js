import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; // 使用环境变量


function DescribeTagManagement() {
    const [describeTags, setDescribeTags] = useState([]);
    const [newDescribeTagName, setNewDescribeTagName] = useState('');
    const [editDescribeTagName, setEditDescribeTagName] = useState('');
    const [editDescribeTagId, setEditDescribeTagId] = useState(null);

    useEffect(() => {
        getDescribeTagList();
    }, []);

    async function getDescribeTagList() {
        try {
            const response = await axios.get(`${apiUrl}/api/describe-tags`);
            setDescribeTags(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleAddDescribeTag = async () => {
        try {
            await axios.post(`${apiUrl}/api/describe-tags`, { name: newDescribeTagName });
            getDescribeTagList();
            setNewDescribeTagName('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditDescribeTag = async (id) => {
        try {
            await axios.put(`${apiUrl}/api/describe-tags/${id}`, { name: editDescribeTagName });
            getDescribeTagList();
            setEditDescribeTagId(null);
            setEditDescribeTagName('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteDescribeTag = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/describe-tags/${id}`);
            getDescribeTagList();
        } catch (error) {
            console.error('Error:', error.response.data.message);
        }
    };

    const handleEditDescribeTagInputChange = (e) => {
        setEditDescribeTagName(e.target.value);
    };

    const enableEditDescribeTag = (id, name) => {
        setEditDescribeTagId(id);
        setEditDescribeTagName(name);
    };

    return (
        <div>
            <h1>Describe Tag Management</h1>
            <div>
                <h2>Add New Describe Tag</h2>
                <input
                    type="text"
                    value={newDescribeTagName}
                    onChange={(e) => setNewDescribeTagName(e.target.value)}
                />
                <button onClick={handleAddDescribeTag}>Add Describe Tag</button>
            </div>
            <div>
                <h2>Describe Tag List</h2>
                <ul>
                    {describeTags.map((describeTag) => (
                        <li key={describeTag.id}>
                            {editDescribeTagId === describeTag.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editDescribeTagName}
                                        onChange={handleEditDescribeTagInputChange}
                                    />
                                    <button onClick={() => handleEditDescribeTag(describeTag.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    {describeTag.name}
                                    <button onClick={() => enableEditDescribeTag(describeTag.id, describeTag.name)}>Edit</button>
                                    <button onClick={() => handleDeleteDescribeTag(describeTag.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DescribeTagManagement;

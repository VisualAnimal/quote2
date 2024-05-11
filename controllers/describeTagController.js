const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 获取所有描述标签
const getDescribeTags = async (req, res) => {
    try {
        const describeTags = await prisma.describeTag.findMany();
        res.json(describeTags);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching describe tags' });
    }
};

// 创建描述标签
const createDescribeTag = async (req, res) => {
    const { name } = req.body;
    // console.log(name);
    // return
    try {
        const describeTag = await prisma.describeTag.create({
            data: {
                name: name,
            },
        });
        res.json(describeTag);
    } catch (error) {
        res.status(500).json({ error: 'Error creating describe tag' });
    }
};

// 更新描述标签
const updateDescribeTag = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    try {
        const updatedDescribeTag = await prisma.describeTag.update({
            where: { id: id },
            data: {
                name: name,
            },
        });
        res.json(updatedDescribeTag);
    } catch (error) {
        res.status(500).json({ error: 'Error updating describe tag' });
    }
};

// 删除描述标签
const deleteDescribeTag = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.describeTag.delete({
            where: { id: id },
        });
        res.json({ message: 'Describe tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting describe tag' });
    }
};

module.exports = {
    getDescribeTags,
    createDescribeTag,
    updateDescribeTag,
    deleteDescribeTag,
};

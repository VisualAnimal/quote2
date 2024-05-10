const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                model: true,
                capacity: true,
                color: true,
                version: true

            },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    const { brandId, modelId, colorId, capacityId, versionId, price, describe } = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                brandId: Number(brandId),
                modelId: Number(modelId),
                colorId: Number(colorId),
                capacityId: Number(capacityId),
                versionId: Number(versionId),
                price: Number(price),
                describe,
            },
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { brandId, modelId, colorId, capacityId, versionId, price, describe } = req.body;
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                brandId: Number(brandId),
                modelId: Number(modelId),
                colorId: Number(colorId),
                capacityId: Number(capacityId),
                versionId: Number(versionId),
                price: Number(price),
                describe,
            },
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router
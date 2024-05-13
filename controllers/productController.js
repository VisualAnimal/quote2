const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 获取所有产品
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                model: true,
                color: true,
                capacity: true,
                version: true,
            },
            orderBy: [
                {
                    updatedAt: 'desc'
                }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// 创建新产品
const createProduct = async (req, res) => {
    const {
        brandId,
        modelId,
        colorId,
        capacityId,
        versionId,
        price,
        describe,
        customIdentifier,
    } = req.body;

    try {
        console.log(req.body);
        const newProduct = await prisma.product.create({
            data: {
                brandId,
                modelId,
                colorId,
                capacityId,
                versionId,
                price,
                describe,
                customIdentifier
            },
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 更新产品
const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const {
        brandId,
        modelId,
        colorId,
        capacityId,
        versionId,
        price,
        describe,
    } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                brandId,
                modelId,
                colorId,
                capacityId,
                versionId,
                price,
                describe,
            },
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 删除产品
const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.product.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};

// const productController = {
//     createProduct: createOne('product'),
//     getProducts: getMany('product'),
//     getProductById: getById('product'),
//     updateProductById: updateById('product'),
//     deleteProductById: deleteById('product'),
// };

// module.exports = productController;

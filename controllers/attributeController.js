const {
    createOne,
    getMany,
    getManyByParentId,
    getById,
    updateById,
    deleteById,
} = require('./crudController');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const brandController = {
    createBrand: createOne('brand'),
    getBrands: getMany('brand'),
    getBrandById: getById('brand'),
    updateBrandById: updateById('brand'),
    deleteBrandById: deleteById('brand'),
};

const modelController = {
    createModel: createOne('model'),
    getModelsByBrandId: getManyByParentId('model', 'brandId'),
    getModelById: getById('model'),
    updateModelById: updateById('model'),
    deleteModelById: deleteById('model'),
};

const capacityController = {
    createCapacity: createOne('capacity'),
    getCapacitiesByModelId: getManyByParentId('capacity', 'modelId'),
    getCapacityById: getById('capacity'),
    updateCapacityById: updateById('capacity'),
    deleteCapacityById: deleteById('capacity'),
};

const colorController = {
    createColor: createOne('color'),
    getColorsByModelId: getManyByParentId('color', 'modelId'),
    getColorById: getById('color'),
    updateColorById: updateById('color'),
    deleteColorById: deleteById('color'),
};

const versionController = {
    createVersion: createOne('version'),
    getVersionsByModelId: getManyByParentId('version', 'modelId'),
    getVersionById: getById('version'),
    updateVersionById: updateById('version'),
    deleteVersionById: deleteById('version'),
};


const attribute = (model) => async (req, res) => {
    try {
        const results = await prisma[model].findMany({
            include: {
                models: {
                    include:{
                        capacities: true,
                        colors: true,
                        versions: true
                    }
                }
            }
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: `Could not retrieve ${model}s` });
    }
};

const attributeController = {
    getAttribute: attribute('brand')
}

module.exports = {
    brandController,
    modelController,
    capacityController,
    colorController,
    versionController,
    attributeController,
};

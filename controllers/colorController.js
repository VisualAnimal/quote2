// controllers/colorController.js

const {
    createOne,
    getMany,
    getById,
    updateById,
    deleteById,
} = require('./crudController'); // 假设通用控制器文件路径为'./genericCrudController'

const createColor = createOne('color');
const getColorsByModelId = async (req, res) => {
    const { modelId } = req.params;
    try {
        const colors = await prisma.color.findMany({
            where: {
                modelId: parseInt(modelId),
            },
        });
        res.json(colors);
    } catch (error) {
        res.status(500).json({ error: `Could not retrieve colors for model with id ${modelId}` });
    }
};
const getColorById = getById('color');
const updateColorById = updateById('color');
const deleteColorById = deleteById('color');

module.exports = {
    createColor,
    getColorsByModelId,
    getColorById,
    updateColorById,
    deleteColorById,
};

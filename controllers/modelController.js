// controllers/modelController.js

const { 
    createOne,
    getMany,
    getById,
    updateById,
    deleteById,
  } = require('./crudController'); // 假设通用控制器文件路径为'./genericCrudController'
  
  const createModel = createOne('model');
  const getModelsByBrandId = async (req, res) => {
    const { brandId } = req.params;
    try {
      const models = await prisma.model.findMany({
        where: {
          brandId: parseInt(brandId),
        },
      });
      res.json(models);
    } catch (error) {
      res.status(500).json({ error: `Could not retrieve models for brand with id ${brandId}` });
    }
  };
  const getModelById = getById('model');
  const updateModelById = updateById('model');
  const deleteModelById = deleteById('model');
  
  module.exports = {
    createModel,
    getModelsByBrandId,
    getModelById,
    updateModelById,
    deleteModelById,
  };
  
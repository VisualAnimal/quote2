const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generic CRUD controller
const createOne = (model) => async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma[model].create({ data });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Could not create ${model}` });
  }
};

const getMany = (model) => async (req, res) => {
  try {
    const results = await prisma[model].findMany();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: `Could not retrieve ${model}s` });
  }
};

const getManyByParentId = (model, parentIdField) => async (req, res) => {
  const { id } = req.params; // 通过 req.params.parentId 获取参数
  try {
    const items = await prisma[model].findMany({
      where: {
        [parentIdField]: parseInt(id),
      },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: `Could not retrieve ${model}s for parent with id ${parentId}` });
  }
};



const getById = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma[model].findUnique({ where: { id: parseInt(id) } });
    if (!result) {
      return res.status(404).json({ error: `${model} not found` });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Could not retrieve ${model}` });
  }
};

const updateById = (model) => async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await prisma[model].update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Could not update ${model}` });
  }
};

const deleteById = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    await prisma[model].delete({ where: { id: parseInt(id) } });
    res.json({ message: `${model} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: `Could not delete ${model}` });
  }
};

module.exports = {
  createOne,
  getMany,
  getManyByParentId,
  getById,
  updateById,
  deleteById,
};

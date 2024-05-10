// capacityController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createCapacity(req, res) {
  const { size, modelId } = req.body;
  try {
    const capacity = await prisma.capacity.create({
      data: {
        size,
        modelId: Number(modelId),
      },
    });
    res.json(capacity);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getCapacities(req, res) {
  try {
    const capacities = await prisma.capacity.findMany();
    res.json(capacities);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getCapacityById(req, res) {
  const { id } = req.params;
  try {
    const capacity = await prisma.capacity.findUnique({
      where: { id: Number(id) },
    });
    if (!capacity) {
      return res.status(404).json({ error: 'Capacity not found' });
    }
    res.json(capacity);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateCapacityById(req, res) {
  const { id } = req.params;
  const { size } = req.body;
  try {
    const updatedCapacity = await prisma.capacity.update({
      where: { id: Number(id) },
      data: {
        size,
      },
    });
    res.json(updatedCapacity);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteCapacityById(req, res) {
  const { id } = req.params;
  try {
    await prisma.capacity.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Capacity deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

module.exports = { createCapacity, getCapacities, getCapacityById, updateCapacityById, deleteCapacityById };

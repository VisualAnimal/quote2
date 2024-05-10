// versionController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createVersion(req, res) {
  const { name, modelId } = req.body;
  try {
    const version = await prisma.version.create({
      data: {
        name,
        modelId: Number(modelId),
      },
    });
    res.json(version);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getVersions(req, res) {
  try {
    const versions = await prisma.version.findMany();
    res.json(versions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getVersionById(req, res) {
  const { id } = req.params;
  try {
    const version = await prisma.version.findUnique({
      where: { id: Number(id) },
    });
    if (!version) {
      return res.status(404).json({ error: 'Version not found' });
    }
    res.json(version);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateVersionById(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedVersion = await prisma.version.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    res.json(updatedVersion);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteVersionById(req, res) {
  const { id } = req.params;
  try {
    await prisma.version.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Version deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

module.exports = { createVersion, getVersions, getVersionById, updateVersionById, deleteVersionById };

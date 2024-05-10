// modelRoutes.js

const express = require('express');
const router = express.Router();
const { createModel, getModels, getModelById, updateModelById, deleteModelById } = require('../controllers/modelController');

router.post('/model', createModel);
router.get('/model', getModels);
router.get('/model/:id', getModelById);
router.put('/model/:id', updateModelById);
router.delete('/model/:id', deleteModelById);

module.exports = router;

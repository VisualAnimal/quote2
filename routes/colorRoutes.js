// colorRoutes.js

const express = require('express');
const router = express.Router();
const { createColor, getColors, getColorById, updateColorById, deleteColorById } = require('../controllers/colorController');

router.post('/color', createColor);
router.get('/color', getColors);
router.get('/color/:id', getColorById);
router.put('/color/:id', updateColorById);
router.delete('/color/:id', deleteColorById);

module.exports = router;

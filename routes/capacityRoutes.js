// capacityRoutes.js

const express = require('express');
const router = express.Router();
const { createCapacity, getCapacities, getCapacityById, updateCapacityById, deleteCapacityById } = require('../controllers/capacityController');

router.post('/capacity', createCapacity);
router.get('/capacity', getCapacities);
router.get('/capacity/:id', getCapacityById);
router.put('/capacity/:id', updateCapacityById);
router.delete('/capacity/:id', deleteCapacityById);

module.exports = router;

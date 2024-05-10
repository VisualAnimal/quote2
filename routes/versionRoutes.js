// versionRoutes.js

const express = require('express');
const router = express.Router();
const { createVersion, getVersions, getVersionById, updateVersionById, deleteVersionById } = require('../controllers/versionController');

router.post('/version', createVersion);
router.get('/version', getVersions);
router.get('/version/:id', getVersionById);
router.put('/version/:id', updateVersionById);
router.delete('/version/:id', deleteVersionById);

module.exports = router;

// routes.js

const express = require('express');
const router = express.Router();
const { createBrand, getBrands, getBrandById, updateBrandById, deleteBrandById } = require('../controllers/brandController');

router.post('/brand', createBrand);
router.get('/brand', getBrands);
router.get('/brand/:id', getBrandById);
router.put('/brand/:id', updateBrandById);
router.delete('/brand/:id', deleteBrandById);

module.exports = router;

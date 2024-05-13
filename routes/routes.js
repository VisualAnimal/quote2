const express = require('express');
const router = express.Router();
const controllers = require('../controllers/attributeController');
const productController = require('../controllers/productController')
const describeTagController = require('../controllers/describeTagController')

// Brand routes
router.post('/brands', controllers.brandController.createBrand);
router.get('/brands', controllers.brandController.getBrands);
router.get('/brands/:id', controllers.brandController.getBrandById);
router.put('/brands/:id', controllers.brandController.updateBrandById);
router.delete('/brands/:id', controllers.brandController.deleteBrandById);

// Model routes
router.post('/models', controllers.modelController.createModel);
router.get('/models/brand/:id', controllers.modelController.getModelsByBrandId);
router.get('/models/:id', controllers.modelController.getModelById);
router.put('/models/:id', controllers.modelController.updateModelById);
router.delete('/models/:id', controllers.modelController.deleteModelById);

// Color routes
router.post('/colors', controllers.colorController.createColor);
router.get('/colors/model/:id', controllers.colorController.getColorsByModelId);
router.get('/colors/:id', controllers.colorController.getColorById);
router.put('/colors/:id', controllers.colorController.updateColorById);
router.delete('/colors/:id', controllers.colorController.deleteColorById);

// Capacity routes
router.post('/capacities', controllers.capacityController.createCapacity);
router.get('/capacities/model/:id', controllers.capacityController.getCapacitiesByModelId);
router.get('/capacities/:id', controllers.capacityController.getCapacityById);
router.put('/capacities/:id', controllers.capacityController.updateCapacityById);
router.delete('/capacities/:id', controllers.capacityController.deleteCapacityById);

// Version routes
router.post('/versions', controllers.versionController.createVersion);
router.get('/versions/model/:id', controllers.versionController.getVersionsByModelId);
router.get('/versions/:id', controllers.versionController.getVersionById);
router.put('/versions/:id', controllers.versionController.updateVersionById);
router.delete('/versions/:id', controllers.versionController.deleteVersionById);

// attribute routes
router.get('/attributes', controllers.attributeController.getAttribute)

// Product routes
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
// router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Describe tag routes
router.post('/describe-tags', describeTagController.createDescribeTag);
router.get('/describe-tags', describeTagController.getDescribeTags);
// router.get('/describe-tags', describeTagController.getDescribeTags);
router.put('/describe-tags/:id', describeTagController.updateDescribeTag);
router.delete('/describe-tags/:id', describeTagController.deleteDescribeTag);

module.exports = router
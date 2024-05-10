const { 
    createOne,
    getMany,
    getById,
    updateById,
    deleteById,
  } = require('./crudController'); // 假设通用控制器文件路径为'./genericCrudController'
  
  const createBrand = createOne('brand');
  const getBrands = getMany('brand');
  const getBrandById = getById('brand');
  const updateBrandById = updateById('brand');
  const deleteBrandById = deleteById('brand');
  
  module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById,
  };
  
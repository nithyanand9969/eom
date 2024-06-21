const productModel = require("../models/productModel");

//all product api /api/v1/products
exports.getProducts = async (req, res, next) => {
  const query = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await productModel.find(query);

  res.json({
    success: true,

    products,
  });
};
//single product Api /api/v1/products/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "unable to get product ID",
    });
  }
};

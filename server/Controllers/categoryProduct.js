const categoryProductModel = require("../Models/categoryProduct");

const getAllProductToCategory = (req, res, next) => {
  const { categoryId } = req.body;
  try {
    const [result] = categoryProductModel.findAllProductToCategory(categoryId);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProductToCategory,
};

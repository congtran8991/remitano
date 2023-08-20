const categoryModel = require("../Models/category");

const createNewCategory = async (req, res, next) => {
  try {
    const { name, image, description, url, active, parent } = req.body;
    const category = new categoryModel();
    category = await category.save(
      name,
      image,
      description,
      url,
      active,
      parent
    );
    return res.status(200).json({
      status: 200,
      message: "Post Created",
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async () => {
  try {
    const [result] = await categoryModel.findAll();
    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewCategory,
  getAllCategory,
};

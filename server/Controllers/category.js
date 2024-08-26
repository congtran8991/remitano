const categoryModel = require("../Models/category");

const createNewCategory = async (req, res, next) => {
  try {
    const { name, image, description, url, active, parentId } = req.body;
    console.log(req.body, "svhshvhshvs");
    const category = new categoryModel(
      name,
      image,
      description,
      url,
      active,
      parentId || null
    );
    await category.save();
    return res.status(200).json({
      status: 200,
      message: "Post Created",
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (_, res, next) => {
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

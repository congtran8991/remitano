const productModel = require("../Models/product");
const categoryProductModel  = require("../Models/categoryProduct");


const createNewProduct = async (req, res, next) => {
  console.log(req.body,"req.body")
  try {
    const {
      name,
      amount,
      price,
      oldPrice,
      optionValue,
      images,
      description,
      specs,
      categoryId
    } = req.body;

    let newProduct =  new productModel(
      name,
      amount,
      price,
      oldPrice,
      optionValue,
      images,
      description,
      specs
    );

    newProduct = await newProduct.save();

    let newProductCategory = new categoryProductModel(categoryId, newProduct?.id)
    newProductCategory = await newProductCategory.save()

    return res.status(200).json({
      isSuccess: true,
      message: "Success",
    });
  } catch (err) {
    next(err);
  }
};

const getAllProduct = async (_, res, next) => {
  try {
    const [result] = await productModel.findAll();
    return res
      .status(200)
      .json({ isSuccess: true, message: "success", data: result[0] });
  } catch (error) {
    next(error);
  }
};

const getProductsFromCategory = async()=>  {
  try {

  } catch(error){

  }
 }
module.exports = { createNewProduct, getAllProduct };

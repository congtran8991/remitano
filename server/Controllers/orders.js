const ordersModel = require("../Models/orders");

const createNewOrders = async (req, res, next) => {
  try {
    const { orderTime, sumPrice, userId } = req.body;
    const orders = new ordersModel();
    orders = await orders.save(
        orderTime, sumPrice, userId
    );
    return res.status(200).json({
      status: 200,
      message: "Orders Created",
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async () => {
  try {
    const [result] = await ordersModel.findAll();
    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewOrders,
  getAllOrders
};

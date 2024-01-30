const Order = require("../models/Order");

module.exports = {
  getUserOrders: async (req, res) => {
    const userId = req.params.id;
    try {
      const userOrders = await Order.find({ userId })
        .populate({
          path: "productId",
          select: "-description -product_location",
        })
        .exec();
      res
        .status(200)
        .json({ messagee: "Successfully get user orders", data: userOrders });
    } catch (error) {
      res.status(500).json({ messagee: error });
    }
  },
};

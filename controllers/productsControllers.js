const Product = require("../models/Product");

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("Product created successfully");
    } catch (error) {
      res.status(500).json("failed to create product");
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      console.log(123);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("failed to get products");
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json("failed to get the product1");
    }
  },
  searchProduct: async (req, res) => {
    try {
      const result = await Product.aggregate([
        {
          $search: {
            index: "cloth",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json("failed to search the product");
    } finally {
      console.log("end");
    }
  },
};

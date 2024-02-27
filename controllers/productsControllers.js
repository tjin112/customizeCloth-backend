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
    console.log(req.query);
    try {
      // const products = await Product.find({
      //   pid: req.query.pid,
      //   cid: req.query.cid,
      // }).sort({ createdAt: -1 });

      if (req.query.pid && req.query.cid) {
        const products = await Product.find({
          pid: req.query.pid,
          cid: req.query.cid,
        }).sort({ createdAt: -1 });
        return res.status(200).json(products);
      } else if (req.query.pid && !req.query.cid) {
        const products = await Product.find({
          pid: req.query.pid,
        }).sort({ createdAt: -1 });
        return res.status(200).json(products);
      } else {
        const products = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json(products);
      }
      // console.log("products", products);
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

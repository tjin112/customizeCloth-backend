const Category = require("../models/Category ");
const mongoose = require("mongoose");

module.exports = {
  addCategory: async (req, res) => {
    const newCate = new Category(req.body);
    console.log("req.body", req.body.children);
    try {
      // 如果pid为0，则添加parentCate
      if (req.body.pid === 0) {
        await newCate.save();
        return res.status(200).json({ message: "successfully saved new cate" });
      } else {
        // 如果pid 不为0，则添加子分类
        const updatedCategory = await Category.findOneAndUpdate(
          { pid: req.body.pid },
          { $push: { children: req.body.children } },
          { new: true }
        );
        if (!updatedCategory) {
          return res
            .status(404)
            .json({ success: false, error: "Category not found" });
        }

        return res.status(200).json({ success: true, data: updatedCategory });
      }
    } catch (error) {
      res.status(500).json("failed to create category", error);
    }
  },

  getCategory: async (req, res) => {
    try {
      const allCategories = await Category.find();

      res.status(200).json({ message: "Successful", data: allCategories });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Failed to get Category",
        error: "Internal Server Error",
      });
    }
  },

  deleteCategory: async (req, res) => {
    // pid , cid
    const { pid, cid } = req.body;
    if (pid && !cid) {
      try {
        const deletedCategory = await Category.findOneAndDelete({
          pid: pid,
        });
        if (!deletedCategory) {
          return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({
          message: "Successfully deleted category",
        });
      } catch {
        res.status(500).json({
          message: "Failed to delete category",
        });
      }
    } else if (pid && cid) {
      const updatedCategory = await Category.findOneAndUpdate(
        { pid: parseInt(pid) },
        { $pull: { children: { _id: cid } } },
        { new: true }
      );

      if (!updatedCategory) {
        return res
          .status(404)
          .json({ success: false, error: "Category not found" });
      }

      res.status(200).json({ success: true, data: updatedCategory });
    }
  },

  updateCategoryDetails: async (req, res) => {
    try {
      const { pid, cid } = req.body; // 通过请求体获取 pid 和 cid
      const { newCateName } = req.body; // 通过请求体获取新的 cate_name

      if (cid) {
        // 如果 cid 存在，则根据 pid 和 cid 找到对应的 children 中的 cate_name 进行修改
        if (!mongoose.isValidObjectId(cid)) {
          return res.status(400).json({ success: false, error: "Invalid cid" });
        }

        const updatedCategory = await Category.findOneAndUpdate(
          { pid: parseInt(pid), "children._id": cid },
          { $set: { "children.$.cate_name": newCateName } },
          { new: true }
        );

        if (!updatedCategory) {
          return res
            .status(404)
            .json({ success: false, error: "Category not found" });
        }

        res.status(200).json({ success: true, data: updatedCategory });
      } else {
        // 如果 cid 不存在，则根据 pid 直接修改 cate_name
        console.log("pid", pid, newCateName);
        const updatedCategory = await Category.findOneAndUpdate(
          { pid: pid },
          { $set: { cate_name: newCateName } },
          { new: true }
        );

        if (!updatedCategory) {
          return res
            .status(404)
            .json({ success: false, error: "Category not found" });
        }

        res.status(200).json({ success: true, data: updatedCategory });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
};

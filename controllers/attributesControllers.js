const Attributes = require("../models/Attributes");

module.exports = {
  saveAttire: async (req, res) => {
    try {
      // 从请求体中获取数据
      const { attrName, attr } = req.body;

      // 创建新的 Attire 文档实例
      const newAttire = new Attributes({ attrName, attr });

      // 保存到数据库
      const savedAttire = await newAttire.save();

      // 返回成功响应
      res
        .status(201)
        .json({ message: "Attire saved successfully", attire: savedAttire });
    } catch (error) {
      // 处理错误
      console.error("保存失败:", error);
      res
        .status(500)
        .json({ message: "Failed to save attire", error: error.message });
    }
  },
  getAllAttributes: async (req, res) => {
    try {
      // 查找所有属性数据
      const attributes = await Attributes.find();

      // 返回成功响应
      res.status(200).json(attributes);
    } catch (error) {
      // 处理错误
      console.error("获取属性数据失败:", error);
      res
        .status(500)
        .json({ message: "Failed to get attributes", error: error.message });
    }
  },
};

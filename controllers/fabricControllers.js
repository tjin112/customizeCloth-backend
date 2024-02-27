const Fabric = require("../models/Fabric");

module.exports = {
  saveFabric: async (req, res) => {
    try {
      // 从请求体中获取数据
      const { name, imageUrl } = req.body;

      // 创建新的 Attire 文档实例
      const newFabric = new Fabric({ name, imageUrl });

      // 保存到数据库
      const savedFabric = await newFabric.save();

      // 返回成功响应
      res
        .status(201)
        .json({ message: "Attire saved successfully", fabric: savedFabric });
    } catch (error) {
      // 处理错误
      console.error("保存失败:", error);
      res
        .status(500)
        .json({ message: "Failed to save attire", error: error.message });
    }
  },
  getAllFrabic: async (req, res) => {
    try {
      // 查找所有属性数据
      const fabric = await Fabric.find();

      // 返回成功响应
      res.status(200).json(fabric);
    } catch (error) {
      // 处理错误
      console.error("获取属性数据失败:", error);
      res
        .status(500)
        .json({ message: "Failed to get attributes", error: error.message });
    }
  },
};

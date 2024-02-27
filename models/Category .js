const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 定义子分类的Schema
const ChildCategorySchema = new Schema({
  id: { type: Number },
  cate_name: { type: String },
  pic: { type: String },
  big_pic: String,
  is_del: Boolean,
  pid: { type: Number }, // 添加pid字段
});

// 在保存文档之前执行的中间件
ChildCategorySchema.pre("save", async function (next) {
  if (this.isNew) {
    // 只在文档创建时执行
    const parentDocument = await mongoose
      .model("TopCategory")
      .findOne({}, {}, { sort: { "children.id": -1 } });
    this.id =
      parentDocument && parentDocument.children.length > 0
        ? parentDocument.children[0].id + 1
        : 1;
  }
  next();
});

// 定义顶级分类的Schema
const TopCategorySchema = new Schema({
  pid: { type: Number },
  cate_name: { type: String, required: true },
  pic: { type: String, required: true },
  big_pic: String,
  is_del: Boolean,
  children: [ChildCategorySchema], // 子分类数组
});

// 在保存文档之前执行的中间件
TopCategorySchema.pre("save", async function (next) {
  if (this.isNew) {
    // 只在文档创建时执行
    const lastDocument = await this.constructor.findOne(
      {},
      {},
      { sort: { pid: -1 } }
    );
    this.pid =
      lastDocument && lastDocument.pid !== undefined ? lastDocument.pid + 1 : 1;
  }
  next();
});

// 创建模型
const TopCategoryModel = mongoose.model("TopCategory", TopCategorySchema);

// 导出模型
module.exports = TopCategoryModel;

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const cateRouter = require("./routes/category ");
const attributesRouter = require("./routes/attributes");
const FabricRouter = require("./routes/fabric");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error==>", err);
  });
// function customResponseMiddleware(req, res, next) {
//   // 将原始的res对象备份
//   const originalSend = res.send;

//   // 重写res.send方法，实现封装逻辑
//   res.send = function (data) {
//     // 在发送响应之前可以进行一些额外的处理
//     // 比如记录日志、修改响应数据等
//     console.log("data==>", typeof data);
//     // 将封装的逻辑放在这里，这里简单地在响应数据前加上一个标识字符串
//     const wrappedData = `${data}`;

//     // 调用原始的res.send方法发送响应
//     originalSend.call(this, wrappedData);
//   };

//   // 继续请求处理链
//   next();
// }
// app.use(customResponseMiddleware);
const path = require("path"); // 确保导入了 path 模块

// const autoImportRoutes = require("./routes/index");
// autoImportRoutes(app, path.join(__dirname, "routes"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/products", productRouter);
app.use("/api/account", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", cateRouter);
app.use("/api/attributes", attributesRouter);
app.use("/api/fabric", FabricRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

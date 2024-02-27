// routes/index.js
const fs = require("fs");
const path = require("path");

function autoImportRoutes(app, routesPath) {
  fs.readdirSync(routesPath).forEach((file) => {
    const filePath = path.join(routesPath, file);
    // console.log('Checking file:', filePath);  // 调试语句
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      autoImportRoutes(app, filePath);
    } else if (file.endsWith(".js")) {
      const routeModule = require(filePath);
      //   console.log('Imported module:', routeModule);  // 调试语句

      const routePath = "/api/" + path.basename(file, ".js");
      console.log(routePath);
      app.use(routePath, routeModule);
    }
  });
}

module.exports = autoImportRoutes;

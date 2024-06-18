const userRouter = require("./user");
const productRouter = require("./product");
const blogCategoryRouter = require("./blogCategory");
const categoryRouter = require("./productCategory");
const blogRouter = require("./blog");
const couponRouter = require("./coupon");
const orderRouter = require("./order");

const { notFound, handleErrors } = require("../middlewares/handleErrors");

const initRouters = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/blogcategory", blogCategoryRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/order", orderRouter);

  app.use(notFound);
  app.use(handleErrors);
};

module.exports = initRouters;

const userRouter = require("./user");
const productRouter = require("./product");
const { notFound, handleErrors } = require("../middlewares/handleErrors");

const initRouters = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);

  app.use(notFound);
  app.use(handleErrors);
};

module.exports = initRouters;

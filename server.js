const express = require("express");
const dbConnect = require("./config/db");
const initRouters = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dbConnect.connect();
initRouters(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

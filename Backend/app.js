const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/connectDB");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const products = require("./routes/product");
const orders = require("./routes/order");

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/v1/", products);
app.use("/api/v1/", orders);
if (process.env.NODE_ENV == "production") {
  app.use(
    express.static(
      path.join(__dirname, "..", "frontend", "dist", "frontend", "browser")
    )
  );
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        "..",
        "frontend",
        "dist",
        "frontend",
        "browser",
        "index.html"
      )
    );
  });
}

app.listen(process.env.PORT, () => {
  console.log(
    `server listiing to port ${process.env.PORT} and ${process.env.NODE_ENV}`
  );
});

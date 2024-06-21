const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.DB_URL).then((con) => {
    console.log(`monggose DB Connect` + con.connection.host);
  });
};

module.exports = connectDB;

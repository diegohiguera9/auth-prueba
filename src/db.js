const mongoose = require("mongoose");

function connect() {
  const mongoUri = process.env.MONGO_URI

  mongoose.connect(mongoUri);

  mongoose.connection.once('open',() => {
    console.log("Ok mongoDb Diego");
  });

  mongoose.connection.on('error',(err) => {
    console.log("Error have ocurred", err);
  });

  return mongoose.connection;
}

module.exports = connect;

var mongoose = require("mongoose");

const drinkSchema = mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  image: String,
});
module.exports = mongoose.model("drink", drinkSchema);

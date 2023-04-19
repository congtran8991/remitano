const mongoose = require("mongoose");
const schema = mongoose.Schema;
const movie = new schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    ref: "user"
  }
});
module.exports = mongoose.model("movie", movie);

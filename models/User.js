const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['store','client']
  }
});

module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({
  name: String,
  price: Number,
  _store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  }
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model("Product", productSchema);
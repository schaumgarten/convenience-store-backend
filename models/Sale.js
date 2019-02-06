const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema ({
  _store: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: Number
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Sale',saleSchema);
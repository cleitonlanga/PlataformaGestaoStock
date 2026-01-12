import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
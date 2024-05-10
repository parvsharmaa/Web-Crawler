import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    index: true, // index productName field for efficient searches
  },
  badge: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  basePrice: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
  ratingNumber: {
    type: String,
  },
  boughtPastMonth: {
    type: String,
  },
});

productSchema.index({ productName: 'text' });

const Product = model('Product', productSchema);

export default Product;

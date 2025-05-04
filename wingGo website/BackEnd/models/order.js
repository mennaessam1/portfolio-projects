// order.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
      default: () => new mongoose.Types.ObjectId().toString(), // Auto-generate if not provided
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }, // Quantity for each product
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['notPaid', 'paid'],
      default: 'notPaid',
    },
    orderStatus: {
      type: String,
      enum: ['cancelled','confirmed', 'preparing', 'delivering', 'delivered'],
      default: 'confirmed',
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist',
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
   
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

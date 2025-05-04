//orderController.js

const Product = require('../models/product');
const Tourist = require('../models/tourist');
const Order = require('../models/order');
const Cart = require('../models/cartItems');

const createOrder = async (req, res) => {
  try {
    const { buyerId } = req.body;

    // Validate required fields
    if (!buyerId) {
      return res.status(400).json({ message: 'Buyer ID is required' });
    }

    // Fetch buyer details
    const buyer = await Tourist.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    // Fetch all cart items for the buyer
    const cartItems = await Cart.find({ touristId: buyerId }).populate('productId');
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in the cart to create an order' });
    }

    // Calculate total price and validate product quantities
    let totalPrice = 0;
    const products = [];
    for (const item of cartItems) {
      const product = item.productId;

      // Ensure product exists and has enough stock
      if (!product || product.quantity < item.amount) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for product: ${product?.name || item.productId}` });
      }

      // Add product to order's products array
      products.push({
        productId: product._id,
        quantity: item.amount,
      });

      // Calculate total price
      totalPrice += product.price * item.amount;
    }

    // Create the order
    const order = new Order({
      buyer: buyerId,
      products,
      totalPrice,
      paymentStatus: 'notPaid', // Default status
      orderStatus: 'confirmed', // Default status
    });

    // Save the order
    const savedOrder = await order.save();

    // Clear the cart for the buyer
    await Cart.deleteMany({ touristId: buyerId });

    res.status(201).json({
      message: 'Order created successfully',
      orderId: savedOrder._id, // Include order ID
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate orderId
    if (!id) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Find the order by orderId and populate related fields
    const order = await Order.findOne({ _id: id})
      .populate({
        path: 'products.productId',
        select: 'price', // Include only the price field from Product
      })
      .populate({
        path: 'buyer',
        select: 'name email', // Include buyer details (name and email)
      });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Format the products array to include productId, quantity, and price
    const formattedProducts = order.products.map((product) => ({
      productId: product.productId._id,
      quantity: product.quantity,
      price: product.productId.price,
    }));

    // Build the response object
    const orderDetails = {
      products: formattedProducts,
      buyer: order.buyer,
      totalPrice: order.totalPrice,
    };

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};


module.exports = { createOrder ,getOrderDetails};

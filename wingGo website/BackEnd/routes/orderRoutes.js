// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/add', orderController.createOrder);  // Create a new order
router.get('/get/:id', orderController.getOrderDetails);

module.exports = router;
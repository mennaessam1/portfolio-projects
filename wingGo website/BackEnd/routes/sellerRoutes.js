const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer'); // Add multer
const sellerController = require('../controllers/sellerController');
const  upload  = require('../uploadMiddleware');





// Define routes
router.get('/hello', sellerController.seller_hello);
router.get('/getallproducts', sellerController.getAllProducts);
router.put('/update/:id', sellerController.updateSellerProfile);
router.get('/viewProfile/get/:id', sellerController.getSeller);
router.post('/addProduct', upload.single('file'), sellerController.addProduct);  // Use multer middleware for file upload
router.put('/product/:productId', upload.single('file'), sellerController.editProduct);
router.get('/sortProducts', sellerController.sortProductsByRatings);
router.get('/filterProducts/:sellerId', sellerController.filterProduct);
router.post('/createProfile/:id', sellerController.createSellerProfile);
router.get('/searchProductName', sellerController.searchProductsByName);
router.get('/productImage/:id', sellerController.getProductImage);

router.post('/changeLogo/:id', upload.single('file'), sellerController.changeLogo);

router.put('/acceptterms/:id', sellerController.acceptTerms);
router.put('/changePassword/:id', sellerController.changePassword); // Define route for password change

router.get('/downloadProductImage/:id', sellerController.downloadProductImage);

router.delete('/deleteSeller/:id', sellerController.deleteSellerAccount);

router.get('/:id', sellerController.getSellerById);

router.get('/productQuantityAndSales/:productId', sellerController.getProductQuantityAndSales);
router.get('/productsQuantityAndSales', sellerController.getAllProductsQuantityAndSales);

router.put('/changearchive/:id',sellerController.ArchiveUnarchiveProduct);

router.get('/viewLogo/:id', sellerController.previewLogo);

// Get Seller Notifications
router.get('/notifications/:userId', sellerController.getNotifications);

router.get('/sales-report/:sellerId', sellerController.getSalesReport);
module.exports = router;

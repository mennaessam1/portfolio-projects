const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const itineraryController = require('../controllers/TourGuideController');
const upload = require('../uploadMiddleware');

router.get('/getALLitineraries', adminController.getAllItineraries);
router.get('/getALLactivities', adminController.getAllActivities);

router.get('/getallproducts', adminController.getAllProducts);
router.get('/getAttractions', adminController.getAttractions);
// Route to approve a pending user by id
router.put('/approve/:id', adminController.approvePendingUserById);
router.get('/pending-users', adminController.getPendingUsers);
router.delete('/pending-users/:id', adminController.deletePendingUserById);

// Route to delete an account by id
router.delete('/deleteAccount/:id', adminController.deleteAccount);

router.put('/product/:productId',upload.single('picture'), adminController.editProduct);

router.post('/addGovernor', adminController.addTourismGovernor);
//create an activity category
router.post('/categories', adminController.createCategory);

router.post('/add-product',upload.single('file'), adminController.addProductAsAdmin);

///////// Remove and replace by after tag update ////////////

// Add a new tag
router.put('/attractions/:id/addTags', adminController.addTag);

// Get all tags
router.get('/attractions/:id/tags', adminController.getTags);

// update Tags
router.put('/attractions/:id/updateTags', adminController.updateTag);

// Delete a tag
router.put('/attractions/:id/deleteTag', adminController.deleteTag);

/////// Remove End //////////////////////////////////////////

////// after tags update /////////
// Create a new preference tag
router.post('/preferences', adminController.createPreferenceTag);
// Get all preference tags
router.get('/preferences', adminController.getAllPreferenceTags);
// Update a preference tag by ID
router.put('/preferences/:id', adminController.updatePreferenceTag);
// Delete a preference tag by ID
router.delete('/preferences/:id', adminController.deletePreferenceTag);
/////////////////////////////////

// Get all activity categories
router.get('/getcategories', adminController.getCategories);
router.get('/sortProducts', adminController.sortProductsByRatings);

// Get one activity category by ID
router.get('/getcategory/:id', adminController.getCategory);

// Update an activity category by ID
router.put('/updatecategory/:id', adminController.updateCategory);

// Delete an activity category by ID
router.delete('/deletecategory/:id', adminController.deleteCategory);

// Route to add a new admin
router.post('/add-admin', adminController.addAdmin);
router.get('/filterProducts', adminController.filterProduct);

//Search by product name
router.get('/searchProductName', adminController.searchProductsByName);

router.put('/flagActivity/:id', adminController.flagActivity);
router.put('/flagItinerary/:id', adminController.flagItinerary);
router.put('/flagPlace/:id', adminController.flagPlace);


router.put('/changePassword/:id', adminController.changePassword); // Define route for password change


router.get('/viewPendingUserID/:id', adminController.viewPendingUserID);
router.get('downloadPendingUserCertificate/:id', adminController.downloadPendingUserCertificate);
router.get('/viewPendingUserCertificate/:id', adminController.viewPendingUserCertificate);
router.get('/downloadPendingUserID/:id', adminController.downloadPendingUserID);


router.post('/changeProductImage/:id', upload.single('file'), adminController.changeProductImage);

router.get('/getProductImage/:id', adminController.getProductImage);
router.get('/downloadProductImage/:id', adminController.downloadProductImage);
router.put('/updateComplaint/:id', adminController.updateComplaintState);
router.get('/productQuantityAndSales/:productId', adminController.getProductQuantityAndSales);
router.get('/productsQuantityAndSales', adminController.getAllProductsQuantityAndSales);
router.get('/getcomplaints', adminController.getAllComplaints);
router.get('/detailscomplaint/:id', adminController.getDetailsOfComplaint);
router.post('/replytocomplaint/:id',adminController.replyComplaint);
router.put('/changearchive/:id',adminController.ArchiveUnarchiveProduct);

/// Complaints
router.get('/filterComplaints', adminController.filterComplaintsByStatus);
router.get('/sortComplaints', adminController.sortComplaintsByDate);

router.get('/getUsername/:id', adminController.getUsernameById);

// Get notifications for an admin
router.get('/notifications/:adminId', adminController.getNotifications);

//PromoCode
router.post('/createPromoCode', adminController.createPromoCode);
router.get('/sales-report', adminController.getSalesReport);
router.get('/getAllUsers', adminController.getAllUsers);
router.get('/searchUser', adminController.searchForUserByUsername);


router.get('/user-statistics', adminController.getUserStatistics);
router.get('/getCategoryNames', adminController.getCategoryNames);


module.exports = router;

const express = require("express");
const touristController= require('../controllers/touristController');
const advertiserController = require('../controllers/advertiserController');

const router = express.Router();

// /tourist
// localhpost:8000/tourist
router.get('/register', touristController.tourist_hello);
router.get('/getallproducts', touristController.getAllProducts);
//router.get('/search', touristController.searchTouristAttractions);
router.get('/viewProfile/:id', touristController.getTourist);
router.put('/update/:id',touristController.updateTouristProfile);
router.get('/sort-upcoming', touristController.sortUpcomingActivityOrItineraries); ////


router.get('/sortProducts', touristController.sortProductsByRatings);
router.get('/filterProducts', touristController.filterProduct);
router.get('/searchProductName', touristController.searchProductsByName);



router.get('/filterPlacesByTag', touristController.filterPlacesByTag);
// router.get('/viewActivities',touristController.viewTouristActivities);
// router.get('/viewItineraries',touristController.viewTouristItineraries);
router.get('/viewActivities', touristController.getAllUpcomingActivities);
router.get('/viewItineraries', touristController.getAllUpcomingIteneries); ////////
router.get('/viewPlaces',touristController.getAllUpcomingPlaces);

router.get('/viewUpcoming',touristController.getAllUpcomingEvents);

router.get('/filterActivities',touristController.filterUpcomingActivities);
router.get('/filterItineraries',touristController.filterItineraries); ////////


router.get('/sort', touristController.sortUpcomingActivityOrItineraries);

router.get('/search', touristController.searchAllModels);  /////////
router.get('/itineraries', touristController.filterItineraries);
router.post('/complaints/:id', touristController.addComplaint);

router.get('/viewmycomplaints/:id', touristController.viewComplaints);

router.put('/:id/preferences', touristController.addPreferencesToTourist);

router.delete('/:id/preferences', touristController.removePreferencesFromTourist);

router.put('/changePassword/:id', touristController.changePassword); // Define route for password change
router.post('/bookItinerary/:touristId/:itineraryId', touristController.bookItinerary);
router.delete('/cancelItinerary/:touristId/:itineraryId', touristController.cancelItinerary);
router.put('/redeemPoints/:touristId', touristController.redeemPoints);
router.post('/bookActivity/:touristId/:activityId', touristController.bookActivity);
router.delete('/cancelActivity/:touristId/:activityId', touristController.cancelActivity);
router.post('/purchaseProduct/:touristId/:productId', touristController.purchaseProduct);
router.post('/rateProduct/:touristId/:productId', touristController.rateProduct);
router.post('/reviewProduct/:touristId/:productId', touristController.reviewProduct);
router.post('/rateActivity/:touristId/:activityId', touristController.rateActivity);
router.post('/commentOnActivity/:touristId/:activityId', touristController.commentOnActivity);

router.delete('/delete/:id', touristController.deleteTouristIfEligible);

router.get('/completedItineraries/:touristId', touristController.getCompletedItineraries);
router.post('/rateItinerary/:touristId/:itineraryId', touristController.rateItinerary);
router.post('/commentItinerary/:touristId/:itineraryId', touristController.commentOnItinerary);
router.post('/ratetourguide/:touristId/:tourGuideId', touristController.rateTourGuide);
router.post('/commenttourguide/:touristId/:tourGuideId', touristController.commentOnTourGuide);


router.get('/searchFlights', touristController.getFlightPrices);
router.post('/bookFlight/:touristId', touristController.bookFlight);


router.post('/shareActivityViaEmail/:id', touristController.shareActivityViaEmail);
router.post('/shareItineraryViaEmail/:id', touristController.shareItineraryViaEmail);
router.post('/sharePlaceViaEmail/:id', touristController.sharePlaceViaEmail);
router.post('/shareProductViaEmail/:id', touristController.shareProductViaEmail);


router.get('/searchHotelsByCity', touristController.getHotelOffersByCity);
router.get('/searchHotelsByLocation', touristController.getHotelOffersByLocation);
router.post('/bookHotel/:touristId', touristController.bookHotel);
// Read All Transports (for tourists)
// router.get('/transports', advertiserController.getAllTransports);
router.get('/transports', advertiserController.getAllUnbookedTransports);
router.put('/bookTransport/:touristId/:transportId', touristController.bookTransport);
router.get('/:id', touristController.getTouristById);

router.get('/booked-itineraries/:touristId', touristController.getBookedItineraries);
router.get('/booked-activities/:touristId', touristController.getBookedActivities);

router.get('/getUsername/:id', touristController.getTouristUsername);
router.get('/orderDetails/:id', touristController.orderDetails);
router.get('/pastandcurrentorders/:touristId',touristController.viewAllorders);
router.put('/cancelOrder/:touristId/:orderId', touristController.cancelOrder);
router.get('/getallproducts2/:touristId', touristController.getAllProducts2);


router.get('/purchasedProducts/:touristId', touristController.getPurchasedProducts);

// Route to check if an itinerary is booked by a tourist
router.get('/booked-status/:touristId/booked-status/:itineraryId', touristController.isItineraryBooked);

// Route to check if an activity is booked
router.get('/booked-status/:touristId/activity-status/:activityId', touristController.isActivityBooked);

router.get('/getActivity/:id', touristController.getActivity);

// Search for flights by userId
router.get('/searchFlights/:userId', touristController.searchFlightsByUserId);

router.get('/searchTransports/:userId', touristController.searchTransportsByUserId);

// Search for hotels by userId
router.get('/searchHotels/:userId', touristController.searchHotelsByUserId);
router.post('/cart/:touristId/:productId', touristController.addToCart);
router.delete('/cart/:touristId/:productId',touristController.removeFromCart);
router.put('/updateAmountInCart/:cartItemId', touristController.updateCartItemAmount);
router.post('/addDeliveryAddress/:touristId', touristController.addDeliveryAddress);
router.post('/chooseAddress/:touristId', touristController.chooseAddress);


// Get Tourist Notifications
router.get('/notifications/:userId', touristController.getNotifications);

// Pay for product dont use in frontend
router.post('/payForProducts/:touristId/:productId', touristController.payForProducts);
//


// Pay for Order
router.put('/pay/:orderId', touristController.payForOrder); // Endpoint to pay for an order

router.get('/cartItems/:touristId',touristController. getItemsInCart);


//add item to wishlist
router.post('/wishlist/:touristId/:productId', touristController.addWishlist);
router.get('/viewWishlist/:touristId', touristController.viewWishlist);
router.delete('/deleteWishlist/:touristId/:productId', touristController.removeWishlistItem);
router.post('/wishlisttoCart/:touristId/:productId', touristController.addWishlistItemToCart);

router.get('/promoCodes/:touristId', touristController.getPromoCodesForTourist);


//saveActivity and saveItinerary and viewAll
router.post('/toggleSaveActivity/:touristId/:activityId', touristController.saveActivity);
router.post('/toggleSaveItinerary/:touristId/:itineraryId', touristController.toggleSaveItinerary);
router.get('/viewAllSavedEvents/:touristId', touristController.viewAllSavedEvents);

router.put('/toggleNotificationPreference/:touristId', touristController.toggleNotificationPreference);

router.get('/filteractivitiesdate/:touristId', touristController.getFilteredActivities);

router.get('/itineraryPrice/:itineraryId', touristController.getPrice);
router.get('/cartItemsPrice/:touristId', touristController.getCartTotalPrice);

router.get('/product/:id', touristController.getProductById);
router.get('/getDiscount/:code', touristController.getDiscountByCode);

router.get("/deliveryAddresses/:touristId", touristController.getDeliveryAddresses);

router.get('/places/tags', touristController.getPlacesTags);




router.get('/activityPrice/:activityId', touristController.calculateActivityPrice);

router.get('/savedItineraries/:touristId', touristController.getSavedItineraries);

router.get('/isItinerarySaved/:touristId/:itineraryId', touristController.checkIfSaved);

router.get('/isActivitySaved/:touristId/:activityId', touristController.checkIfActivitySaved);

router.get('/transportPrice/:transportId', touristController.getTransportPrice);

router.get('/getPromoCode/:touristId', touristController.getPromoCodeDiscountPerc);


router.get('/getPaidPrice/:touristId/:itineraryId', touristController.getPaidPrice);

router.get('/getPaidPriceAct/:touristId/:activityId', touristController.getPaidPriceForActivity);



module.exports = router;
const express = require("express");
const guestController = require('../controllers/guestController');
const router = express.Router();



// Route to get all products


// Route to sort products by ratings
router.get('/filterPlacesByTag', guestController.filterPlacesByTag);
// router.get('/sort',guestController.sortUpcomingActivityOrItenraries);
router.get('/viewActivities', guestController.getAllUpcomingActivities);
router.get('/viewItineraries', guestController.getAllUpcomingIteneries);
router.get('/viewPlaces', guestController.getAllUpcomingPlaces);
router.get('/filterActivities', guestController.filterUpcomingActivities);
router.get('/filterItineraries', guestController.filterItineraries);


router.get('/itineraries', guestController.filterItineraries);
module.exports = router;

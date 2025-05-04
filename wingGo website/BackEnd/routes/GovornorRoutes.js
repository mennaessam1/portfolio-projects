const express = require('express');
const router = express.Router();
const PlaceController = require('../controllers/GovornorController');
const  upload  = require('../uploadMiddleware');




// router.post('/createPlace', PlaceController.createPlace);
router.post('/createPlace', upload.single('photo'), PlaceController.createPlace);
router.get('/getPlacePhoto/:id', PlaceController.getPlacePhoto);


router.get('/getAllPlaces', PlaceController.getAllPlaces);

router.get('/getPlace/:id', PlaceController.getPlaceById);

router.put('/updatePlace/:id', PlaceController.updatePlace);

router.delete('/deletePlace/:id', PlaceController.deletePlace);

///// dont use ////////////////////////
router.put('/addTag/:id', PlaceController.addTagToPlace);
router.put('/addTagUpdated/:id', PlaceController.addTagUpdated);
///////////////////////////////////////

router.get('/hello', PlaceController.hello);

// Create a new preference tag
router.post('/preferences', PlaceController.createPreferenceTag);
// Add Tag updated

router.put('/changePassword/:id', PlaceController.changePassword); // Define route for password change

// Route to get all active preference tags el etnein m3 ba3d first for dropdown list to choose from second to add the chosen tag to the place
router.get('/viewPreferences', PlaceController.getActivePreferenceTags);
router.put('/addTagToPlace/:id', PlaceController.addTagToPlace2);

router.get('/places/:govid', PlaceController.getGovernorPlaces);
/////////////////

module.exports = router;
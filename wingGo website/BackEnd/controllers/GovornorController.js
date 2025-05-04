const Place = require('../models/Places');
const PreferenceTag = require('../models/PreferenceTag');
const Governor = require('../models/TourismGovernor');
const LoginCredentials = require('../models/LoginCredentials');
const bcrypt = require('bcrypt');
const {previewgeneratePreSignedUrl}  = require('../downloadMiddleware');



// Create a new place
const createPlace = async (req, res) => {
    try {
        console.log('entered backend method');
        const { tagss, ...placeData } = req.body; // Extract tagss separately
        const governorId = req.query.governorId; // Assuming governorId is passed in the query

        // Validate the governor ID
        const governor = await Governor.findById(governorId);
        if (!governor) {
            console.log('1');
            return res.status(404).json({ message: 'Governor not found' });
          
        }

        // Handle optional photo
        let photoUrl = null;
        if (req.file) {
            photoUrl = req.file.location;
        }

        console.log("Photo URL:", photoUrl);

        // Create a new place
        const place = new Place({
            ...placeData,  // Spread the rest of the place data (e.g., name, description, location)
            // pictures: pictureUrls, // Add the uploaded pictures
            governorId,  // Set the governor ID
            tagss: tagss || [] , // Use an empty array if tagss is missing
            photo: photoUrl,
        });

        await place.save();
        console.log(place);
        res.status(201).json({ message: 'Place created successfully', place });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const getPlacePhoto = async (req, res) => {
    const { id } = req.params;
    try {
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        if (!place.photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        if (place.photo) {
            const key = place.photo.split('/').slice(-1)[0];
            const preSignedUrl = await previewgeneratePreSignedUrl(key);

            // Instead of redirecting, send the pre-signed URL directly
            return res.json({ imageUrl: preSignedUrl });
        } else {
            return res.status(404).json({ message: 'Image not found for this activity.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// const createPlace = async (req, res) => {
//     try {
//         const { /*governerId,*/ types, historicalPeriods, ...placeData } = req.body.tags || {}; // Extract tags separately

//         // Validate types
//         const allowedTypes = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];
//         if (types && types.some(type => !allowedTypes.includes(type))) {
//             return res.status(400).json({ message: 'Invalid type in types array. Allowed values are Monuments, Museums, Religious Sites, Palaces/Castles.' });
//         }

//         // Create a new place with validated tags
//         const place = new Place({
//             ...req.body,  // Spread the rest of the place data (e.g., name, description, location)
//             tags: {
//                 types: types || [],  // Use an empty array if types are missing
//                 historicalPeriods: historicalPeriods || []  // Use an empty array if historicalPeriods are missing
//             }
//         });

//         await place.save();
//         res.status(201).json(place);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };


// Get all places
const getAllPlaces = async (req, res) => {

    const {govornorId} = req.query;
    try {
        const places = await Place.find({governorId: govornorId});
        res.json(places);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get place by ID
const getPlaceById = async (req, res) => {

    const {governerId} = req.query;
    const {id} = req.params;
    try {
        
        const place = await Place.findOne({governerId, _id: id});
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(place);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const hello = async (req, res) => {
  
        console.log('in hello ');
        res.send('<h1>yayy govornor</h1>');
      
};

// Update an existing place
const updatePlace = async (req, res) => {
    const { governorId } = req.query;
    try {
        const { tagss, ...placeData } = req.body; // Extract tagss separately
        
        // Find the place by ID and update with the new data
        const place = await Place.findOne({ _id: req.params.id });
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        if (req.body.governorId) {
            delete req.body.governorId;
        }

        // Update place data
        Object.assign(place, placeData);

        // Explicitly update the new tagss field
        if (tagss) {
            place.tagss = tagss;
        }

        await place.save();
        res.json({ message: 'Place updated successfully', place });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// const updatePlace = async (req, res) => {

//     const {governerId} = req.query;
//     try {
//         const { types, historicalPeriods, ...placeData } = req.body;

//         // Validate types if provided
//         const allowedTypes = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];
//         if (types && types.some(type => !allowedTypes.includes(type))) {
//             return res.status(400).json({ message: 'Invalid type in types array. Allowed values are Monuments, Museums, Religious Sites, Palaces/Castles.' });
//         }

//         // Find the place by ID and update with the new data
//         const place = await Place.findOne({governerId, _id: req.params.id});
//         if (!place) {
//             return res.status(404).json({ message: 'Place not found' });
//         }

//         if(req.body.governerId){
//             req.body.governerId.delete;
//         }

//         // Update place data
//         Object.assign(place, placeData);

//         // Explicitly update tags (types and historicalPeriods)
//         if (types) {
//             place.tags.types = types;
//         }
//         if (historicalPeriods) {
//             place.tags.historicalPeriods = historicalPeriods;
//         }

//         await place.save();
//         res.json(place);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };


// Delete a place
const deletePlace = async (req, res) => {

    const {governerId} = req.query;
    try {
        const place = await Place.findOneAndDelete({_id: req.params.id});
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(204).send();  // No content response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Add a tag to a place (already provided in previous response)
const addTagToPlace = async (req, res) => {

    const {governerId} = req.query;
    try {
        const place = await Place.findOne({governerId, _id: req.params.id});
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        const { tag, category } = req.body;  // Get the tag and its category (type or historical period) from the request body

        // Check if it's a type or a historical period
        if (category === 'type') {
            // Ensure the tag is one of the allowed types
            const allowedTypes = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];
            if (!allowedTypes.includes(tag)) {
                return res.status(400).json({ message: 'Invalid type. Allowed values are Monuments, Museums, Religious Sites, Palaces/Castles.' });
            }

            // Add the tag to the types array
            if (!place.tags.types.includes(tag)) {
                place.tags.types.push(tag);
            } else {
                return res.status(400).json({ message: 'Type already exists for this place.' });
            }
        } else if (category === 'historicalPeriod') {
            // Add the tag to the historicalPeriods array (no validation needed here)
            if (!place.tags.historicalPeriods.includes(tag)) {
                place.tags.historicalPeriods.push(tag);
            } else {
                return res.status(400).json({ message: 'Historical period already exists for this place.' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid category. Must be either "type" or "historicalPeriod".' });
        }

        await place.save();  // Save the updated place with the new tag
        res.status(200).json(place);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

  // Create a new preference tag
  const createPreferenceTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = new PreferenceTag({ name });
        await newTag.save();
        res.status(201).json({ message: 'Preference tag created successfully', tag: newTag });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 
// Add new tags to the 'tagss' field
const addTagUpdated = async (req, res) => {
    const { id } = req.params;  // Place ID
    const { tagss } = req.body;  // Array of tag IDs (from PreferenceTags collection)

    try {
        // Find the place by ID
        const place = await Place.findById(id);

        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        // Ensure the tags field is an array and contains valid ObjectId references
        place.tagss = [...new Set([...place.tagss, ...tagss])];  // Avoid duplicates

        await place.save();
        res.status(200).json({ message: 'Tags added to place successfully', place });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { id } = req.params; // Extract user ID from the request params

    try {
        // 1. Find the user in LoginCredentials
        const userCredentials = await LoginCredentials.findOne({ userId: id });


        if (!userCredentials) {
            return res.status(404).json({ message: 'User credentials not found' });
        }

        // 2. Find the corresponding user in the TourGuide collection
        const governor = await Governor.findById(userCredentials.userId);
        if (!governor) {
            return res.status(404).json({ message: 'Governor not found' });
        }

       

        // 3. Compare the old password with the hashed password in TourGuide
        const isMatch = await bcrypt.compare(oldPassword, userCredentials.password);
        console.log('Is password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // 4. Check if the new password matches the confirm password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }
        console.log("AHUDHJGHJDFGHJFDSG");
        // 5. Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Hash new password
        
        // 6. Update the password in LoginCredentials
        userCredentials.password = hashedNewPassword;
        await userCredentials.save();

        console.log("AHUDHJGHJDFGHJFDSG");

        // 7. Update the password in the TourGuide collection
        governor.password = hashedNewPassword;
        await governor.save();

        res.status(200).json({ message: 'Password updated successfully in both collections' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Method to get all active preference tags
const getActivePreferenceTags = async (req, res) => {
    try {
        const tags = await PreferenceTag.find({ isActive: true });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Method to add a tag to a place by tag ID
const addTagToPlace2 = async (req, res) => {
    const { id: placeId } = req.params;  // Place ID
    const { tagId } = req.body;  // Preference Tag ID

    try {
        // Find the preference tag
        const tag = await PreferenceTag.findById(tagId);
        if (!tag || !tag.isActive) {
            return res.status(404).json({ message: 'Tag not found or inactive' });
        }

        // Add the tag name to the `tagss` array in the place
        const updatedPlace = await Place.findByIdAndUpdate(
            placeId,
            { $addToSet: { tagss: tag.name } },  // Add only unique tags
            { new: true }
        );

        if (!updatedPlace) {
            return res.status(404).json({ message: 'Place not found' });
        }

        res.status(200).json({ message: 'Tag added to place successfully', place: updatedPlace });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getGovernorPlaces = async (req, res) => {
    try {
        const { govid } = req.params; // Extract governor ID from route parameters

        if (!govid) {
            return res.status(400).json({ message: 'Governor ID is required' });
        }

        // Fetch all places associated with the governor ID
        const places = await Place.find({ governorId: govid });

        if (places.length === 0) {
            return res.status(404).json({ message: 'No places found for this governor' });
        }

        res.status(200).json({ message: 'Places retrieved successfully', places });
    } catch (error) {
        console.error('Error fetching places:', error);
        res.status(500).json({ message: 'An error occurred while fetching places', error: error.message });
    }
};



module.exports = {
    createPlace,
    getAllPlaces,
    getPlaceById,
    updatePlace,
    deletePlace,
    addTagToPlace,
    hello,
    createPreferenceTag,
    addTagUpdated,
    changePassword,
    getActivePreferenceTags,
    addTagToPlace2,
    getPlacePhoto,
    getGovernorPlaces
    
};

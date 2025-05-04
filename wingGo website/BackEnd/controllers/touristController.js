const bcrypt = require('bcrypt');
const Tourist = require('../models/tourist');
const Attraction = require('../models/attraction');
const Activity= require('../models/Activity');
const Itinerary = require ('../models/Itinerary');
const Product = require('../models/product');
const Cart = require('../models/cartItems');
const LoginCredentials = require('../models/LoginCredentials');
const Place = require('../models/Places');
const Complaints = require('../models/Complaints');
const axios = require('axios');
const FlightBooking = require('../models/FlightBooking');
const mongoose = require('mongoose');
const TourGuide = require('../models/TourGuide');
const nodemailer = require('nodemailer');
const HotelBooking = require('../models/HotelBooking');
const Transport = require('../models/Transport');
const Seller = require('../models/Seller');

const Wishlist = require('../models/WishList');
const Admin = require("../models/Admin");
const Order = require('../models/order');
const PromoCode = require('../models/PromoCode');


const tourist_hello = (req, res) => {
    res.send('<h1>yayy</h1>');
    console.log('yay');
};



const tourist_register = async (req, res) => {
    // Destructure fields from the request body
    const { username, email, password, mobileNumber, nationality, DOB, jobOrStudent } = req.body;
    
    // Check for existing user
    const existingEmail = await Tourist.findOne({ email });
    const existingUsername = await LoginCredentials.findOne({ username });
    const existingMobile = await Tourist.findOne({ mobileNumber });

    if (existingEmail) {
        return res.status(400).json({ message: 'Email is already registered.' });
    }
    if (existingUsername) {
        return res.status(400).json({ message: 'Username is already registered.' });
    }
    if (existingMobile) {
        return res.status(400).json({ message: 'Mobile number is already registered.' });
    }

    const birthDate = new Date(DOB);
    if (isNaN(birthDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
    }
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const isUnder18 = age < 18;

    // Restrict users under 18 from signing up for booking
    if (isUnder18) {
        return res.status(400).json({ message: 'You must be at least 18 years old to register.' });
    }
    
    try {
        // Hash the password using bcrypt before saving it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        // Create the new tourist with the hashed password
        const user = new Tourist({
            username,
            email,
            password: hashedPassword, // Save the hashed password
            mobileNumber,
            nationality,
            DOB,
            jobOrStudent,
            wallet: 0,  // Initialize wallet balance to zero
            loyaltyPoints: 0,  // Initialize loyalty points to zero
            badges: [],  // Initialize badges as an empty array
            transports: [],  // Initialize transports as an empty array 
        });

        // Save the tourist to the database
        await user.save();

        // Create login credentials and save it to LoginCredentials
        const loginCredentials = new LoginCredentials({
            username,
            password: hashedPassword,
            email: email,
            role: 'tourist',
            userId: user._id,  // Reference to the created tourist
            roleModel: 'Tourist'  // Set the role model as 'Tourist'
        });

        await loginCredentials.save();

        console.log('Success! Tourist registered and login credentials created.');
        res.status(201).json(user);  // <-- Change this to return 201 Created
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log('Error during registration:', error.message);
    }
};

const addComplaint = async (req, res) => {
    const {title, body } = req.body;
    const touristId = req.params.id; // Extracting the tourist ID from the URL parameters

    try {
        const newComplaint = new Complaints({
            title,
            body,
            tourist: touristId,
            state: 'pending' // Default state
        });

        await newComplaint.save();
        res.status(201).json({ message: 'Complaint filed successfully.', complaint: newComplaint });
    } catch (error) {
        res.status(500).json({ message: 'Error filing complaint.', error });
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
        console.log(userCredentials);

        // 2. Find the corresponding user in the Tourist collection
        const tourist = await Tourist.findById(userCredentials.userId);
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // 3. Compare the old password with the hashed password in LoginCredentials
        const isMatch = await bcrypt.compare(oldPassword, userCredentials.password); // Compare old password
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }
        console.log(oldPassword);
        console.log(newPassword, confirmNewPassword);
        // 4. Check if the new password matches the confirm password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }

        // 5. Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Hash new password

        // 6. Update the password in LoginCredentials
        userCredentials.password = hashedNewPassword;
        await userCredentials.save();

        // 7. Update the password in the Tourist collection
        tourist.password = hashedNewPassword;
        await tourist.save();

        res.status(200).json({ message: 'Password updated successfully in both collections' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const getTourist = async(req,res) => {
    try{
        const id = req.params.id; // Use id as the unique identifier
        const touristExist = await Tourist.findById(id);
        if (!touristExist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }
       res.status(200).json(touristExist)
    }catch(error){
       res.status(400).json({error:error.message})
    }
 };

 const updateTouristProfile = async (req, res) => {
    try {
        const id = req.params.id; // Use id as the unique identifier
        const touristExist = await Tourist.findById(id);
        if (!touristExist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Check if the request is trying to update 'username' or 'wallet'
        if (req.body.username) {
            return res.status(400).json({ message: 'Username cannot be modified.' });
        }
        if (req.body.wallet) {
            return res.status(400).json({ message: 'Wallet cannot be modified.' });
        }

        // Create a copy of the request body excluding 'username' and 'wallet'
        const { username, wallet, ...updateData } = req.body;

        // If the password is being updated, hash it before saving
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        // Update the tourist's profile with the hashed password and other updated fields
        const updatedTourist = await Tourist.findByIdAndUpdate(id, updateData, {
            new: true,  // Return the updated document
        });

        // // Update login credentials if necessary
        // const loginUpdateFields = {};
        // if (req.body.password) {
        //     loginUpdateFields.password = updateData.password;  // Use the hashed password
        // }

        // if (Object.keys(loginUpdateFields).length > 0) {
        //     const updatedLoginCredentials = await LoginCredentials.findByIdAndUpdate(
        //         id, // Match by id
        //         { $set: loginUpdateFields },
        //         { new: true }  // Return the updated document
        //     );

        //     if (!updatedLoginCredentials) {
        //         return res.status(404).json({ message: 'Login credentials not found' });
        //     }
        // }

        res.status(200).json({
            message: 'Profile and login credentials updated successfully',
            updatedTourist
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const sortProductsByRatings = async (req, res) => {
    try {
        // Find products where archive is false and sort by ratings in descending order
        const products = await Product.find({ Archive: false }).sort({ ratings: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllProducts2 = async(req,res)=>{
    try{
        const touristId = req.params.id;
        //const touristExist = await Tourist.findById(touristId);
        // if (!touristExist) {
        //     return res.status(404).json({ message: 'tourist not found can not view products' });
        // }
        const products = await Product.find().populate('seller', 'username');  // Populate seller username if available

        // If you need to send a public path for pictures stored locally
        const productData = products.map(product => ({
            name: product.name,
            picture: `../images/${product.picture}`,  // Build image URL dynamically
            // picture: `${req.protocol}://${req.get('host')}/images/${product.picture}`,  // Build image URL dynamically
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            seller: product.seller ? product.seller.username : 'Admin',  // Handle null seller field
            ratings: product.ratings,
            reviews: product.reviews
        }));

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'username');  // Populate seller username if available

        // If you need to send a public path for pictures stored locally
        const productData = products.map(product => ({
            name: product.name,
            picture: `../images/${product.picture}`,  // Build image URL dynamically
            // picture: `${req.protocol}://${req.get('host')}/images/${product.picture}`,  // Build image URL dynamically
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            seller: product.seller ? product.seller.username : 'Admin',  // Handle null seller field
            ratings: product.ratings,
            reviews: product.reviews
        }));

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const filterProduct = async (req, res) => {
    try {
        const { budget } = req.query; // Extract price from query parameters

        // Initialize the filter with Archive: false
        let filter = { archive: false };

        if (budget) {
            filter.price = { $lte: budget }; // Price less than or equal to the specified budget
        }
        // Fetch products based on the constructed filter
        const result = await Product.find(filter);

        // Return the filtered results
        res.status(200).json(result);
    } catch (error) {
        // Handle errors and return a 500 status with the error message
        res.status(500).json({ error: error.message });
    }
};




// const Place = require('../models/Places');

// Filter places by type or historical period
const filterPlacesByTag = async (req, res) => {
    const {tag} = req.query;

    const filterCriteria = {
        flagged: false  // Exclude flagged places
    };

    if (tag) {
        filterCriteria['tagss'] = tag; // Filter by tag
    }

    try {
        const places = await Place.find(filterCriteria);
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const searchProductsByName = async (req, res) => {
    try {
        const query = req.query.name;  
        if (!query) {
            return res.status(400).json({ message: "Please provide a product name to search." });
        }

        // Perform a case-insensitive search for products with names that match the search query
        const products = await Product.find({ name: { $regex: query, $options: 'i' },Archive:false });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching your search." });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





//sort all upcoming activities/itinieraries based on price/rating
// const sortUpcomingActivityOrItineraries = async (req, res) => {
//     const { sort, type } = req.query;
//     let sortCriteria;

//     if (sort === 'price') {
//         sortCriteria = { price: 1 }; // Ascending order by price
//     } else if (sort === 'ratings') {
//         sortCriteria = { ratings: -1 }; // Descending order by ratings
//     } else {
//         return res.status(400).json({ message: 'Invalid sort criteria. Use "price" or "ratings".' });
//     }

//     try {
//         if (type === 'activity') {
//             const activities = await Activity.find({ date: { $gte: new Date() } }).sort(sortCriteria);
//             return res.status(200).json(activities);
//         } else if (type === 'itinerary') {
//             const itineraries = await Itinerary.find({ date: { $gte: new Date() } }).sort(sortCriteria);
//             return res.status(200).json(itineraries);
//         } else {
//             return res.status(400).json({ message: 'Invalid type. Use "activity" or "itinerary".' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const sortUpcomingActivityOrItineraries = async (req, res) => {
    const { sort, type, touristId } = req.query;  // Add touristId to query parameters
    let sortCriteria;

    // Determine the sorting criteria: price or ratings
    if (sort === 'price') {
        sortCriteria = { price: 1 }; // Ascending order by price
    } else if (sort === 'ratings') {
        sortCriteria = { ratings: -1 }; // Descending order by ratings
    } else {
        return res.status(400).json({ message: 'Invalid sort criteria. Use "price" or "ratings".' });
    }

    try {
        const currentDate = new Date(); // Get the current date for filtering

        if (type === 'activity') {
            // Fetch and sort upcoming activities based on the sort criteria
            const activities = await Activity.find({ date: { $gte: currentDate } , flagged: false }).sort(sortCriteria);
            return res.status(200).json(activities);
        } else if (type === 'itinerary') {
            // Fetch the tourist to access their booked itineraries
            const tourist = await Tourist.findById(touristId);

            // If tourist not found, return error
            if (!tourist) {
                return res.status(404).json({ message: 'Tourist not found' });
            }

            // Get list of itinerary IDs that the tourist has booked
            const bookedItineraryIds = tourist.bookedItineraries.map(item => item.itineraryId);

            console.log()

            // Fetch and sort upcoming itineraries based on criteria
            const itineraries = await Itinerary.find({
                availableDates: { $elemMatch: { $gte: currentDate } },  // Match upcoming dates
                flagged: false,
                $or: [
                    { deactivated: false },  // Not deactivated
                    { _id: { $in: bookedItineraryIds }, deactivated: true }  // Deactivated but booked by tourist
                ]
            }).sort(sortCriteria);

            return res.status(200).json(itineraries);
        } else {
            return res.status(400).json({ message: 'Invalid type. Use "activity" or "itinerary".' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get all upcoming activities, itineraries, and historical places/museums
// Get all upcoming activities, itineraries, and historical places/museums
const getAllUpcomingEvents = async (req, res) => {
    try {
        // Get current date to filter upcoming activities and itineraries
        const currentDate = new Date();

        // Fetch all upcoming activities
        const activities = await Activity.find({ date: { $gte: currentDate } });

        // Fetch all upcoming itineraries
        const itineraries = await Itinerary.find({
            availableDates: { $gte: currentDate }
        });

        // Fetch all historical places and museums
        const places = await Place.find();

        // Filter places by opening hours (you can adjust this logic based on your openingHours format)
        const upcomingPlaces = places.filter(place => {
            const [openingTime, closingTime] = place.openingHours.split(" - "); // Assuming format is "9:00 AM - 7:00 PM"
            const openTime = new Date(currentTime.toDateString() + ' ' + openingTime); // Today’s opening time
            const closeTime = new Date(currentTime.toDateString() + ' ' + closingTime); // Today’s closing time

            // Check if the place is currently open or will open later today
            return currentTime >= openTime && currentTime <= closeTime;
        });

        res.status(200).json({
            activities,
            itineraries,
            places: upcomingPlaces
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const getAllUpcomingEvents = async (req, res) => {
//     try {
//         // Get current date to filter upcoming activities and itineraries
//         const currentDate = new Date();

//         // Fetch all upcoming activities
//         const activities = await Activity.find({ date: { $gte: currentDate } });

//         // Fetch all upcoming itineraries
//         const itineraries = await Itinerary.find({
//             availableDates: { $gte: currentDate }
//         });

//         // Fetch all historical places and museums
//         const places = await Place.find();

//         // Filter places by opening hours (you can adjust this logic based on your openingHours format)
//         const upcomingPlaces = places.filter(place => {
//             const [openingTime, closingTime] = place.openingHours.split(" - "); // Assuming format is "9:00 AM - 7:00 PM"
//             const openTime = new Date(currentTime.toDateString() + ' ' + openingTime); // Today’s opening time
//             const closeTime = new Date(currentTime.toDateString() + ' ' + closingTime); // Today’s closing time

//             // Check if the place is currently open or will open later today
//             return currentTime >= openTime && currentTime <= closeTime;
//         });

//         res.status(200).json({
//             activities,
//             itineraries,
//             places: upcomingPlaces
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const getAllUpcomingActivities = async (req, res) => {
    try {
        // Get current date to filter upcoming activities and itineraries
        const currentDate = new Date();

        // Fetch all upcoming activities
        const activities = await Activity.find({ 
            date: { $gte: currentDate },
            flagged: false   // Exclude flagged activities
        });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUpcomingIteneries = async (req, res) => {
    const { touristId } = req.query;  // Extract touristId from query parameters

    try {
        const currentDate = new Date();

        // Fetch the tourist to get their booked itineraries
        const tourist = await Tourist.findById(touristId);

        // If tourist not found, return error
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Get list of itinerary IDs that the tourist has booked
        const bookedItineraryIds = tourist.bookedItineraries.map(item => item.itineraryId);

        // Fetch itineraries where at least one date in availableDates is upcoming, excluding flagged itineraries
        const itineraries = await Itinerary.find({
            availableDates: { $elemMatch: { $gte: currentDate } },  // Match upcoming dates
            flagged: false,  // Exclude flagged itineraries
            $or: [
                { deactivated: false },  // Not deactivated
                { _id: { $in: bookedItineraryIds }, deactivated: true }  // Deactivated but booked by tourist
            ]
        });

        if (itineraries.length === 0) {
            return res.status(404).json({ message: 'No upcoming itineraries found' });
        }

        res.status(200).json({ itineraries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// const getAllUpcomingPlaces = async (req, res) => {
//     try {
//         // Get the current day and time
//         const currentTime = new Date();

//         // Fetch all places
//         const places = await Place.find();

//         // Filter places by opening hours (you can adjust this logic based on your openingHours format)
//         const upcomingPlaces = places.filter(place => {
//             const [openingTime, closingTime] = place.openingHours.split(" - "); // Assuming format is "9:00 AM - 7:00 PM"
//             const openTime = new Date(currentTime.toDateString() + ' ' + openingTime); // Today’s opening time
//             const closeTime = new Date(currentTime.toDateString() + ' ' + closingTime); // Today’s closing time

//             // Check if the place is currently open or will open later today
//             return currentTime >= openTime && currentTime <= closeTime;
//         });

//         if (upcomingPlaces.length === 0) {
//             return res.status(404).json({ message: 'No upcoming places found based on current opening hours' });
//         }

//         res.status(200).json({
//             places: upcomingPlaces
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const getAllUpcomingPlaces = async (req, res) => {
    try {
        // Get the current day and time
        const currentTime = new Date();

        // Fetch all places
        const places = await Place.find();
        console.log("here");

        // Filter places by opening hours (you can adjust this logic based on your openingHours format)
        const upcomingPlaces = places.filter(place => !place.flagged);

      

        console.log("here 2");

        if (upcomingPlaces.length === 0) {
            return res.status(404).json({ message: 'No upcoming places found based on current opening hours' });
        }

        res.status(200).json({
            places: upcomingPlaces
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const filterUpcomingActivities = async (req, res) => {
    const { budget, date, category, averageRating } = req.query; 
    // let filter = {}; // Initialize an empty filter object
    let filter = { date: { $gte: new Date() }
    // ,flagged: false
  }; // Default filter: only upcoming activities (date >= today)

    // Apply budget filter (if provided)
    if (budget) {
        filter.price = { $lte: budget }; // Price less than or equal to the specified budget
    }

     // Apply exact date filter
     if (date) {
        // Parse the incoming date in local time
        const localDate = new Date(`${date}T00:00:00`); // YYYY-MM-DDT00:00:00 in local time

        // Convert to UTC start and end of day
        const startOfDay = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000); // UTC start
        const endOfDay = new Date(startOfDay);
        endOfDay.setUTCHours(23, 59, 59, 999); // UTC end of day

        filter.date = { $gte: startOfDay, $lte: endOfDay };
    }

    // Apply category filter (if provided)
    if (category) {
        filter.category = category; // Exact match for category
    }

    // Apply averageRating filter (if provided)
    if (averageRating) {
        filter.averageRating = { $gte: parseFloat(averageRating) }; // Ensure the value is a float and filter activities
    }

    try {
        // Find activities based on the constructed filter
        const activities = await Activity.find(filter); 
        
        res.status(200).json(activities); // Return filtered activities
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};


// Search for attractions, activities, itineraries, or places by name, category, or tags
const searchAllModels = async (req, res) => {
    const { query, touristId  } = req.query;  // Only extract the query term

    if (!query) {
        return res.status(400).json({ message: "Please provide a search term." });
    }

    // General search criteria for all models
    let searchCriteria = {
    $and: [
        {
            $or: [
                { name: { $regex: query, $options: 'i' } },      // Search by name (case-insensitive)
                { category: { $regex: query, $options: 'i' } },  // Search by category
                { tags: { $regex: query, $options: 'i' } }       // Search by tags
            ]
        },
        { flagged: false }
    ]
};


    try {
        const attractions = await Attraction.find(searchCriteria);
        const activities = await Activity.find(searchCriteria);
        
       // Fetch the tourist to get their booked itineraries
       const tourist = await Tourist.findById(touristId);
       const bookedItineraryIds = tourist ? tourist.bookedItineraries.map(item => item.itineraryId) : [];

       // Itinerary search criteria with deactivation check
       let itinerarySearchCriteria = {
        $and: [
            {
                $or: [
                    { title: { $regex: query, $options: 'i' } },  // Search by itinerary title
                    { tags: { $regex: query, $options: 'i' } }    // Search by tags
                ]
            },
            { flagged: false },
            {
                $or: [
                    { deactivated: false },                         // Include only active itineraries
                    { _id: { $in: bookedItineraryIds }, deactivated: true }  // Or include deactivated itineraries that are booked by this tourist
                ]
            }
        ]
    };
       const itineraries = await Itinerary.find(itinerarySearchCriteria);
              

       let placeSearchCriteria = {
        $and: [
            {
                $or: [
                    { name: { $regex: query, $options: 'i' } },  // Search by place name
                    { tagss: { $regex: query, $options: 'i' } }  // Search by tags
                ]
            },
            { flagged: false }
        ]
    };
    
        const places = await Place.find(placeSearchCriteria);

        const results = {
            attractions,
            activities,
            itineraries,
            places
        };

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const filterItineraries = async (req, res) => {
    const { budget, date, preferences, language, touristId } = req.query;

    let filter = { flagged: false }; // Initialize filter object

    // Always apply upcoming dates filter (availableDates >= today)
    const currentDate = new Date();
    filter.availableDates = { $elemMatch: { $gte: currentDate } }; // Match any upcoming date within the array

    // Apply exact date filter if provided
    if (date) {
        const exactDate = new Date(date);
        const startOfDay = new Date(exactDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(exactDate.setHours(23, 59, 59, 999));

        filter.availableDates = { $elemMatch: { $gte: startOfDay, $lte: endOfDay } }; // Match exact date in array
    }

    // Apply budget filter
    if (budget) {
        filter.price = { $lte: budget }; // Price should be less than or equal to the specified budget
    }

    

    // Apply language filter
    if (language) {
        
        filter.language = language; // Exact match for language
    }
     
    try {
        let tourist = null;
     
        // Fetch the tourist if touristId is provided
        if (touristId) {
            // Populate the preferences array to access the `name` field from the referenced model
            tourist = await Tourist.findById(touristId).populate('preferences');

            if (!tourist) {
                return res.status(404).json({ error: "Tourist not found" });
            }

            // If preferences is true, apply preferences filter
            if (preferences === "true" && tourist.preferences?.length > 0) {
                // Extract the `name` field from each preference
                const preferenceNames = tourist.preferences.map(pref => pref.name);

                // Ensure tags array contains at least one value from the extracted preference names
                filter["tags"] = { $in: preferenceNames };
            }
        }


        // Get list of itinerary IDs that the tourist has booked
        const bookedItineraryIds = tourist ? tourist.bookedItineraries.map(item => item.itineraryId) : [];

        // Add deactivated filter condition
        filter.$or = [
            { deactivated: false },  // Include active itineraries
            { _id: { $in: bookedItineraryIds }, deactivated: true }  // Include deactivated but booked by tourist
        ];

        // Find itineraries based on the constructed filter
        const itineraries = await Itinerary.find(filter);

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addPreferencesToTourist = async (req, res) => {
    const { id } = req.params;  // Tourist ID
    const { preferences } = req.body;  // List of selected preference tag IDs
    console.log(preferences);
    try {
        const tourist = await Tourist.findById(id);
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Ensure the preferences field is an array and contains ObjectIds
        // tourist.preferences.push(preferences);
        // tourist.preferences = preferences || [];  // Set preferences

        // Ensure the preferences field is an array and push each preference if not already present
        if (Array.isArray(preferences)) {
            preferences.forEach(preference => {
                // Avoid duplicates in the preferences array
                // if (!tourist.preferences.includes(preference)) {
                    tourist.preferences.push(preference);
                // }
            });
        } else {
            // In case a single preference ID is provided
            // if (!tourist.preferences.includes(preferences)) {
                tourist.preferences.push(preferences);
            // }
        }

        const tourist2 = await Tourist.findById(id).populate('preferences');
        //console.log(tourist2.preferences);

        
        await tourist.save();

        res.status(200).json({ message: 'Preferences updated successfully', tourist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removePreferencesFromTourist = async (req, res) => {
    const { id } = req.params;  // Tourist ID
    const { preferences } = req.body;  // List of preference IDs to remove

    try {
        const tourist = await Tourist.findById(id);
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Ensure the preferences field is an array and remove each preference
        if (Array.isArray(preferences)) {
            preferences.forEach(preference => {
                // Pull each preference from the array
                tourist.preferences.pull(preference);
            });
        } else {
            // In case a single preference ID is provided
            tourist.preferences.pull(preferences);
        }

        await tourist.save();

        res.status(200).json({ message: 'Preferences removed successfully', tourist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const viewComplaints = async (req, res) => {
    const touristId = req.params.id; // Extracting the tourist ID from the URL parameters

    try {
        const complaints = await Complaints.find({ tourist: touristId }).select('title body state date');
        console.log(complaints);
        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaints.', error });
    }
};

const bookItinerary = async (req, res) => {
    const { touristId, itineraryId } = req.params; // Extracting touristId and itineraryId from URL parameters
    const { numberOfPeople, paymentMethod, promoCode, bookingDate } = req.query;
    console.log(paymentMethod);
    console.log(numberOfPeople);
    
    console.log("promocode "+promoCode);

    try {
       
        const parsedDate = new Date(bookingDate);

        const bookingObject = {
            itineraryId: itineraryId,
            bookingDate: parsedDate // Use the parsed date
        };

        // Retrieve tourist details and check if itineraryId is already booked
        const reqTourist = await Tourist.findById(touristId);
        if (!reqTourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Check if the itineraryId is already in bookedItineraries
        const isAlreadyBooked = reqTourist.bookedItineraries.some(
            (booking) => booking.itineraryId.toString() === itineraryId
        );

        if (isAlreadyBooked) {
            return res.status(400).json({ message: 'Itinerary already booked by this tourist' });
        }
        const itineraryUpdate = await Itinerary.findByIdAndUpdate(
            itineraryId, 
            // { $addToSet: { touristIDs: { touristId: touristId, bookingDate: parsedDate } } }, // Add the object with both touristId and bookingDate
            { new: true }
        );
        
        if (!itineraryUpdate) {
            return res.status(404).json({ message: 'Itinerary not found or update failed' });
        }
        itineraryUpdate.sales += 1; // Increment sales by 1
        await itineraryUpdate.save(); // Save the updated itinerary with incremented sales
      

            // Fetch itinerary details
            const itinerary = await Itinerary.findById(itineraryId);
            if (!itinerary) {
                return res.status(404).json({ message: 'Itinerary not found' });
            }

        let totalPrice = itinerary.price * numberOfPeople;
        let promoCodeDetails = null;

        // Validate and apply promo code
        if (promoCode) {
            promoCodeDetails = await PromoCode.findOne({ code: promoCode });
            if (
                !promoCodeDetails ||
                !promoCodeDetails.isActive ||
                promoCodeDetails.endDate < new Date() ||
                !reqTourist.promoCodes.includes(promoCodeDetails._id)
            ) {
                return res.status(400).json({ message: 'Invalid, expired, or unauthorized promo code' });
            }

            const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
            totalPrice -= discountAmount;

            // Mark promo code as used
            promoCodeDetails.isActive = false;
            await promoCodeDetails.save();
        }

        console.log("totalPrice "+ totalPrice);

        // Wallet payment handling
        if (paymentMethod === 'wallet' && reqTourist.wallet < totalPrice) {
            return res.status(400).json({ message: 'Insufficient funds in wallet' });
        }

        if (paymentMethod === 'wallet') {
            console.log("wallet before "+ reqTourist.wallet);
            reqTourist.wallet -= totalPrice;
            console.log("wallet after "+ reqTourist.wallet);
            await reqTourist.save();
        }

        // Update itinerary's touristIDs
        itinerary.touristIDs.push({
            touristId,
            bookingDate: parsedDate,
            paidPrice: totalPrice,
            numberOfPeople,
        });

        // Update itinerary sales
        if (!promoCodeDetails) {
            itinerary.sales += numberOfPeople;
        }
        await itinerary.save();

         // Calculate new points and badge details
         const itineraryPrice = totalPrice;
         const oldAmount = reqTourist.badge.amount;
         const oldPoints = reqTourist.loyaltyPoints;
         const newPoints = (itineraryPrice * oldAmount) + oldPoints;
         
         let newLevel = reqTourist.badge.level;
         let newAmount = oldAmount;
       
        if (newPoints > 100000) {
            newLevel = 2;
            newAmount = 1;
        }
        if (newPoints > 500000) {
            newLevel = 3;
            newAmount = 1.5;
        }

        // Update the tourist's booked itineraries and other details
        const touristUpdate = await Tourist.findByIdAndUpdate(
            touristId, 
            { 
                $push: { bookedItineraries: bookingObject }, // Add the booking
                $set: { 
                    loyaltyPoints: newPoints,          // Update loyalty points
                    'badge.level': newLevel,           // Update badge level
                    'badge.amount': newAmount          // Update badge amount
                }
            }, 
            { new: true }
        );

        if (!touristUpdate) {
            return res.status(404).json({ message: 'Tourist update failed' });
        }

        const receiptHtml = `
            <h2>Payment Receipt</h2>
            <p>Thank you for booking with us!</p>
            <p><strong>Itinerary:</strong> ${itineraryUpdate.title}</p>
            <p><strong>Date:</strong> ${parsedDate.toDateString()}</p>
            <p><strong>Amount Paid:</strong> $${itineraryPrice}</p>
            <p>We hope you have a great experience!</p>
        `;

        // Send payment receipt via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'winggo567@gmail.com',
                pass: 'smkg eghm yrzv yyir' // Ensure this is secure
            }
        });

        await transporter.sendMail({
            from: 'winggo567@gmail.com',
            to: reqTourist.email,
            subject: 'Payment Receipt for Your Itinerary Booking',
            html: receiptHtml
        });

        return res.status(200).json({
            message: 'Booking successful, receipt emailed',
            itinerary: itineraryUpdate,
            tourist: touristUpdate
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error during the booking process.', error });
    }
};

const cancelItinerary = async (req, res) => {
    const { touristId, itineraryId } = req.params;

    try {
        // Step 1: Fetch the tourist with the given touristId
        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found.' });
        }

        // Step 2: Check if the itinerary exists in the tourist's bookedItineraries array
        const bookedItinerary = tourist.bookedItineraries.find(
            itinerary => itinerary.itineraryId.toString() === itineraryId
        );

        if (!bookedItinerary) {
            return res.status(404).json({ message: 'Itinerary not found for this tourist.' });
        }

        // Fetch the full itinerary details to get the price
        const itinerary = await Itinerary.findById(itineraryId);

        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found.' });
        }

        // Step 3: Check if the booking date is more than 48 hours from now
        const now = new Date();
        const bookingDate = bookedItinerary.bookingDate;

        if (!bookingDate) {
            return res.status(400).json({ message: 'Booking date is not valid.' });
        }

        const diffInMilliseconds = bookingDate.getTime() - now.getTime();

        if (diffInMilliseconds < 48 * 60 * 60 * 1000) {
            return res.status(400).json({ message: 'Cannot cancel the itinerary within 48 hours of the booking date.' });
        }

        // Step 4: Add the itinerary price to the tourist's wallet
        // if (!itinerary.price || isNaN(itinerary.price)) {
        //     return res.status(400).json({ message: 'Itinerary price is invalid or missing.' });
        // }

        // tourist.wallet = (tourist.wallet || 0) + itinerary.price;
        // await tourist.save();

        const touristEntry = itinerary.touristIDs.find(
            entry => entry.touristId.toString() === touristId
        );

        if (!touristEntry) {
            return res.status(404).json({ message: 'Booking not found for this tourist.' });
        }

        const paidPrice = touristEntry.paidPrice; // Retrieve the paid price
        tourist.wallet = (tourist.wallet || 0) + paidPrice; // Refund the paid price
        await tourist.save();

        // Step 5: Remove the specific itinerary from the bookedItineraries array
        const touristUpdate = await Tourist.findByIdAndUpdate(
            touristId,
            { $pull: { bookedItineraries: { itineraryId: itineraryId } } },
            { new: true }
        );

        if (!touristUpdate) {
            return res.status(404).json({ message: 'Failed to update tourist bookings.' });
        }

        // Step 6: Remove the touristId from the itinerary's touristIDs array
        const itineraryUpdate = await Itinerary.findByIdAndUpdate(
            itineraryId,
            { $pull: { touristIDs: { touristId: touristId } } }, // Match and remove the tourist entry
            { new: true }
        );

        if (!itineraryUpdate) {
            return res.status(404).json({ message: 'Itinerary not found or failed to update.' });
        }

        await itineraryUpdate.save();

        // itinerary.touristIDs = itinerary.touristIDs.filter(
        //     entry => entry.touristId.toString() !== touristId
        // );

        // Update sales if no promo code was used (optional, based on previous logic)
        if (!touristEntry.promoCodeId) {
            itinerary.sales -= touristEntry.numberOfPeople;
        }

        await itinerary.save();

        return res.status(200).json({
            message: 'Itinerary cancelled successfully.',
            walletBalance: tourist.wallet,
            tourist: touristUpdate,
            itinerary: itineraryUpdate
        });

    } catch (error) {
        console.error('Error cancelling the booking process:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error cancelling the booking process.', error });
    }
};

const redeemPoints = async (req, res) => {
    const { touristId } = req.params; // Extracting touristId from URL parameters
    const { points } = req.body; // Extracting points from the request body

    try {
        // Step 1: Fetch the tourist with the given touristId
        const tourist = await Tourist.findById(touristId);

        // Check if the tourist exists
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found.' });
        }
      
        // Calculate the value to be added to the wallet
        const oldPoints = tourist.loyaltyPoints;
       
        const convertedPointsToCredit = Math.floor((points / 10000) *100); // Conversion rate: 10,000 points = 100 EGP
        
       
        if (oldPoints < 100) {
            return res.status(400).json({ 
                message: 'Insufficient loyalty points. You need at least 100 points to redeem into your wallet.' 
            });
        }
        
        if(points <100){
            return res.status(400).json({ 
                message: 'You need to redeem at least 100 points.' 
            });
        };

        if(points > oldPoints){
            return res.status(400).json({
                message: 'You do not have enough points to redeem.'
            });
        }

        const remainingPoints = oldPoints - points;
        
        const amountToAdd = convertedPointsToCredit;
        // Step 3: Update tourist's wallet and loyalty points
       
        tourist.loyaltyPoints = remainingPoints;
        let newPoints = remainingPoints;
        
        


        // Update the tourist document
        const touristUpdate = await Tourist.findByIdAndUpdate(
            touristId, 
            { 
                $set: { 
                    loyaltyPoints: newPoints,          // Reset loyalty points
                                            
                },
                $inc: { wallet: amountToAdd }           // Increment wallet by toBeAdded amount
            }, 
            { new: true }
        );

        if (!touristUpdate) {
            return res.status(404).json({ message: 'Tourist update failed' });
        }

        return res.status(200).json({
            message: 'Points redeemed successfully and added to wallet.',
            tourist: touristUpdate
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error redeeming points.', error });
    }
};
const bookActivity = async (req, res) => {
    const { touristId, activityId } = req.params; // Extracting touristId and activityId from URL parameters
    const { numberOfPeople, paymentMethod, promoCode  } = req.body;

    console.log("Tourist booking now is: ",touristId);

    try {
        // Retrieve tourist details and check if the activityId is already booked
        const reqTourist = await Tourist.findById(touristId);
        if (!reqTourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Check if the activityId is already in bookedActivities
        const isAlreadyBooked = reqTourist.bookedActivities.some(
            (booking) => booking.toString() === activityId
        );
        if (isAlreadyBooked) {
            return res.status(400).json({ message: 'Activity already booked by this tourist' });
        }

        // Add the tourist to the activity's touristIDs array
        const activityUpdate = await Activity.findByIdAndUpdate(
            activityId,
            // { $addToSet: { touristIDs: touristId } }, // Use $addToSet to avoid duplicates
            { new: true }
        );

        if (!activityUpdate) {
            return res.status(404).json({ message: 'Activity not found or update failed' });
        }

        // activityUpdate.sales += 1 * numberOfPeople; // Increment sales
        // await activityUpdate.save();

          // Fetch activity details
        const activity = await Activity.findById(activityId);
        if (!activity || !activity.bookingOpen) {
        return res.status(404).json({ message: 'Activity not found or booking closed' });
        }

        let totalPrice = activity.price * numberOfPeople;
        let promoCodeDetails = null;
    
        // Validate and apply promo code
        if (promoCode) {
          promoCodeDetails = await PromoCode.findOne({ code: promoCode });
          if (
            !promoCodeDetails ||
            !promoCodeDetails.isActive ||
            promoCodeDetails.endDate < new Date() ||
            !reqTourist.promoCodes.includes(promoCodeDetails._id)
          ) {
            return res.status(400).json({ message: 'Invalid, expired, or unauthorized promo code' });
          }
    
          const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
          totalPrice -= discountAmount;
    
          // Mark promo code as used
          promoCodeDetails.isActive = false;
          await promoCodeDetails.save();
        }

        // Wallet payment handling
        // Check payment method and wallet balance
    if (paymentMethod === 'wallet' && reqTourist.wallet < totalPrice) {
        return res.status(400).json({ message: 'Insufficient funds in wallet' });
      }
  
      // Deduct wallet balance if applicable
      if (paymentMethod === 'wallet') {
        reqTourist.wallet -= totalPrice;
        await reqTourist.save();
      }

              // Calculate new points and badge details based on the activity's price
              const activityPrice = totalPrice;
              const oldAmount = reqTourist.badge.amount;
              const oldPoints = reqTourist.loyaltyPoints;
              const newPoints = activityPrice * oldAmount + oldPoints;
      
              // Determine new badge level and amount based on newPoints
              let newLevel = reqTourist.badge.level;
              let newAmount = oldAmount;

      // Update activity's touristIDs
        activity.touristIDs.push({
            touristId,
            paidPrice: totalPrice,
            numberOfPeople,
        });
    
        // Update activity sales or bookings
        if (!promoCodeDetails) {
            activity.sales += numberOfPeople;
        }
        // activity.numberOfPeople -= numberOfPeople; // Deduct spots booked
        await activity.save();
    
        // Update tourist's booked activities
        // reqTourist.bookedActivities.push(activityId);
        await reqTourist.save();

        if (newPoints > 100000) {
            newLevel = 2;
            newAmount = 1;
        }
        if (newPoints > 500000) {
            newLevel = 3;
            newAmount = 1.5;
        }

        // Update the tourist's booked activities and other details
        const touristUpdate = await Tourist.findByIdAndUpdate(
            touristId,
            {
                $addToSet: { bookedActivities: activityId }, // Add the activity to bookedActivities
                $set: {
                    loyaltyPoints: newPoints, // Update loyalty points
                    'badge.level': newLevel, // Update badge level
                    'badge.amount': newAmount, // Update badge amount
                },
            },
            { new: true }
        );

        if (!touristUpdate) {
            return res.status(404).json({ message: 'Tourist update failed' });
        }

        // Create receipt HTML
        const receiptHtml = `
            <h2>Payment Receipt</h2>
            <p><strong>Activity:</strong> ${activityUpdate.name}</p>
            <p><strong>Date:</strong> ${activityUpdate.date.toDateString()}</p>
            <p><strong>Amount Paid:</strong> $${activityPrice}</p>
            <p>Thank you for booking with us!</p>
            <p>We hope you have a great experience!</p>
        `;

        // Send payment receipt via email
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'winggo567@gmail.com',
                    pass: 'smkg eghm yrzv yyir', // Ensure this is secure
                },
            });

            await transporter.sendMail({
                from: 'winggo567@gmail.com',
                to: reqTourist.email,
                subject: 'Payment Receipt for Your Activity Booking',
                html: receiptHtml,
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            return res.status(500).json({
                message: 'Booking successful, but failed to send receipt email.',
                error: emailError.message,
            });
        }

        console.log("Tourist activities ",reqTourist.bookedActivities);

        // Success response
        return res.status(200).json({
            message: 'Booking successful, receipt emailed',
            activity: activityUpdate,
            tourist: touristUpdate,
        });
    } catch (error) {
        // Detailed error handling
        console.error('Error during booking process:', error);

        // Check for specific error fields like `message` or fallback to generic error object
        return res.status(500).json({
            message: 'Error during the activity booking process.',
            error: error.message || error.toString() || 'An unknown error occurred',
        });
    }
};

const cancelActivity = async (req, res) => {
    const { touristId, activityId } = req.params; // Extracting touristId and activityId from URL parameters

    try {
        const activity = await Activity.findById(activityId);

        // Check if the activity exists
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found.' });
        }

        // Find the tourist entry in the activity's touristIDs array
        const touristEntry = activity.touristIDs.find(
            entry => entry.touristId.toString() === touristId
        );

        if (!touristEntry) {
            return res.status(404).json({ message: 'Booking not found for this tourist.' });
        }

        // Check if the booking date is more than 48 hours from now
        const now = new Date();
        const bookingDate = activity.date; // Ensure this is the correct path

        if (!bookingDate) {
            return res.status(400).json({ message: 'Booking date is not valid.' });
        }

        const diffInMilliseconds = bookingDate.getTime() - now.getTime();
        if (diffInMilliseconds < 48 * 60 * 60 * 1000) {
            return res.status(400).json({ message: 'Cannot cancel the activity within 48 hours of the booking date.' });
        }

        // Add the price of the activity to the tourist's wallet
        const paidPrice = touristEntry.paidPrice; // Retrieve the paid price from the touristIDs array
        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found.' });
        }

        tourist.wallet = (tourist.wallet || 0) + paidPrice;
        await tourist.save();

        // Remove the specific activity from the bookedActivities array using $pull
        const touristUpdate = await Tourist.findByIdAndUpdate(
            touristId,
            { $pull: { bookedActivities: activityId } },
            { new: true }
        );

        if (!touristUpdate) {
            return res.status(404).json({ message: 'Failed to update tourist bookings.' });
        }

        // Remove the specific tourist entry from the activity's touristIDs array
        const activityUpdate = await Activity.findByIdAndUpdate(
            activityId,
            { $pull: { touristIDs: { touristId: touristId } } }, // Ensure the query matches nested documents
            { new: true }
        );

        console.log("Activity Update Result:", activityUpdate); // Debugging line

        if (!activityUpdate) {
            return res.status(404).json({ message: 'Activity not found or failed to update.' });
        }

        // Adjust sales if no promo code was used
        if (!touristEntry.promoCodeId) {
            activity.sales -= touristEntry.numberOfPeople;
            await activity.save();
        }

        return res.status(200).json({
            message: 'Activity cancelled successfully. The amount has been added to your wallet.',
            walletBalance: tourist.wallet,
            tourist: touristUpdate,
            activity: activityUpdate
        });

    } catch (error) {
        console.error('Error cancelling the booking process:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error cancelling the booking process.', error });
    }
};


const purchaseProduct = async (req, res) => {
    const { touristId, productId } = req.params;

    try {
        const tourist = await Tourist.findById(touristId);
        const product = await Product.findById(productId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.quantity <= 0) {
            return res.status(400).json({ message: 'Product out of stock' });
        }

        // Decrease product quantity
        product.quantity -= 1;

        // Add product to purchasedProducts array
        tourist.purchasedProducts.push({ productId: product._id, purchaseDate: new Date() });

        // Save changes
        await tourist.save();
        await product.save();

        res.status(200).json({
            message: 'Product purchased successfully',
            product,
            tourist
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing purchase', error });
    }
};
const rateProduct = async (req, res) => {
    const { touristId, productId } = req.params;
    const { rating } = req.body; // Expecting a rating in the body

    try {
        console.log(`Received request: Tourist ID: ${touristId}, Product ID: ${productId}, Rating: ${rating}`);

        // Check if tourist exists
        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            console.error('Tourist not found');
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            console.error('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the tourist has purchased the product
        const purchasedProduct = tourist.purchasedProducts.find(
            (purchase) => purchase.productId.toString() === productId
        );

        if (!purchasedProduct) {
            console.error('Product not purchased by this tourist');
            return res.status(400).json({ message: 'Product not purchased by this tourist' });
        }

        // Initialize `ratings` array if it doesn't exist
        if (!Array.isArray(product.ratings)) {
            product.ratings = [];
        }

        // Push a new rating to the `ratings` array
        product.ratings.push({ touristId, rating });
        
         // Recalculate the average rating
         const totalRatings = product.ratings.length;
         const sumRatings = product.ratings.reduce((sum, r) => sum + parseFloat(r.rating), 0);
         product.averageRating = sumRatings / totalRatings;


        // Save the updated product
        await product.save();

        res.status(200).json({
            message: 'Product rated successfully',
            product
        });
    } catch (error) {
        console.error('Error processing rating:', error);
        res.status(500).json({ message: 'Error processing rating', error });
    }
};



const getTouristById = async (req, res) => {
    const { id } = req.params;
    try {
      const tourist = await Tourist.findById(id);
      if (!tourist) {
        return res.status(404).json({ message: 'Tourist not found' });
      }
      res.status(200).json(tourist);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tourist data', error });
    }
  };

const reviewProduct = async (req, res) => {
    const { touristId, productId } = req.params;
    const { review } = req.body; // Expecting a review text in the body

    try {
        console.log(`Received request: Tourist ID: ${touristId}, Product ID: ${productId}, Review: ${review}`);

        // Check if tourist exists
        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            console.error('Tourist not found');
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            console.error('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the tourist has purchased the product
        const purchasedProduct = tourist.purchasedProducts.find(
            (purchase) => purchase.productId.toString() === productId
        );

        if (!purchasedProduct) {
            console.error('Product not purchased by this tourist');
            return res.status(400).json({ message: 'Product not purchased by this tourist' });
        }

        // Initialize `reviews` array if it doesn't exist
        if (!product.reviews) {
            product.reviews = [];
        }

        // Append the new review to the `reviews` array
        product.reviews.push({
            touristId,
            review,
        });

        // Save the updated product
        await product.save();

        res.status(200).json({ message: 'Review added successfully', product });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Error adding review', error });
    }
};


const rateActivity = async (req, res) => {
    const { touristId, activityId } = req.params;
    const { rating } = req.body; // Expecting a rating in the body

    try {
        // Fetch the completed activities for the tourist
        const completedActivities = await getCompletedActivities(touristId); // Ensure correct touristId

        // Check if the activity is in the list of completed activities
        const isCompleted = completedActivities.some(activity => activity._id.toString() === activityId);
        if (!isCompleted) {
            return res.status(400).json({ message: 'You can only rate activities that you have completed.' });
        }

        // Find the activity
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        // Check if the tourist has already rated this activity
        const existingRatingIndex = activity.ratings.findIndex(
            (review) => review.touristId.toString() === touristId
        );

        if (existingRatingIndex > -1) {
            // Update the existing rating if the tourist has already rated the activity
            console.log('Updating existing rating');
            activity.ratings[existingRatingIndex].rating = rating;
        } else {
            // Add a new rating if the tourist hasn't rated this activity yet
            console.log('Adding new rating');
            activity.ratings.push({ touristId, rating });
        }

        // Calculate the new average rating
        const totalRating = activity.ratings.reduce((sum, ratingObj) => sum + ratingObj.rating, 0);
        const averageRating = totalRating / activity.ratings.length;

        // Update the average rating field in the activity
        activity.averageRating = averageRating;

        // Save the updated activity
        await activity.save();

        // Send a response with the updated information
        return res.status(200).json({
            message: 'Activity rated successfully',
            averageRating: activity.averageRating,
            activity
        });

    } catch (error) {
        console.error('Error processing rating:', error);
        return res.status(500).json({ message: 'Error processing rating', error });
    }
};




const deleteTouristIfEligible = async (req, res) => {
    const { id } = req.params;  // Tourist ID

    try {
        // Find the tourist by ID
        const tourist = await Tourist.findById(id);
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Check bookedItineraries for upcoming bookings
        const hasUpcomingItinerary = tourist.bookedItineraries.some(booking => {
            console.log("date it "+ (new Date(booking.bookingDate) >= new Date()));
            return new Date(booking.bookingDate) >= new Date();
        });

        if (hasUpcomingItinerary) {
            return res.status(400).json({ message: 'Cannot delete tourist account: There is an upcoming itinerary booking.' });
        }

        // Check bookedActivities for upcoming bookings
        const hasUpcomingActivity = await Activity.exists({
            _id: { $in: tourist.bookedActivities },
            date: { $gte: new Date() }
        });

        if (hasUpcomingActivity) {
            return res.status(400).json({ message: 'Cannot delete tourist account: There is an upcoming activity booking.' });
        }

        // Delete the tourist account and associated login credentials
        await Tourist.findByIdAndDelete(id);
        await LoginCredentials.deleteOne({ userId: id, roleModel: 'Tourist' });

        res.status(200).json({ message: 'Tourist account and associated data deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getCompletedItineraries = async (req, res) => {
    const { touristId } = req.params;
    const currentDate = new Date();

    try {
        // Find the tourist and filter their booked itineraries based on past booking dates
        const tourist = await Tourist.findById(touristId).populate('bookedItineraries.itineraryId');
        
        if (!tourist) {
            //return res.status(404).json({ message: 'Tourist not found' });
       return [];
        }

        // Filter for completed itineraries
        const completedItineraries = tourist.bookedItineraries.filter(booking =>
            booking.bookingDate < currentDate // Check if the booking date is in the past
        ).map(booking => booking.itineraryId);

    //   res.status(200).json(completedItineraries);
     return completedItineraries;
    } catch (error) {
        console.error('Error fetching completed itineraries:', error);
        res.status(500).json({ error: 'An error occurred while retrieving completed itineraries' });
    }
};
const getCompletedActivities = async (touristId) => {
    const currentDate = new Date();

    try {
        // Ensure the touristId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(touristId)) {
            throw new Error('Invalid touristId');
        }

        // Find the tourist and populate the booked activities to get activity details
        const tourist = await Tourist.findById(touristId).populate('bookedActivities');

        if (!tourist) {
            throw new Error('Tourist not found');
        }

        // Filter for completed activities based on the activity date being in the past
        const completedActivities = tourist.bookedActivities.filter(activity =>
            activity.date < currentDate // Check if the activity date is in the past
        );

        return completedActivities;
    } catch (error) {
        console.error('Error fetching completed activities:', error);
        throw new Error('An error occurred while retrieving completed activities');
    }
};

//function to rate an itinerary but i want to add a check to ensure that the tourist has actually booked the itinerary before rating it and use the getCompletedItineraries function to check if the itinerary is in the list of completed itineraries

const rateItinerary = async (req, res) => {
    const { touristId, itineraryId } = req.params;
    const { rating } = req.body;

    console.log('rate ');

    try {
        // Fetch the completed itineraries for the tourist
        const completedItineraries = await getCompletedItineraries({ params: { touristId } }, res);

        // Check if the itinerary is in the list of completed itineraries
        const isCompleted = completedItineraries.some(itinerary => itinerary._id.toString() === itineraryId);

        if (!isCompleted) {
            return res.status(400).json({ message: 'You can only rate itineraries that you have completed.' });
        }

        // Find the itinerary and add the rating
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        // Add the new rating to the ratings array
        itinerary.ratings.push(rating);

        // Recalculate the average rating
        const totalRatings = itinerary.ratings.length;
        const sumRatings = itinerary.ratings.reduce((sum, r) => sum + r, 0);  // Ratings are numeric values
        itinerary.averageRating = sumRatings / totalRatings;

        await itinerary.save();

        res.status(200).json({ message: 'Itinerary rated successfully', itinerary });
    } catch (error) {
        console.error('Error in rateItinerary:', error.message);
        res.status(500).json({ error: 'An error occurred while rating the itinerary.' });
    }

    console.log('rate done');
};




const commentOnItinerary = async (req, res) => {
    const { touristId, itineraryId } = req.params;
    const { comment } = req.body;

    console.log('comment');

    try {
        // Fetch the completed itineraries for the tourist
        const completedItineraries = await getCompletedItineraries({ params: { touristId } }, res);

        // Check if the itinerary is in the list of completed itineraries
        const isCompleted = completedItineraries.some(itinerary => itinerary._id.toString() === itineraryId);

        if (!isCompleted) {
            return res.status(400).json({ message: 'You can only comment on itineraries that you have completed.' });
        }

        // Find the itinerary and add the comment
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        // Add the comment to the itinerary
        itinerary.comment.push({ tourist: touristId, text: comment });
        await itinerary.save();

        res.status(200).json({ message: 'Comment added successfully', itinerary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    console.log('rate done');
};
const commentOnActivity = async (req, res) => {
    const { touristId, activityId } = req.params; // Retrieve touristId and activityId from the URL
    const { comment } = req.body;

    // Check if touristId and activityId are provided
    if (!touristId || !activityId) {
        return res.status(400).json({ message: 'Missing required parameters: touristId or activityId' });
    }

    try {
        // Log the touristId to confirm it is correctly passed
        console.log(`Received touristId: ${touristId} and activityId: ${activityId}`);

        // Fetch the completed activities for the tourist
        let completedActivities;
        try {
            completedActivities = await getCompletedActivities(touristId); // Pass touristId directly like in rateActivity
        } catch (err) {
            console.error('Error fetching completed activities:', err.message);
            return res.status(500).json({ message: 'Error occurred while retrieving completed activities', error: err.message });
        }

        // Check if completed activities are retrieved
        if (!completedActivities || completedActivities.length === 0) {
            return res.status(404).json({ message: 'No completed activities found for this tourist.' });
        }

        // Check if the activity is in the list of completed activities
        const isCompleted = completedActivities.some(activity => activity._id.toString() === activityId);

        if (!isCompleted) {
            return res.status(400).json({ message: 'You can only comment on activities that you have completed.' });
        }

        // Find the activity by its ID
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        // Initialize `comments` array if it doesn't exist
        if (!Array.isArray(activity.comments)) {
            activity.comments = [];
        }

        // Add the new comment as a separate entry
        activity.comments.push({ touristId, comment });
        console.log('Adding new comment');

        // Save the updated activity
        await activity.save();

        res.status(200).json({
            message: 'Comment added successfully',
            activity
        });
    } catch (error) {
        console.error('Error processing comment:', error);  // Log the full error for debugging
        res.status(500).json({ message: 'Error processing comment', error: error.message });
    }
};




//function to rate tourguide using the tourguide id and use the getCompletedItineraries function to check if the tourguide is in the list of completed itineraries
const rateTourGuide = async (req, res) => {
    const { touristId, tourGuideId } = req.params;
    const { rating } = req.body;
console.log(tourGuideId);
    try {
        // Fetch the completed itineraries for the tourist
        const completedItineraries = await getCompletedItineraries({ params: { touristId } }, res);

        // Check if the tourGuideId is in the list of completed itineraries
        const isCompleted = completedItineraries.some(itinerary => itinerary.tourGuideId.toString() === tourGuideId);

        if (!isCompleted) {
            return res.status(400).json({ message: 'You can only rate tour guides that you have interacted with.' });
        }
console.log("isCompleted=true");
        // Find the tour guide and add the rating
        const tourGuide = await TourGuide.findById(tourGuideId);
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }

        // Add the new rating to the ratings array
        tourGuide.ratings.push(rating);

        // Recalculate the average rating
        const totalRatings = tourGuide.ratings.length;
        const sumRatings = tourGuide.ratings.reduce((sum, r) => sum + r, 0);  // Ratings are numeric values
        tourGuide.averageRating = sumRatings / totalRatings;

        await tourGuide.save();

        res.status(200).json({ message: 'Tour guide rated successfully', tourGuide });
    } catch (error) {
        console.error('Error in rateTourGuide:', error.message);
        res.status(500).json({ error: 'An error occurred while rating the tour guide.' });
    }
};
//function to comment on tourguide using the tourguide id and use the getCompletedItineraries function to check if the tourguide is in the list of completed itineraries
const commentOnTourGuide = async (req, res) => {
    const { touristId, tourGuideId } = req.params;
    const { comment } = req.body;

    try {
        // Fetch the completed itineraries for the tourist
        const completedItineraries = await getCompletedItineraries({ params: { touristId } }, res);

        // Check if the tourGuideId is in the list of completed itineraries
        const isCompleted = completedItineraries.some(itinerary => itinerary.tourGuideId.toString() === tourGuideId);

        if (!isCompleted) {
            return res.status(400).json({ message: 'You can only comment on tour guides that you have interacted with.' });
        }

        // Find the tour guide and add the comment
        const tourGuide = await TourGuide.findById(tourGuideId);
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }

        // Add the comment to the tour guide
        tourGuide.comment.push({ tourist: touristId, text: comment });
        await tourGuide.save();

        res.status(200).json({ message: 'Comment added successfully', tourGuide });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAccessToken = async () => {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', process.env.AMADEUS_API_KEY);
      params.append('client_secret', process.env.AMADEUS_API_SECRET);
  
      const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      const accessToken = response.data.access_token;
      
      return accessToken;
    } catch (error) {
      console.error('Error fetching token:', error.response?.data || error.message);
      throw new Error('Failed to retrieve access token');
    }
  };

  

const searchFlights = async (origin, destination, departureDate, accessToken) => {

    try {
      
        console.log("Origin:", origin);
        console.log("Destination:", destination);
        console.log("Departure Date:", departureDate);
        
        const newAccessToken = await getAccessToken();
        if(!origin || !destination || !departureDate){
            return { message: 'Please provide origin, destination, and departureDate' };
        }
  
      console.log("Token retrieved successfully:", accessToken);
  
      const flightResponse = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate,
          adults: 1,
        },
      });
      console.log("searchFlights is done");
      return flightResponse.data;
    } catch (error) {
        console.error('Error fetching flights:', error.response?.data || error.message);
        return { message: 'Error fetching token', error: error.response?.data || error.message };
    }
  };

  const getFlightPrices = async (req, res) => {
    const { origin, destination, departureDate } = req.query;

    
    

    if (!origin || !destination || !departureDate) {
        return res.status(400).json({ message: 'Please provide origin, destination, and departureDate' });
    }

    try {
        const accessToken = await getAccessToken();
        console.log('Token retrieved successfully:', accessToken);

        const FlightSearchResponse = await searchFlights(origin, destination, departureDate, accessToken);
        //console.log("Flight Search Response:", FlightSearchResponse.data);


        

        res.status(200).json(FlightSearchResponse.data);
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching token', error: error.response?.data || error.message });
    }
};


const bookFlight = async (req, res) => {
    const { flightOffers, paymentMethod, promoCode, adults } = req.body;
    const { touristId } = req.params;

    
    
    try {
        const type = "flight-order";
        const tourist = await Tourist.findById(touristId);

        const priceValidationResponse = flightOffers;

        if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found' });
        }


        const name = tourist.username;
        var dob = tourist.DOB;
        //change dob format to YYYY-MM-DD
        dob = dob.toISOString().split('T')[0];
        const email = tourist.email;
        let wallet = tourist.wallet;
        

    
        

       
  
      const validatedFlightOffer = priceValidationResponse;
      console.log("validatedFlightOffer:", validatedFlightOffer);
      
      // Initialize and adjust total price based on promo code
      let totalPrice = parseFloat(validatedFlightOffer.price.total) * adults; // Initialize total price
      let promoCodeDetails = null;

      if (promoCode) { // Validate and apply promo code
          promoCodeDetails = await PromoCode.findOne({ code: promoCode });
          if (
              !promoCodeDetails ||
              !promoCodeDetails.isActive ||
              promoCodeDetails.endDate < new Date() ||
              !tourist.promoCodes.includes(promoCodeDetails._id)
          ) {
              return res.status(400).json({ message: 'Invalid, expired, or unauthorized promo code' });
          }

          const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
          totalPrice -= discountAmount;

          // Mark promo code as used
          promoCodeDetails.isActive = false;
          await promoCodeDetails.save();
      }

      // This part is to be added or edited: Wallet payment handling
        if (paymentMethod === 'wallet') {
            if (wallet < totalPrice) { // Check if wallet has sufficient balance
                return res.status(400).json({ message: 'Insufficient funds in wallet' });
            }
            wallet -= totalPrice; // Deduct the adjusted total price from the wallet
            await Tourist.findByIdAndUpdate(touristId, { wallet });
        }
       
        // Step 2: Use the access token to create a booking with Amadeus
         const amadeusResponse = validatedFlightOffer
        
        
       
        // Step 3: Extract a summary of the booking details from Amadeus' response
        //const flight = amadeusResponse.data.data; // Assuming the response has data array
        //const flightOffer = flight.flightOffers[0];
        //console.log('Flight Offer:', flightOffer);
        //const flightId = flight.id;
       // console.log('FlightID:', flightId);
        

        const summary = {
            flightId: validatedFlightOffer.id,
          userId: touristId,  // Add the user if authenticated
          origin: validatedFlightOffer.itineraries[0].segments[0].departure.iataCode,
          destination: validatedFlightOffer.itineraries[0].segments.slice(-1)[0].arrival.iataCode,
          departureDate: validatedFlightOffer.itineraries[0].segments[0].departure.at,
          arrivalDate: validatedFlightOffer.itineraries[0].segments.slice(-1)[0].arrival.at,
          duration: validatedFlightOffer.itineraries[0].duration,
          price: {
                currency: validatedFlightOffer.price.currency,
                total: totalPrice.toFixed(2), // Use the adjusted total price
            },
          
        };
    
        // Step 4: Save the summary to MongoDB
        const newBooking = new FlightBooking(summary);
        await newBooking.save();
    
        res.status(201).json({ message: 'Flight booked successfully', booking: newBooking });
      } catch (error) {
        console.error('Error booking flight:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error booking flight', error: error.response?.data || error.message });
      }
};

const shareActivityViaEmail = async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    if (!email || !id) {
        return res.status(400).json({ message: 'Please provide email and id' });
    }

    try {
        const item = await Activity.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const link = `http://localhost:3000/activity-details/${id}`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "winggo567@gmail.com",
                pass: "smkg eghm yrzv yyir"
            }
        });

        await transporter.sendMail({
            from: "winggo567@gmail.com",
            to: email,
            subject: 'Check out this Activity',
            text: `Here is the link: ${link}`,
            html: `<p>Here is the link: <a href="${link}">${link}</a></p>`
        });

        res.status(200).json({ message: 'Activity shared successfully via email', link });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing via email', error });
    }
};


const shareItineraryViaEmail = async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    if (!email || !id) {
        return res.status(400).json({ message: 'Please provide email and id' });
    }

    try {
        const item = await Itinerary.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        const link = `http://localhost:3000/it-details/${id}`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "winggo567@gmail.com",
                pass: "smkg eghm yrzv yyir"
            }
        });

        await transporter.sendMail({
            from: "winggo567@gmail.com",
            to: email,
            subject: 'Check out this Itinerary',
            text: `Here is the link: ${link}`,
            html: `<p>Here is the link: <a href="${link}">${link}</a></p>`
        });

        res.status(200).json({ message: 'Itinerary shared successfully via email', link });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing via email', error });
    }
};

const sharePlaceViaEmail = async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    if (!email || !id) {
        return res.status(400).json({ message: 'Please provide email and id' });
    }

    try {
        const item = await Place.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Place not found' });
        }

        const link = `http://localhost:3000/place-details/${id}`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "winggo567@gmail.com",
                pass: "smkg eghm yrzv yyir"
            }
        });

        await transporter.sendMail({
            from: "winggo567@gmail.com",
            to: email,
            subject: 'Check out this Place',
            text: `Here is the link: ${link}`,
            html: `<p>Here is the link: <a href="${link}">${link}</a></p>`
        });

        res.status(200).json({ message: 'Place shared successfully via email', link });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing via email', error });
    }
};

const shareProductViaEmail = async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    if (!email || !id) {
        return res.status(400).json({ message: 'Please provide email and id' });
    }

    try {
        const item = await Product.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const link = `${req.protocol}://${req.get('host')}/product/${id}`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "winggo567@gmail.com",
                pass: "smkg eghm yrzv yyir"
            }
        });

        await transporter.sendMail({
            from: "winggo567@gmail.com",
            to: email,
            subject: 'Check out this Product',
            text: `Here is the link: ${link}`,
            html: `<p>Here is the link: <a href="${link}">${link}</a></p>`
        });

        res.status(200).json({ message: 'Product shared successfully via email', link });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing via email', error });
    }
};

    // const shareViaLink = (req, res) => { // To be done with FrontEnd
    //     const { type, id } = req.body;

    //     if (!type || !id) {
    //         return res.status(400).json({ message: 'Please provide type and id' });
    //     }

    //     try {
    //         const link = `${req.protocol}://${req.get('host')}/${type}/${id}`;
    //         res.status(200).json({ message: 'Link generated successfully', link });
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error generating link', error });
    //     }
    // };

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/' + fromCurrency);
            const rate = response.data.rates[toCurrency];
            return amount * rate;
        } catch (error) {
            console.error('Error converting currency:', error.message);
            throw new Error('Failed to convert currency');
        }
};

const updateProductPricesToCurrency = async (req, res) => {
        const { currency = 'USD' } = req.query;  // Default currency is USD
    
        try {
            const products = await Product.find();
            await Promise.all(products.map(async product => {
                if (currency !== 'USD') {
                    const priceInCurrency = await convertCurrency(product.price, 'USD', currency);
                    product.price = priceInCurrency;
                    await product.save();
                }
            }));
    
            res.status(200).json({ message: 'Product prices updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
};


  
const searchHotelsByCity = async (cityCode) => {

        

        if (!cityCode) {
            return res.status(400).json({ message: 'Please provide cityCode' });
        }

        try {
      
  
            
    
        const options = {
            method: 'GET',
            url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel',
            params: {query: cityCode},
            headers: {
              'x-rapidapi-key': 'a403c51361mshf65ec4c02b27c1cp1eb07ajsneaf03822010d',
              'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
            }
          };
          const response = await axios.request(options);
            console.log(response.data.data[0]);
        return response.data.data[0].entityId;
        } catch (error) {
            console.error("Error fetching token:", error.response?.data || error.message);
            return { message: 'Error fetching token', error: error.response?.data || error.message };
        }

};

const searchHotelsByGeoLocation = async (latitude,longitude) => {
        
    
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Please provide latitude and longitude' });
        }
        
        try {
            const accessToken = await getAccessToken();
    
            const hotelResponse = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    latitude: latitude,
                    longitude: longitude,
                },
            });
    
            return hotelResponse.data;

        } catch (error) {
            console.error("Error fetching token:", error.response?.data || error.message);
            return { message: 'Error fetching token', error: error.response?.data || error.message };
        }
};

const getHotelOffersByCity = async (req, res) => {

        const { cityCode, checkin, checkout } = req.query;

        if (!cityCode) {
            return res.status(400).json({ message: 'Please provide cityCode' });
        }

        try {

            const apiKey = "a403c51361mshf65ec4c02b27c1cp1eb07ajsneaf03822010d";
            const apiHost ="sky-scrapper.p.rapidapi.com";

            

            const hotelSearchResponse = await searchHotelsByCity(cityCode);
            console.log("Hotel Search Response:", hotelSearchResponse);
            console.log(typeof hotelSearchResponse);

            const options = {
                method: 'GET',
                url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchHotels',
                params: {
                  entityId: hotelSearchResponse,
                    checkin: checkin,
                    checkout: checkout,
                    adults: '1',
                    rooms: '1',
                    limit: '30',
                    sorting: '-relevance',
                    currency: 'USD',
                    market: 'en-US',
                    countryCode: 'US'
                },
                headers: {
                  'x-rapidapi-key': 'a403c51361mshf65ec4c02b27c1cp1eb07ajsneaf03822010d',
                  'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
                }
              };

              const response = await axios.request(options);
              console.log(response.data);

            res.status(200).json(response.data.data.hotels);

        } catch (error) {
            console.error("Error fetching token:", error.response?.data || error.message);
            res.status(500).json({ message: 'Error fetching token', error: error.response?.data || error.message });
        }
};

const getHotelOffersByLocation = async (req, res) => {

        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Please provide latitude and longitude' });
        }

        try {

            const accessToken = await getAccessToken();
            console.log("Token retrieved successfully:", accessToken);

            const hotelSearchResponse = await searchHotelsByGeoLocation(latitude,longitude);
            console.log("Hotel Search Response:", hotelSearchResponse);

            const hotelIds = hotelSearchResponse.data.slice(0,10).map(hotel => hotel.hotelId);
            console.log("Hotel IDs:", hotelIds);

            const hotelOffersResponse = await axios.get('https://test.api.amadeus.com/v3/shopping/hotel-offers', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    hotelIds: hotelIds,
                
                },
                paramsSerializer: params => {
                  return Object.keys(params)
                    .map(key => `${key}=${encodeURIComponent(params[key].join(','))}`)
                    .join('&');
                },
            });

            res.status(200).json(hotelOffersResponse.data);

        } catch (error) {
            console.error("Error fetching token:", error.response?.data || error.message);
            res.status(500).json({ message: 'Error fetching token', error: error.response?.data || error.message });
        }

};

const bookHotel = async (req, res) => {

        const { hotelOffers, checkin, checkout, adults } = req.body;
        const { touristId } = req.params;
        const { promoCode, paymentMethod } = req.body;

        try {
            const type = "hotel-order";
            const tourist = await Tourist.findById(touristId);

            if (!tourist) {
                return res.status(404).json({ message: 'Tourist not found' });
            }
            const name = tourist.username;
            const email = tourist.email;
            const mobileNumber  = tourist.mobileNumber;
            const wallet = tourist.wallet;
            console.log("wallet: ", wallet);
            var dob = tourist.DOB;
            //change dob format to YYYY-MM-DD
            dob = dob.toISOString().split('T')[0];
            
            
            const accessToken = await getAccessToken();
            console.log("Token retrieved successfully:", accessToken);
             // Extract fields from hotelOffers for booking
             //const offerId = hotelOffers.offers[0].id;  // Retrieve the offer ID
             
             let totalPrice = hotelOffers.rawPrice * adults;  // Total price for the offer
             console.log("Total Price: ", totalPrice);
             const currency = "usd";  // Currency of the offer


             // ///////////////////////////// Promo Code Validation and Application Start /////////////////////////////
        if (promoCode) {
            promoCodeDetails = await PromoCode.findOne({ code: promoCode });
            if (
                !promoCodeDetails ||
                !promoCodeDetails.isActive ||
                promoCodeDetails.endDate < new Date() ||
                !tourist.promoCodes.includes(promoCodeDetails._id)
            ) {
                return res.status(400).json({ message: 'Invalid, expired, or unauthorized promo code' });
            }

            const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
            totalPrice -= discountAmount;
            promoCodeDetails.isActive = false; // Mark promo code as used
            await promoCodeDetails.save();
        }
        // ///////////////////////////// Promo Code Validation and Application End /////////////////////////////

            
           // ///////////////////////////// Wallet Payment Handling Start /////////////////////////////
           let newWallet = wallet;
        if (paymentMethod === 'wallet') {
            if (wallet < totalPrice) {
                return res.status(400).json({ message: 'Insufficient funds in wallet' });
            }

             newWallet = wallet - totalPrice;
            await Tourist.findByIdAndUpdate(touristId, { wallet: newWallet });
        }
        // ///////////////////////////// Wallet Payment Handling End /////////////////////////////


            const bookingResponse = hotelOffers;
            
             
                
                await Tourist.findByIdAndUpdate(touristId, { wallet: newWallet });


              const data = bookingResponse;
              

    const bookingSummary = {
      bookingId: data.hotelId,
      
      checkInDate: new Date(checkin),
      checkOutDate: new Date(checkout),
      guests: 
        {
            adults: adults,
        }
      ,
      price: {
        base: totalPrice
      },
      hotel: {
        hotelId: data.hotelId,
        name: data.name,
        address: [data.coordinates[0].toString(), data.coordinates[1].toString()],
      },
      userId: touristId,
    };

              const newBooking = new HotelBooking(bookingSummary);
              await newBooking.save();

                res.status(201).json({ message: 'Hotel booked successfully', booking: newBooking });
        }
        catch (error) {
            console.error('Error booking hotel:', error.response?.data || error.message);
            res.status(500).json({ message: 'Error booking hotel', error: error.response?.data || error.message });
        }
};


const getPromoCodeDiscountPerc = async (req, res) => {

        const { touristId } = req.params;
        const { code } = req.query;

        try {

            const tourist = await Tourist.findById(touristId);
            

            const promoCodeDetails = await PromoCode.findOne({ code: code });
            if (
                !promoCodeDetails ||
                !promoCodeDetails.isActive ||
                promoCodeDetails.endDate < new Date() ||
                !tourist.promoCodes.includes(promoCodeDetails._id)
            ) {
                return res.status(400).json({ message: 'Invalid, expired, or unauthorized promo code' });
            }

            const discountAmount = (promoCodeDetails.discount / 100);

            res.status(200).json({ message: 'Promo Code Discount Percentage', promoCodeDetails });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching promo code discount percentage', error });
        }
};

            


const bookTransport = async (req, res) => {
        const { touristId, transportId } = req.params;
        const { paymentMethod, promoCode } = req.body; 
    
        try {
            // Find the tourist by ID
            const tourist = await Tourist.findById(touristId);
            if (!tourist) {
                return res.status(404).json({ message: 'Tourist not found' });
            }
    
            // Find the transport by ID
            const transport = await Transport.findById(transportId);
            if (!transport) {
                return res.status(404).json({ message: 'Transport not found' });
            }
    
            // // Check if the tourist has enough funds in their wallet
            // if (tourist.wallet < transport.price) {
            //     return res.status(400).json({ message: 'Insufficient funds in wallet' });
            // }
    
            // // Subtract the price of the transport from the tourist's wallet
            // tourist.wallet -= transport.price;

        let totalPrice = transport.price; // // This part will be added to initialize total price
        let promoCodeDetails = null;

        // // This part will be added: Validate and apply promo code
        if (promoCode) {
            promoCodeDetails = await PromoCode.findOne({ code: promoCode });
            if (
                !promoCodeDetails ||
                !promoCodeDetails.isActive ||
                promoCodeDetails.endDate < new Date() ||
                !tourist.promoCodes.includes(promoCodeDetails._id)
            ) {
                return res.status(400).json({ message: 'Invalid, expired, or unauthorized promo code' });
            }

            const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
            totalPrice -= discountAmount;

            // Mark promo code as used
            promoCodeDetails.isActive = false;
            await promoCodeDetails.save();
        }

        // // This part will be edited: Wallet payment handling
        if (paymentMethod === 'wallet') {
            if (tourist.wallet < totalPrice) {
                return res.status(400).json({ message: 'Insufficient funds in wallet' });
            }

            // Deduct from wallet
            tourist.wallet -= totalPrice;
        }
    
            // Add the tourist ID to the transport's touristID field
            transport.touristID = touristId;
            await transport.save();
    
            // Add the transport ID to the tourist's transports field
            tourist.transports.push(transportId);
            await tourist.save();
    
            res.status(200).json({
                message: 'Transport booked successfully',
                totalPrice,
                transport,
                tourist
            });
        } catch (error) {
            res.status(500).json({ message: 'Error booking transport', error: error.message });
        }
};

           
const getBookedItineraries = async (req, res) => {
        const { touristId } = req.params;
    
        try {
            // Find the tourist by ID and populate the itinerary details
            const tourist = await Tourist.findById(touristId).populate({
                path: 'bookedItineraries.itineraryId',
                model: 'Itinerary'
            });
    
            if (!tourist) {
                return res.status(404).json({ message: 'Tourist not found' });
            }
    
            // Extract and format the itinerary data
            const bookedItineraries = tourist.bookedItineraries.map((booking) => ({
                itinerary: booking.itineraryId,
                bookingDate: booking.bookingDate
            }));
    
            res.status(200).json(bookedItineraries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};  

const getBookedActivities = async (req, res) => {
        const { touristId } = req.params;
    
        try {
            // Find the tourist by ID and populate the activity details
            const tourist = await Tourist.findById(touristId).populate({
                path: 'bookedActivities', // Directly populate the 'bookedActivities' field
                model: 'Activity'
            });
    
            if (!tourist) {
                return res.status(404).json({ message: 'Tourist not found' });
            }
    
            // Extract and format the booked activities data
            const bookedActivities = tourist.bookedActivities.map((activity) => ({
                activity: activity,  // Activity details
            }));
    
            res.status(200).json(bookedActivities);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};

const getTouristUsername = async (req, res) => {
        try {
            const { id } = req.params;
            const tourist = await Tourist.findById(id).select('username'); // Only select the username field
    
            if (!tourist) {
                return res.status(404).json({ message: "Tourist not found" });
            }
    
            res.json({ username: tourist.username });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
};    
const getPurchasedProducts = async (req, res) => {
    const { touristId } = req.params;
  
    try {
      const tourist = await Tourist.findById(touristId).populate('purchasedProducts.productId');
      if (!tourist) {
        return res.status(404).json({ message: 'Tourist not found' });
      }
  
      const purchasedProductData = tourist.purchasedProducts.map(purchased => ({
        _id: purchased.productId ? purchased.productId._id : null,
        name: purchased.productId ? purchased.productId.name : null,
        picture: purchased.productId ? purchased.productId.picture || 'default.png' : null,
        price: purchased.productId ? purchased.productId.price : null,
        description: purchased.productId ? purchased.productId.description : null,
        ratings: purchased.productId ? purchased.productId.ratings : [],
      }));
  
      console.log("Purchased Products Data:", purchasedProductData); // Log the response
      res.status(200).json(purchasedProductData);
    } catch (error) {
      console.error("Error fetching purchased products:", error);
      res.status(500).json({ message: 'Error fetching purchased products', error });
    }
  };
  

const getUnbookedItineraries = async (req, res) => {
        const { touristId } = req.params;
    
        try {
            // Fetch the tourist to get their booked itineraries
            const tourist = await Tourist.findById(touristId);
            
            if (!tourist) {
                return res.status(404).json({ message: 'Tourist not found' });
            }
    
            // Get list of itinerary IDs that the tourist has already booked
            const bookedItineraryIds = tourist.bookedItineraries.map(item => item.itineraryId);
    
            // Fetch itineraries excluding the ones already booked by the tourist
            const unbookedItineraries = await Itinerary.find({
                _id: { $nin: bookedItineraryIds },
                flagged: false,   // Optionally exclude flagged itineraries
                availableDates: { $elemMatch: { $gte: new Date() } }, // Only upcoming dates
                deactivated: false // Exclude deactivated itineraries
            });
    
            if (unbookedItineraries.length === 0) {
                return res.status(404).json({ message: 'No unbooked itineraries found' });
            }
    
            res.status(200).json(unbookedItineraries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};
    

    // Check if a specific itinerary is booked by a tourist
const isItineraryBooked = async (req, res) => {
    const { touristId, itineraryId } = req.params;
  
    try {
      // Find the tourist by ID
      const tourist = await Tourist.findById(touristId);
  
      if (!tourist) {
        return res.status(404).json({ message: "Tourist not found" });
      }
  
      // Check if the itinerary ID exists in the tourist's bookedItineraries array
      const isBooked = tourist.bookedItineraries.some(
        (booking) => booking.itineraryId.toString() === itineraryId
      );
  
      res.status(200).json({ isBooked });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Check if a specific activity is booked by a tourist
const isActivityBooked = async (req, res) => {
    const { touristId, activityId } = req.params;
  
    try {
        // Find the tourist by ID
        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        // Check if the activity ID exists in the tourist's bookedActivities array
        const isBooked = tourist.bookedActivities.some(
            (bookedActivityId) => bookedActivityId.toString() === activityId
        );

        res.status(200).json({ isBooked });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const searchFlightsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const flights = await FlightBooking.find({ userId });

        if (!flights.length) {
            return res.status(404).json({ message: "No flights found for this user" });
        }

        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const searchHotelsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const hotels = await HotelBooking.find({ userId });

        if (!hotels.length) {
            return res.status(404).json({ message: "No hotels found for this user" });
        }

        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const searchTransportsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const transports = await Transport.find({ touristID: userId });

        if (!transports.length) {
            return res.status(404).json({ message: "No transports found for this user" });
        }

        res.status(200).json(transports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
const getActivity = async (req, res) => {
    const { id } = req.params;  // Itinerary ID from the URL params

    try {
        // Find the itinerary by ID and ensure it belongs to the correct tour guide
        const activity = await Activity.findOne({ _id: id});  

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found.' });
        }

        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addToCart = async (req, res) => {
    const { productId, touristId } = req.params; // Extract productId and touristId from request parameters

    try {
        // Step 1: Check if the item already exists in the cart
        const existingCartItem = await Cart.findOne({ productId, touristId });

        if (existingCartItem) {
            return res.status(400).json({ message: 'This product is already in the cart for this tourist.' });
        }

        // Step 2: Fetch the product to get its details
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Validate product quantity
        if (product.quantity <= 0) {
            return res.status(400).json({ message: 'Product is out of stock.' });
        }

        // Step 3: Create a new cart item
        const cartItem = new Cart({
            touristId,
            productId,
            amount: 1, // Default to 1
            price: product.price, // Set product price in the cart
            name: product.name // Set product name in the cart
        });

        // Step 4: Save the cart item
        await cartItem.save();

        // Step 5: Return success response
        return res.status(201).json({
            message: 'Product added to cart successfully.',
            cartItem
        });
    } catch (error) {
        console.error('Error adding item to cart:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error adding item to cart.', error });
    }
};




const removeFromCart = async (req, res) => {
    const { productId, touristId } = req.params; // Extract productId and touristId from request parameters

    try {
        // Step 1: Find the cart item matching the touristId and productId
        const cartItem = await Cart.findOneAndDelete({ touristId, productId });

        // Step 2: Check if the cart item exists
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        // Step 3: Return success response
        return res.status(200).json({
            message: 'Product removed from cart successfully.',
            cartItem
        });
    } catch (error) {
        console.error('Error removing item from cart:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error removing item from cart.', error });
    }
};

const updateCartItemAmount = async (req, res) => {
    const { cartItemId } = req.params; // Extract cartItemId from request parameters
    const { amount } = req.body; // Extract amount from request body

    try {
        // Validate the amount
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: 'Invalid amount. It must be a valid number.' });
        }

        // Step 1: Find the cart item
        const cartItem = await Cart.findById(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        // Step 2: Fetch the related product to check its quantity
        const product = await Product.findById(cartItem.productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Step 3: Validate the new amount against the product's quantity
        if (amount < 1 || amount > product.quantity) {
            return res.status(400).json({
                message: `Amount must be between 1 and the available product quantity (${product.quantity}).`
            });
        }

        // Step 4: Update the amount
        cartItem.amount = amount;
        await cartItem.save();

        // Step 5: Return success response
        return res.status(200).json({
            message: 'Cart item amount updated successfully.',
            cartItem
        });
    } catch (error) {
        console.error('Error updating cart item amount:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error updating cart item amount.', error });
    }
};

const addDeliveryAddress = async (req, res) => {
    const { touristId } = req.params; // Extract touristId from request parameters
    const { addresses } = req.body; // Extract addresses array from the request body

    try {
        // Validate the addresses array
        if (!Array.isArray(addresses) || addresses.length === 0) {
            return res.status(400).json({ message: 'Invalid addresses. Please provide an array of non-empty strings.' });
        }

        // Validate each address in the array
        const validAddresses = addresses
            .filter(address => typeof address === 'string' && address.trim() !== '')
            .map(address => address.trim());

        if (validAddresses.length === 0) {
            return res.status(400).json({ message: 'No valid addresses provided.' });
        }

        // Find the tourist by ID
        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found.' });
        }

        // Add only unique addresses that are not already in the array
        const uniqueAddresses = validAddresses.filter(address => !tourist.deliveryAddresses.includes(address));

        // Check if there are no new unique addresses to add
        if (uniqueAddresses.length === 0) {
            return res.status(200).json({
                message: 'No new addresses to add. All provided addresses are already stored.',
                deliveryAddresses: tourist.deliveryAddresses
            });
        }

        // Add unique addresses to the deliveryAddresses array
        tourist.deliveryAddresses.push(...uniqueAddresses);
        // Set the chosenAddress field
        tourist.chosenAddress = addresses[0].trim();

        // Save the updated tourist document
        await tourist.save();

        // Return success response
        return res.status(200).json({
            message: 'Addresses added successfully.',
            addedAddresses: uniqueAddresses,
            deliveryAddresses: tourist.deliveryAddresses
        });
    } catch (error) {
        console.error('Error adding addresses:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error adding addresses.', error });
    }
};

const chooseAddress = async (req, res) => {
    const { touristId } = req.params; // Extract touristId from request parameters
    const { address } = req.body; // Extract the chosen address from the request body

    try {
        // Validate the address
        if (!address || typeof address !== 'string' || address.trim() === '') {
            return res.status(400).json({ message: 'Invalid address. Please provide a valid address.' });
        }

        // Find the tourist by ID
        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found.' });
        }

        // Check if the address exists in the deliveryAddresses array
        if (!tourist.deliveryAddresses.includes(address.trim())) {
            return res.status(400).json({ message: 'Address not found in the deliveryAddresses array.' });
        }

        // Set the chosenAddress field
        tourist.chosenAddress = address.trim();

        // Save the updated tourist document
        await tourist.save();

        // Return success response
        return res.status(200).json({
            message: 'Chosen address updated successfully.',
            chosenAddress: tourist.chosenAddress
        });
    } catch (error) {
        console.error('Error choosing address:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error choosing address.', error });
    }
};
// const getNotifications = async (req, res) => {
//     try {
//       const tourist = await Tourist.findById(req.user._id)
//         .select('notifications')
//         .populate('notifications.eventId notifications.itineraryId'); // Populate event/itinerary data
  
//       res.status(200).json({ notifications: tourist.notifications });
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching notifications', error });
//     }
//   };

const getNotifications = async (req, res) => {
    try {
      // Extract userId from the route parameter
      const { userId } = req.params;
      console.log('INNNN');
  
      // Fetch the tourist by ID
      const tourist = await Tourist.findById(userId)
        .select('notifications')
        .populate('notifications.eventId notifications.itineraryId'); // Populate event/itinerary data
  
      if (!tourist) {
        return res.status(404).json({ message: 'Tourist not found' });
      }
  
      // Return the notifications
      res.status(200).json({ notifications: tourist.notifications });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  };
  
  //// payments
  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "winggo567@gmail.com",
      pass: "smkg eghm yrzv yyir"
    }
  });

  
  const payForProducts = async (req, res) => {
    const { touristId, productId } = req.params;
  
    try {
      // Fetch the tourist and product
      const tourist = await Tourist.findById(touristId);
      const product = await Product.findById(productId).populate('seller');
  
      if (!tourist) {
        return res.status(404).json({ message: 'Tourist not found' });
      }
      if (!product) {
        return res.status(404).json({ message: 'product not found' });
      }
  
      // Check if tourist has enough balance
      if (tourist.wallet < product.price) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
      }
  
      // Deduct product price from tourist wallet
      tourist.wallet -= product.price;
  
      // Reduce product quantity
      product.quantity -= 1;
  
      // Check if product is out of stock
      if (product.quantity === 0) {
        const seller = product.seller;
  
        // Notify the seller in-app
        await Seller.findByIdAndUpdate(seller._id, {
          $push: {
            notifications: {
              type: 'stock-alert',
              message: `Your product '${product.name}' is now out of stock.`,
              date: new Date()
            }
          }
        });
  
        // Send email notification
        await transporter.sendMail({
          from: "winggo567@gmail.com",
          to: seller.email,
          subject: 'Out of Stock Alert',
          html: `<p>Your product <strong>${product.name}</strong> is now out of stock.</p>`
        });
      }
  
      // Save updated tourist and product
      await tourist.save();
      await product.save();
  
      res.status(200).json({ message: 'Payment successful', wallet: tourist.wallet });
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ message: 'Error processing payment', error });
    }
  };




const payForOrder = async (req, res) => {
    const { orderId } = req.params;
    const { paymentMethod, promoCode } = req.body;

    try {
        // Fetch the order
        const order = await Order.findById(orderId).populate('products.productId buyer');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is already paid
        if (order.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'Order has already been paid for' });
        }

        const buyer = order.buyer;
        let totalPrice = order.totalPrice;
        let promoCodeDetails = null;

        // Validate promo code
        if (promoCode) {
            promoCodeDetails = await PromoCode.findOne({ code: promoCode });
            if (
                !promoCodeDetails ||
                !promoCodeDetails.isActive ||
                promoCodeDetails.endDate < new Date() ||
                !buyer.promoCodes.includes(promoCodeDetails._id)
            ) {
                return res.status(400).json({ message: 'Invalid, expired, or unauthorized promo code' });
            }
            // Calculate discount
            const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
            totalPrice -= discountAmount;

            
        }

        // Update the order's total price with the discounted price
        order.totalPrice = totalPrice;
        order.paymentMethod = paymentMethod;
        await order.save();

        // Check wallet balance if payment method is wallet
        if (paymentMethod === 'wallet' && buyer.wallet < totalPrice) {
            return res.status(400).json({ message: 'Insufficient wallet balance' });
        }

        // Validate product quantities
        for (const item of order.products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }
        }

        // Validation passed, proceed with updates
        const sellerNotifications = []; // Notifications for sellers
        const adminNotifications = []; // Notifications for admins
        const admins = await Admin.find(); // Fetch all admins

        for (const item of order.products) {
            const product = await Product.findById(item.productId).populate('seller');

            // Deduct quantity
            product.quantity -= item.quantity;

            // Update discounted prices or sales
            if (promoCodeDetails) {
                product.discountedPrices.push({
                    promoCodeId: promoCodeDetails._id,
                    totalDiscountedPrice: (product.price - ((promoCodeDetails.discount / 100) * product.price)) * item.quantity,
                    quantity: item.quantity,
                });
            } else {
                product.sales += item.quantity;
            }

            // Add payment date to the sellingDates array
            const paymentDate = new Date(); // Current date and time
            product.sellingDates.push(paymentDate); // Add payment date to the array

            const purchasedProduct = {
                productId: product._id,
                rating: null, // You can set a default value for rating or remove this field if not needed
            };

            buyer.purchasedProducts.push(purchasedProduct);
            console.log(buyer.purchasedProducts);

            // Check if the product is out of stock
            if (product.quantity === 0) {
                if (product.seller) {
                    // Notify the seller in-app
                    sellerNotifications.push({
                        sellerId: product.seller._id,
                        notification: {
                            type: 'stock-alert',
                            message: `Your product '${product.name}' is now out of stock.`,
                            date: new Date(),
                        },
                    });

                    // Send email notification to the seller
                    await transporter.sendMail({
                        from: "winggo567@gmail.com",
                        to: product.seller.email,
                        subject: 'Out of Stock Alert',
                        html: `<p>Your product <strong>${product.name}</strong> is now out of stock.</p>`,
                    });
                } else {
                    // Notify all admins if the product was added by an admin
                    admins.forEach((admin) => {
                        adminNotifications.push({
                            adminId: admin._id,
                            notification: {
                                type: 'stock-alert',
                                message: `The product '${product.name}' (added by admin) is now out of stock.`,
                                date: new Date(),
                            },
                        });

                        // Send email notification to the admin
                        transporter.sendMail({
                            from: "winggo567@gmail.com",
                            to: admin.email,
                            subject: 'Out of Stock Alert',
                            html: `<p>The product <strong>${product.name}</strong> (added by admin) is now out of stock.</p>`,
                        });
                    });
                }
            }

            // Save updated product
            await product.save();
        }

        await buyer.save(); // Save the updated buyer with purchasedProducts


        // Deduct wallet balance if applicable
        if (paymentMethod === 'wallet') {
            buyer.wallet -= totalPrice;
            await buyer.save();
        }

        // Mark promo code as used
        if (promoCodeDetails) {
            promoCodeDetails.isActive = false;
            await promoCodeDetails.save();
        }

        // Mark order as paid
        order.paymentStatus = 'paid';
        await order.save();

        // Push notifications to sellers
        for (const { sellerId, notification } of sellerNotifications) {
            await Seller.findByIdAndUpdate(sellerId, { $push: { notifications: notification } });
        }

        // Push notifications to admins
        for (const { adminId, notification } of adminNotifications) {
            await Admin.findByIdAndUpdate(adminId, { $push: { notifications: notification } });
        }

        res.status(200).json({ message: 'Order payment successful', wallet: buyer.wallet });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Error processing payment', error });
    }
};


  
    const getItemsInCart = async (req, res) => {
    const { touristId } = req.params; // Extract touristId from request parameters

    try {
        // Find all cart items for the given touristId
        const cartItems = await Cart.find({ touristId });

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'No items found in the cart for this tourist.' });
        }

        // Map the cart items to include product details
        const productData = cartItems.map(item => ({
            _id: item._id,
            productId:item.productId,
            touristId:item.touristId,
            amount: item.amount, // Assuming Cart has an 'amount' field
            price: item.price,
            name:item.name
        }));

        res.status(200).json(productData);

    } catch (error) {
        console.error('Error retrieving cart items:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error retrieving cart items.', error });
    }
};


//decrease quantity of wwishlist product
// Decrease quantity of a wishlist product
const decQuantityByOne = async (req, res) => {
    const { touristId, productId } = req.params;

    try {
        // Find the wishlist item by touristId and productId
        const wishlistItem = await Wishlist.findOne({ touristId, productId });

        if (!wishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        // Check if quantity is greater than 1 before decrementing
        if (wishlistItem.quantity > 1) {
            wishlistItem.quantity -= 1;
            await wishlistItem.save();
            res.status(200).json({
                message: 'Quantity decreased by one successfully',
                wishlistItem,
            });
        } else {
            // Optionally, prevent quantity from going below 1
            return res.status(400).json({
                message: 'Quantity cannot be less than 1',
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//increase quantity of wishlist product
// Increase quantity of a wishlist product
const incQuantityByOne = async (req, res) => {
    const { touristId, productId } = req.params;

    try {
        // Find the wishlist item by touristId and productId
        const wishlistItem = await Wishlist.findOne({ touristId, productId });

        if (!wishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        // Increment the quantity by 1
        wishlistItem.quantity += 1;
        await wishlistItem.save();

        res.status(200).json({
            message: 'Quantity increased by one successfully',
            wishlistItem,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//add item to wishlist
const addWishlist = async (req, res) => {
    const { touristId ,productId} = req.params;
    

    try {
        // Find the tourist by ID
        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Check if the product is already in the wishlist
        const existingWishlistItem = await Wishlist.findOne({ touristId, productId });
        if (existingWishlistItem) {
            return res.status(400).json({ message: 'Product is already in the wishlist' });
        }


        // Add to wishlist
        const wishlistItem = new Wishlist({ touristId, productId });
        await wishlistItem.save();

    // Populate product details in the wishlist item
        const populatedWishlistItem = await Wishlist.findById(wishlistItem._id).populate('productId');
        res.status(200).json({
            message: 'Product added to wishlist successfully',
            wishlistItem: populatedWishlistItem,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View wishlist
const viewWishlist = async (req, res) => {
    const { touristId } = req.params;

    try {
        // Find the tourist by ID
        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Find all the wishlist items for the tourist and populate the product details
        const wishlistItems = await Wishlist.find({ touristId })
            .populate('productId') // Populate the productId with product details
            .exec();

        if (wishlistItems.length === 0) {
            return res.status(404).json({ message: 'No products in wishlist' });
        }

        res.status(200).json({ message: 'Wishlist fetched successfully', wishlistItems });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove an item from the wishlist
const removeWishlistItem = async (req, res) => {
    const { touristId, productId } = req.params;

    try {
        // Check if the tourist exists
        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Find and remove the wishlist item
        const removedItem = await Wishlist.findOneAndDelete({ touristId, productId });

        if (!removedItem) {
            return res.status(404).json({ message: 'Product not found in the wishlist' });
        }

        res.status(200).json({ message: 'Product removed from wishlist successfully', removedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// const getPromoCodesForTourist = async (req, res) => {
//     const { touristId } = req.params;
  
//     try {
//       const tourist = await Tourist.findById(touristId).populate('promoCodes');
//       if (!tourist) {
//         return res.status(404).json({ message: 'Tourist not found' });
//       }
  
//       res.status(200).json({ promoCodes: tourist.promoCodes });
//     } catch (error) {
//       console.error('Error fetching promo codes:', error);
//       res.status(500).json({ message: 'Error fetching promo codes', error });
//     }
//   };

const getPromoCodesForTourist = async (req, res) => {
    const { touristId } = req.params;

    try {
        const tourist = await Tourist.findById(touristId).populate({
            path: 'promoCodes',
            match: { 
                isActive: true, 
                endDate: { $gte: new Date() } // Ensure endDate is in the future
            }
        });
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        res.status(200).json({ promoCodes: tourist.promoCodes });
    } catch (error) {
        console.error('Error fetching promo codes:', error);
        res.status(500).json({ message: 'Error fetching promo codes', error });
    }
};

  

const addWishlistItemToCart = async (req, res) => {
    const { touristId, productId } = req.params; // Assuming productId is passed in the request body

    try {
        // 1. Check if the product exists in the wishlist for the given touristId
        const wishlistItem = await Wishlist.findOne({ touristId, productId });

        if (!wishlistItem) {
            return res.status(404).json({ message: "Product not found in wishlist" });
        }

        // 2. Check if the product already exists in the cart
        const existingCartItem = await Cart.findOne({ touristId, productId });

        if (existingCartItem) {
            return res.status(400).json({ message: "Product is already in the cart" });
        }

        // 3. Add the product to the cart
        const newCartItem = new Cart({
            touristId,
            productId,
            amount: 1 // Default amount to 1
        });

        await newCartItem.save();

        return res.status(201).json({ message: "Product added to cart", cartItem: newCartItem });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

//View order details & status
const orderDetails=async(req,res)=>{
    const { id } = req.params;
    try{
        const details=await Order.findById(id).populate('products.productId', 'name price ');
        res.status(200).json(details);
    } catch(error){
        res.status(500).json({error:error.message});
    }
};
//view past and current orders
const viewAllorders = async (req, res) => {
    const { touristId } = req.params; 
  
    try {
      const orders = await Order.find({ buyer: touristId, paymentStatus:'paid' })
            .populate({
        path: 'products.productId', // Populate the product details
        select: 'name price', // Only include name and price fields
      })  
      .sort({ createdAt: -1 }); 
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this tourist' });
      }
  
      res.status(200).json(orders); 
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching orders',
        error: error.message,
      });
    }
};

//cancel an order
const cancelOrder = async (req, res) => {
    const { touristId, orderId } = req.params; 
  
    try {
      const order = await Order.findById( orderId );

    //   if (!order) {
    //     return res.status(404).json({ message: 'Order not found' });
    //   }
  
    //   if (order.buyer.toString() !== touristId) {
    //     return res.status(403).json({ message: 'You are not authorized to cancel this order' });
    //   }
  
      if (order.orderStatus === 'cancelled') {
        return res.status(400).json({ message: 'Order already cancelled' });
      }

      if (order.paymentStatus === 'paid') {
        const tourist = await Tourist.findById(touristId);
  
        if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found' });
        }
  
        tourist.wallet += order.totalPrice;
        order.paymentStatus='notPaid';
        await tourist.save();
      }
  
      order.orderStatus = 'cancelled';

      await order.save(); 
  
      res.status(200).json({ message: 'Order has been cancelled successfully', order });
    } catch (error) {
      res.status(500).json({
        message: 'Error cancelling the order',
        error: error.message,
      });
    }
};
  




// Method to save an activity
const toggleSaveActivity = async (req, res) => {
    const { touristId, activityId } = req.params;
    const { save } = req.body; // Boolean value to save or unsave

           // Ensure the "save" field is present and is a boolean
           
    try {
        // Validate if the activity exists
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        // Add the activity to the savedActivities array if not already added
        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        
            // Save the activity
            if (!tourist.savedActivities.includes(activityId)) {
                tourist.savedActivities.push(activityId);
                await tourist.save();
                return res.status(200).json({ message: "Activity saved successfully", savedActivities: tourist.savedActivities });
            }           
           else {
            // Unsave the activity
            if (tourist.savedActivities.includes(activityId)) {
                tourist.savedActivities = tourist.savedActivities.filter(id => id.toString() !== activityId);
                await tourist.save();
                return res.status(200).json({ message: "Activity unsaved successfully", savedActivities: tourist.savedActivities });
            }
            return res.status(400).json({ message: "Activity not found in saved list" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
};

// Method to save an itinerary
const toggleSaveItinerary = async (req, res) => {
    const { touristId, itineraryId } = req.params;
    // const { save } = req.body; // Boolean value to save or unsave

        // Ensure the "save" field is present and is a boolean
      
    
    try {
        // Validate if the itinerary exists
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        // Add the itinerary to the savedItineraries array if not already added
        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }
  
            // Save the itinerary
            if (!tourist.savedItineraries.includes(itineraryId)) {
                tourist.savedItineraries.push(itineraryId);
                await tourist.save();
                return res.status(200).json({ message: "Itinerary saved successfully", savedItineraries: tourist.savedItineraries });
            }
            
         else {
            // Unsave the itinerary
            if (tourist.savedItineraries.includes(itineraryId)) {
                tourist.savedItineraries = tourist.savedItineraries.filter(id => id.toString() !== itineraryId);
                await tourist.save();
                return res.status(200).json({ message: "Itinerary unsaved successfully", savedItineraries: tourist.savedItineraries });
            }
            return res.status(400).json({ message: "Itinerary not found in saved list" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
};

const viewAllSavedEvents = async (req, res) => {
    const { touristId } = req.params;

    try {
        // Fetch the tourist's saved activities and itineraries with all fields
        const tourist = await Tourist.findById(touristId)
            .populate('savedActivities') // Fetch all fields from Activity schema
            .populate('savedItineraries'); // Fetch all fields from Itinerary schema

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        const savedActivities = tourist.savedActivities;
        const savedItineraries = tourist.savedItineraries;

        return res.status(200).json({
            message: 'Saved events retrieved successfully',
            savedActivities,
            savedItineraries
        });

    } catch (error) {
        console.error('Error fetching saved events:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const toggleNotificationPreference = async (req, res) => {
    const { touristId } = req.params; // Extract tourist ID from the URL
    const { notifyOnInterest } = req.body; // Boolean value from the request body

    try {
        // Ensure notifyOnInterest is a proper boolean
        const notifyPreference = notifyOnInterest === true || notifyOnInterest === "true";

        // Find the tourist and update their preference
        const tourist = await Tourist.findByIdAndUpdate(
            touristId,
            { notifyOnInterest: notifyPreference },
            { new: true }
        );

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        res.status(200).json({
            message: `Notification preference has been ${notifyPreference ? 'enabled' : 'disabled'} successfully.`,
            tourist,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update notification preference.',
            error: error.message,
        });
    }
};

const getFilteredActivities = async (req, res) => {
    try {
        const { touristId } = req.params;
        const { filterType } = req.query; // Dynamically fetch filterType from query

        console.log("Received filterType:", filterType); // Debugging

        const currentDate = new Date();

        const tourist = await Tourist.findById(touristId).populate('bookedActivities');

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        const filteredActivities = tourist.bookedActivities.filter((activity) => {
            const activityDate = new Date(activity.date);

            if (filterType === 'upcoming') {
                return activityDate >= currentDate;
            } else if (filterType === 'past') {
                return activityDate < currentDate;
            }
            return true; // Default to all
        });

        console.log("Filtered Activities:", filteredActivities); // Debug the filtered result

        res.status(200).json(filteredActivities);
    } catch (error) {
        console.error("Error in getFilteredActivities:", error);
        res.status(500).json({ message: "Failed to fetch activities" });
    }
};




  

//   const filterUpcomingActivities = async (req, res) => {
//     const { budget, date, category, averageRating } = req.query; 
//     // let filter = {}; // Initialize an empty filter object
//     let filter = { date: { $gte: new Date() }
//     // ,flagged: false
//   }; // Default filter: only upcoming activities (date >= today)

//     // Apply budget filter (if provided)
//     if (budget) {
//         filter.price = { $lte: budget }; // Price less than or equal to the specified budget
//     }

//      // Apply exact date filter
//      if (date) {
//         // Parse the incoming date in local time
//         const localDate = new Date(`${date}T00:00:00`); // YYYY-MM-DDT00:00:00 in local time

//         // Convert to UTC start and end of day
//         const startOfDay = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000); // UTC start
//         const endOfDay = new Date(startOfDay);
//         endOfDay.setUTCHours(23, 59, 59, 999); // UTC end of day

//         filter.date = { $gte: startOfDay, $lte: endOfDay };
//     }

//     // Apply category filter (if provided)
//     if (category) {
//         filter.category = category; // Exact match for category
//     }

//     // Apply averageRating filter (if provided)
//     if (averageRating) {
//         filter.averageRating = { $gte: parseFloat(averageRating) }; // Ensure the value is a float and filter activities
//     }

//     try {
//         // Find activities based on the constructed filter
//         const activities = await Activity.find(filter); 
        
//         res.status(200).json(activities); // Return filtered activities
//     } catch (error) {
//         res.status(400).json({ error: error.message }); 
//     }
// };

const getPrice = async (req, res) => {
    const { itineraryId } = req.params; // Extract itineraryId from URL parameters
    const { numberOfPeople, promoCode } = req.query; // Extract from query

    console.log("code: ",promoCode);
  
    try {
      // Fetch itinerary details
      const itinerary = await Itinerary.findById(itineraryId);
      if (!itinerary) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }
  
      let totalPrice = itinerary.price * numberOfPeople; // Base price calculation
      let promoCodeDetails = null;

      let isValidPromoCode= true;
  
      // Validate and apply promo code
      if (promoCode) {
        promoCodeDetails = await PromoCode.findOne({ code: promoCode });
        if (
          !promoCodeDetails ||
          !promoCodeDetails.isActive ||
          promoCodeDetails.endDate < new Date()
        ) {
            isValidPromoCode= false;
        //   return res.status(400).json({  message: 'Invalid or expired promo code',
        //     isValidPromoCode: false,  });
        }

        else if(isValidPromoCode){
  
        console.log("price before: ",totalPrice);
        const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
        console.log("discountAmount: ",discountAmount);
        totalPrice -= discountAmount;
        }
      }

      
  
      return res.status(200).json({ totalPrice,
        isValidPromoCode, });
    } catch (error) {
      console.error("Error during price calculation:", error);
      return res.status(500).json({ message: 'Error calculating price', error });
    }
  };
  const getCartTotalPrice = async (req, res) => {
    const { touristId } = req.params; // Extract touristId from URL parameters
    const { promoCode } = req.query; // Extract promo code from query
  
    try {
      // Fetch cart items for the given tourist
      const cartItems = await Cart.find({ touristId }).populate('productId'); // Populate product details
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ message: 'No items found in the cart' });
      }
  
      // Calculate total price for all cart items
      let totalPrice = 0;
      cartItems.forEach((item) => {
        if (!item.productId) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        totalPrice += item.price * item.amount; // price * quantity for each cart item
      });
  
      let discount = 0; // Initialize discount
  
      // Validate and apply promo code
      if (promoCode) {
        const promoCodeDetails = await PromoCode.findOne({ code: promoCode });
        if (!promoCodeDetails) {
          return res.status(400).json({ message: 'Invalid promo code' });
        }
  
        // Check if the tourist has this promo code
        const tourist = await Tourist.findById(touristId).populate('promoCodes');
  
        const hasPromoCode = tourist.promoCodes.some(
          (code) => code._id.toString() === promoCodeDetails._id.toString()
        );
  
        if (!hasPromoCode) {
          return res
            .status(400)
            .json({ message: 'Unauthorized promo code for this tourist' });
        }
  
        // Check if promo code is active and not expired
        if (!promoCodeDetails.isActive || promoCodeDetails.endDate < new Date()) {
          return res.status(400).json({ message: 'Promo code expired or inactive' });
        }
  
        // Calculate and apply discount
        discount = promoCodeDetails.discount; // Get discount percentage
        const discountAmount = (discount / 100) * totalPrice;
        totalPrice -= discountAmount;
      }
  
      // Return total price and discount applied
      return res.status(200).json({ totalPrice, discount });
    } catch (error) {
      console.error('Error during cart total price calculation:', error);
      return res
        .status(500)
        .json({ message: 'Error calculating cart total price', error });
    }
  };
  

  const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate the ID
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
  
      // Find the product by ID
      const product = await Product.findById(id);
  
      // Check if the product exists
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ product });
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };


const getDiscountByCode = async (req, res) => {
    try {
        const { code } = req.params; // Extract promo code from request parameters

        // Validate the code
        if (!code) {
            return res.status(400).json({ message: 'Promo code is required' });
        }

        // Find the promo code in the database
        const promoCode = await PromoCode.findOne({ code });

        // Check if the promo code exists and is active
        if (!promoCode || !promoCode.isActive) {
            return res.status(404).json({ message: 'Promo code not found or inactive' });
        }

        // Check if the promo code is within the validity period
        const currentDate = new Date();
        if (promoCode.startDate > currentDate || promoCode.endDate < currentDate) {
            return res.status(400).json({ message: 'Promo code is expired or not yet valid' });
        }

        // Return the discount
        res.status(200).json({ discount: promoCode.discount });
    } catch (error) {
        console.error('Error fetching promo code:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getDeliveryAddresses = async (req, res) => {
    const { touristId } = req.params;
  
    try {
      // Find the tourist by ID
      const tourist = await Tourist.findById(touristId).select("deliveryAddresses");
  
      if (!tourist) {
        return res.status(404).json({ message: "Tourist not found" });
      }
  
      // Return the delivery addresses
      return res.status(200).json({
        message: "Delivery addresses fetched successfully",
        deliveryAddresses: tourist.deliveryAddresses,
      });
    } catch (error) {
      console.error("Error fetching delivery addresses:", error);
      return res.status(500).json({ message: "Error fetching delivery addresses", error });
    }
  };

  

const getPlacesTags = async (req, res) => {
  try {
    console.log("enetered");
    // Fetch all places and project only the `tagss` field
    const places = await Place.find({}, "tagss"); // Use an empty filter object and select only `tagss`

    // Check if places exist
    if (!places || places.length === 0) {
      return res.status(404).json({ message: "No places found" });
    }

    // Extract all tags into a single array
    const allTags = places.reduce((acc, place) => {
      return acc.concat(place.tagss || []);
    }, []);

    // Get distinct values using a Set
    const distinctTags = [...new Set(allTags)];

    // Return the distinct tags
    return res.status(200).json({
      message: "Distinct tags fetched successfully",
      distinctTags,
    });
  } catch (error) {
    console.error("Error fetching distinct tags:", error);
    return res.status(500).json({
      message: "Error fetching distinct tags",
      error: error.message, // Simplify error for client response
    });
  }
};


  const calculateActivityPrice = async (req, res) => {
    const { activityId } = req.params; // Extract activityId from URL parameters
    const { numberOfPeople, promoCode } = req.query; // Extract number of people and promo code from query parameters

    try {
        const activity = await Activity.findById(activityId);
        if (!activity || !activity.bookingOpen) {
            return res.status(404).json({ message: 'Activity not found or booking closed' });
        }

        let totalPrice = activity.price * numberOfPeople; // Base price calculation
        let promoCodeDetails = null;
        let isValidPromoCode = true;

        // Validate and apply promo code
        if (promoCode) {
            promoCodeDetails = await PromoCode.findOne({ code: promoCode });
            if (
                !promoCodeDetails ||
                !promoCodeDetails.isActive ||
                promoCodeDetails.endDate < new Date()
            ) {
                isValidPromoCode = false;
            } else {
                const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
                totalPrice -= discountAmount; // Apply discount
            }
        }

        return res.status(200).json({ totalPrice, isValidPromoCode });
    } catch (error) {
        console.error('Error calculating activity price:', error);
        return res.status(500).json({
            message: 'Error calculating activity price',
            error: error.message || 'An unknown error occurred',
        });
    }
};

const getSavedItineraries = async (req, res) => {
    const { touristId } = req.params;

    try {
        // Find the tourist by ID and populate saved itineraries
        const tourist = await Tourist.findById(touristId).populate('savedItineraries');

        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        // Return the saved itineraries
        return res.status(200).json(tourist.savedItineraries);
    } catch (error) {
        console.error("Error fetching saved itineraries:", error);
        return res.status(500).json({ message: "An error occurred", error });
    }
};

const checkIfSaved = async (req, res) => {
    try {
      const { touristId, itineraryId } = req.params;
  
      // Fetch the tourist and check if the itinerary is in their savedItineraries
      const tourist = await Tourist.findById(touristId);
      if (!tourist) {
        return res.status(404).json({ message: "Tourist not found" });
      }
  
      const isSaved = tourist.savedItineraries.includes(itineraryId);
      res.status(200).json({ isSaved });
    } catch (error) {
      console.error("Error checking if itinerary is saved:", error);
      res.status(500).json({ message: "An error occurred", error });
    }
  };
  
  const saveActivity = async (req, res) => {
    const { touristId, activityId } = req.params;
    const { save } = req.body; // Boolean value to save or unsave

           // Ensure the "save" field is present and is a boolean
           if (save === undefined || typeof save !== 'boolean') {
            return res.status(400).json({ message: "Please provide a valid 'save' field with a boolean value" });
        }
    try {
        // Validate if the activity exists
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        // Add the activity to the savedActivities array if not already added
        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        if (save) {
            // Save the activity
            if (!tourist.savedActivities.includes(activityId)) {
                tourist.savedActivities.push(activityId);
                await tourist.save();
                return res.status(200).json({ message: "Activity saved successfully", savedActivities: tourist.savedActivities });
            }
            return res.status(400).json({ message: "Activity already saved" });
        } else {
            // Unsave the activity
            if (tourist.savedActivities.includes(activityId)) {
                tourist.savedActivities = tourist.savedActivities.filter(id => id.toString() !== activityId);
                await tourist.save();
                return res.status(200).json({ message: "Activity unsaved successfully", savedActivities: tourist.savedActivities });
            }
            return res.status(400).json({ message: "Activity not found in saved list" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
};

const checkIfActivitySaved = async (req, res) => {
    try {
      const { touristId, activityId } = req.params;
  
      // Fetch the tourist and check if the activity is in their savedActivities
      const tourist = await Tourist.findById(touristId);
      if (!tourist) {
        return res.status(404).json({ message: "Tourist not found" });
      }
  
      const isSaved = tourist.savedActivities.includes(activityId);
      res.status(200).json({ isSaved });
    } catch (error) {
      console.error("Error checking if activity is saved:", error);
      res.status(500).json({ message: "An error occurred", error });
    }
  };

//   const getTransportPrice = async (req, res) => {
//     const { transportId, promoCode } = req.params;

//     try {
//         // Find the transport by ID
//         const transport = await Transport.findById(transportId);
//         if (!transport) {
//             return res.status(404).json({ message: 'Transport not found' });
//         }

//         let totalPrice = transport.price;
//         let promoCodeDetails = null;

//         // Check if a promo code is provided
//         if (promoCode) {
//             promoCodeDetails = await PromoCode.findOne({ code: promoCode });
//             if (
//                 !promoCodeDetails ||
//                 !promoCodeDetails.isActive ||
//                 promoCodeDetails.endDate < new Date()
//             ) {
//                 return res.status(400).json({ message: 'Invalid or expired promo code' });
//             }

//             // Apply discount
//             const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
//             totalPrice -= discountAmount;
//         }

//         res.status(200).json({
//             totalPrice,
//             promoCodeApplied: !!promoCodeDetails,
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error calculating price', error: error.message });
//     }
// };

const getTransportPrice = async (req, res) => {
    const { transportId } = req.params; 
    const { promoCode } = req.query; 

    try {
        const transport = await Transport.findById(transportId);
        if (!transport) {
            return res.status(404).json({ message: 'transport not found or booking closed' });
        }

        let totalPrice = transport.price; // Base price calculation
        let promoCodeDetails = null;
        let isValidPromoCode = true;

        // Validate and apply promo code
        if (promoCode) {
            promoCodeDetails = await PromoCode.findOne({ code: promoCode });
            if (
                !promoCodeDetails ||
                !promoCodeDetails.isActive ||
                promoCodeDetails.endDate < new Date()
            ) {
                isValidPromoCode = false;
            } else {
                const discountAmount = (promoCodeDetails.discount / 100) * totalPrice;
                totalPrice -= discountAmount; // Apply discount
            }
        }

        return res.status(200).json({ totalPrice, isValidPromoCode });
    } catch (error) {
        console.error('Error calculating activity price:', error);
        return res.status(500).json({
            message: 'Error calculating activity price',
            error: error.message || 'An unknown error occurred',
        });
    }
};


const getPaidPrice = async (req, res) => {
    const { touristId, itineraryId } = req.params; // Tourist and Itinerary IDs from params.

    try {
        // Fetch the itinerary
        const itinerary = await Itinerary.findById(itineraryId);

        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found.' });
        }

        // Find the tourist entry in the itinerary's `touristIDs`
        const touristEntry = itinerary.touristIDs.find(entry => entry.touristId.toString() === touristId);

        if (!touristEntry) {
            return res.status(404).json({ message: 'Booking not found for this tourist.' });
        }

        // Return the paid price
        return res.status(200).json({ paidPrice: touristEntry.paidPrice });
    } catch (error) {
        console.error('Error fetching paid price:', error);
        return res.status(500).json({ message: 'Error fetching paid price.', error });
    }
};

const getPaidPriceForActivity = async (req, res) => {
    const { touristId, activityId } = req.params; // Extracting touristId and activityId from URL parameters

    try {
        // Step 1: Fetch the activity with the given activityId
        const activity = await Activity.findById(activityId);

        // Check if the activity exists
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found.' });
        }

        // Step 2: Find the tourist entry in the activity's touristIDs array
        const touristEntry = activity.touristIDs.find(
            entry => entry.touristId.toString() === touristId
        );

        if (!touristEntry) {
            return res.status(404).json({ message: 'Booking not found for this tourist.' });
        }

        // Step 3: Retrieve the paid price
        const paidPrice = touristEntry.paidPrice;

        return res.status(200).json({ paidPrice });
    } catch (error) {
        console.error('Error fetching paid price for activity:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error fetching paid price for activity.', error });
    }
};


module.exports = {
    tourist_hello,
    orderDetails,
    viewAllorders,
    tourist_register,
    getTourist,
    cancelOrder,
    updateTouristProfile,
    sortProductsByRatings,
    getAllProducts,
    filterProduct,
    searchProductsByName,
    filterPlacesByTag,
    // viewTouristActivities,
    // viewTouristItineraries,
    sortUpcomingActivityOrItineraries,
    searchAllModels,
    getAllUpcomingEvents,
    getAllUpcomingActivities,
    getAllUpcomingIteneries,
    getAllUpcomingPlaces,
    filterUpcomingActivities,
    filterItineraries,
    addComplaint,
    addPreferencesToTourist,
    removePreferencesFromTourist,
    viewComplaints,
    changePassword,
    bookItinerary,
    cancelItinerary,
    redeemPoints,
    bookActivity,
    cancelActivity,
    purchaseProduct,
    searchFlightsByUserId,
    searchHotelsByUserId,
    rateProduct,
    reviewProduct,
    rateActivity,
    commentOnActivity,
    deleteTouristIfEligible,
    searchFlights,
    bookFlight,
    getCompletedItineraries,
    rateItinerary,
    commentOnItinerary,
    rateTourGuide,
    commentOnTourGuide,
    // shareViaLink,
    convertCurrency,
    updateProductPricesToCurrency,
    searchHotelsByCity,
    searchHotelsByGeoLocation,
    getHotelOffersByCity,
    getHotelOffersByLocation,
    bookHotel,
    bookTransport,
    getFlightPrices,
    getTouristById,
    getBookedItineraries,
    getBookedActivities,
    getTouristUsername,
    getPurchasedProducts,
    getUnbookedItineraries,
    isItineraryBooked,
    isActivityBooked,
    shareActivityViaEmail,
    shareItineraryViaEmail,
    sharePlaceViaEmail,
    shareProductViaEmail,
    getActivity,
    addWishlist,
    viewWishlist,
    removeWishlistItem,
    getNotifications,
    payForProducts,
    payForOrder,
    addToCart,
    removeFromCart,
    updateCartItemAmount,
    addDeliveryAddress,
    chooseAddress,
    getItemsInCart,
    getPromoCodesForTourist,
    addWishlistItemToCart,
    saveActivity,
    toggleSaveItinerary,
    viewAllSavedEvents,
    toggleNotificationPreference,
    getFilteredActivities,
    getPrice,
    calculateActivityPrice,
    getAllProducts2,
    getCartTotalPrice,
    getProductById,
    getDiscountByCode,
    getDeliveryAddresses,
    getPlacesTags,
    getSavedItineraries,
    checkIfSaved,
    checkIfActivitySaved,
    getTransportPrice,
    getPromoCodeDiscountPerc,
    getPaidPrice,
    getPaidPriceForActivity,
    searchTransportsByUserId
};

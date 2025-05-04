// const Product = require('../models/product');
const path = require('path');
const Activity= require('../models/Activity');
const Itinerary = require ('../models/Itinerary');
const Place = require('../models/Places');

const guest_hello = (req, res) => {
    console.log('guest route hit!'); // Add this log
    res.send('<h1>yayy Guest</h1>');
};




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
//             const itineraries = await Itinerary.find({ availableDates: { $elemMatch: { $gte: new Date() } }}).sort(sortCriteria);
//             return res.status(200).json(itineraries);
//         } else {
//             return res.status(400).json({ message: 'Invalid type. Use "activity" or "itinerary".' });
//         }
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
            flagged: false  // Exclude flagged activities
        });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUpcomingIteneries = async (req, res) => {
    try {
        const currentDate = new Date();

        // Fetch itineraries where at least one date in availableDates is greater than or equal to today
        const itineraries = await Itinerary.find({
            availableDates: { $gte: currentDate },
            flagged: false   // Exclude flagged itineraries
        });

        if (itineraries.length === 0) {
            return res.status(404).json({ message: 'No upcoming itineraries found' });
        }

        res.status(200).json({
            itineraries
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllUpcomingPlaces = async (req, res) => {
    try {
        // Get the current day and time
        const currentTime = new Date();

        // Fetch all places
        const places = await Place.find();

        // Filter places by opening hours (you can adjust this logic based on your openingHours format)
        const upcomingPlaces = places.filter( {flagged: false}
        );

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
    console.log('in activities filter');
    const { budget, date, category, ratings } = req.query; 
    // let filter = {}; // Initialize an empty filter object
    let filter = { date: { $gte: new Date() },
    flagged: false  }; // Default filter: only upcoming activities (date >= today) // Default filter: only upcoming activities (date >= today)

    // Apply budget filter (if provided)
    if (budget) {
        filter.price = { $lte: budget }; // Price less than or equal to the specified budget
    }

    // Apply exact date filter (if provided)
    if (date) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

        filter.date = { $gte: startOfDay, $lte: endOfDay }; // Activities on the exact specified date
    }

    // Apply category filter (if provided)
    if (category) {
        filter.category = category; // Exact match for category
    }

    // Apply ratings filter (if provided)
    if (ratings) {
        filter.ratings = ratings; // Ratings greater than or equal to the provided rating
    }

    try {
        // Find activities based on the constructed filter
        const activities = await Activity.find(filter); 
        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified filters' });
        }
        res.status(200).json(activities); // Return filtered activities
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};
  // Assuming Itinerary is the same for guests






const filterItineraries = async (req, res) => {
    // Malak Filter
    const { budget, date, preferences, language } = req.query;

    let filter = {flagged: false }; // Initialize  filter object

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

    // Apply preferences filter (e.g., historic areas, beaches)
    if (preferences) {
        const preferenceArray = preferences.split(','); // Assuming preferences are provided as a comma-separated string
        filter.tags = { $in: preferenceArray }; // Match itineraries that have at least one of the specified tags
    }

    // Apply language filter
    if (language) {
        filter.language = language; // Exact match for language
    }

    try {
        // Find itineraries based on the constructed filter
        const itineraries = await Itinerary.find(filter);

        if (itineraries.length === 0) {
            return res.status(404).json({ message: 'No itineraries found matching the criteria.' });
        }

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const sortUpcomingActivityOrItineraries = async (req, res) => {
    const { sort, type } = req.query;
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
            // Fetch and sort upcoming itineraries based on available dates and sort criteria
            const itineraries = await Itinerary.find({ availableDates: { $elemMatch: { $gte: currentDate } } , flagged: false }).sort(sortCriteria);
            return res.status(200).json(itineraries);
        } else {
            return res.status(400).json({ message: 'Invalid type. Use "activity" or "itinerary".' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    guest_hello,
    filterPlacesByTag,
    sortUpcomingActivityOrItineraries,
    getAllUpcomingActivities,
    getAllUpcomingIteneries,
    getAllUpcomingPlaces,
    filterUpcomingActivities,
    filterItineraries
};

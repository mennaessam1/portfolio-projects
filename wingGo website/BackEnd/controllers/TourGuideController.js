const bcrypt = require('bcrypt');
const TourGuide = require('../models/TourGuide');
const LoginCredentials = require('../models/LoginCredentials'); 
const {previewgeneratePreSignedUrl}  = require('../downloadMiddleware');
const nodemailer = require('nodemailer');
const axios = require('axios');
const Itinerary = require('../models/Itinerary');
const getCoordinates = require('../helpers/getCoordinates');
const Tourist = require('../models/tourist');

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "winggo567@gmail.com",
      pass: "smkg eghm yrzv yyir"
    }
  });

// Get a tour guide by id
const getTourGuide = async (req, res) => {
    try {
        const id = req.params.id; // Use id as the unique identifier

        // Find the tour guide by id
        const tourGuide = await TourGuide.findById(id);
        
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }
        
        res.status(200).json(tourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const createTourguideProfile = async (req, res) => {
   
    const id = req.params.id; // Use id as the unique identifier

      
     const tourguide = await TourGuide.findById(id);
     
    if (tourguide.isCreatedProfile !== 0) {
        return res.status(400).json({ message: 'Profile already created for this tourguide.' });
    }
    else{
        tourguide.isCreatedProfile = 1;
     await tourguide.save();
     return updateTourGuideProfile(req, res);
    
    //  return res.status(201).json({ message: 'Profile created successfully.' });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { id } = req.params; // Extract user ID from the request params

    try {
        // 1. Find the user in LoginCredentials
        const userCredentials = await LoginCredentials.findOne({ userId: id});
        if (!userCredentials) {
            return res.status(404).json({ message: 'User credentials not found' });
        }

        // 2. Find the corresponding user in the TourGuide collection
        const tourGuide = await TourGuide.findById(userCredentials.userId);
        if (!tourGuide) {
            return res.status(404).json({ message: 'TourGuide not found' });
        }

        console.log('Old Password (entered):', oldPassword);
        const hashedoldPassword = await bcrypt.hash(oldPassword, 10); // Hash new password
        console.log('Old Password (hashed):', hashedoldPassword);
        console.log('Stored Hashed Password:', tourGuide.password);

        // 3. Compare the old password with the hashed password in TourGuide
        const isMatch = await bcrypt.compare(oldPassword, tourGuide.password);
        console.log('Is password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // 4. Check if the new password matches the confirm password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }

        // 5. Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Hash new password
        
        // 6. Update the password in LoginCredentials
        userCredentials.password = hashedNewPassword;
        await userCredentials.save();

        // 7. Update the password in the TourGuide collection
        tourGuide.password = hashedNewPassword;
        await tourGuide.save();

        res.status(200).json({ message: 'Password updated successfully in both collections' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update the tour guide profile (with password hashing if updated)
const updateTourGuideProfile = async (req, res) => {
    try {
        const id = req.params.id; // Use id as the unique identifier

        // Find the tour guide by id
        const tourGuide = await TourGuide.findById(id);

        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }

        

        // Now update the login credentials as well
        const loginUpdateFields = {};
        if (req.body.username && req.body.username !== tourGuide.username) {
            const existingUsername = await LoginCredentials.findOne({ username: req.body.username });

            if (existingUsername) {
                return res.status(400).json({ message: 'Username is already taken' });
            }

            loginUpdateFields.username = req.body.username;  // Username update
        }

        if (req.body.email && req.body.email !== tourGuide.email) {
            const existingEmail = await LoginCredentials.findOne
            ({ email: req.body.email });

            if (existingEmail) {
                return res.status(400).json({ message: 'Email is already taken' });
            }

            loginUpdateFields.email = req.body.email;  // Email update
        }
        
        

        if (Object.keys(loginUpdateFields).length > 0) {
            // Find login credentials by userId and roleModel (TourGuide)
            const updatedLoginCredentials = await LoginCredentials.findOneAndUpdate(
                { userId: id, roleModel: 'TourGuide' },  // Find by userId and roleModel for the tour guide
                { $set: loginUpdateFields },
                { new: true }  // Return the updated document
            );

            if (!updatedLoginCredentials) {
                return res.status(404).json({ message: 'Login credentials not found' });
            }
        }

        // Update the tour guide profile with the new data
        Object.assign(tourGuide, req.body);
        await tourGuide.save();

        res.status(200).json({ message: 'Profile and login credentials updated successfully', tourGuide });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createItinerary = async (req, res) => {
    const { tourGuideId, title, activities, locations, timeline, duration, language, price, availableDates, accessibility, pickupLocation, dropoffLocation, bookings , tags} = req.body;

    try {
        // Validate if tourGuideId exists in the TourGuide collection
        const tourGuideExists = await TourGuide.findById(tourGuideId);
        if (!tourGuideExists) {
            return res.status(400).json({ error: 'Invalid tourGuideId. Tour guide not found.' });
        }
        if (!tourGuideExists.termsAccepted) {
            return res.status(403).json({ error: 'Terms and conditions must be accepted to create an itinerary.' });
        }

        let photoUrl = null;
        if(req.file){
            photoUrl = req.file.location;
        }


        // Create and save the new itinerary without latitude and longitude
        const newItinerary = new Itinerary({
            tourGuideId,
            title,
            activities,
            locations,
            timeline,
            duration,
            language,
            price,
            availableDates,
            accessibility,
            pickupLocation,
            dropoffLocation,
            bookings,
            tags,
            photo: photoUrl,
        });

        await newItinerary.save();
        res.status(201).json(newItinerary);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      res.status(400).json({ error: error.message });
    }
  };
  
  


const getItineraryPhoto = async (req, res) => {
    const { id } = req.params;

    try {
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        if (itinerary.photo) {
            const key = itinerary.photo.split('/').slice(-1)[0];
            const preSignedUrl = await previewgeneratePreSignedUrl(key);
            
            // Instead of redirecting, send the pre-signed URL directly
            return res.json({ imageUrl: preSignedUrl });
        } else {
            return res.status(404).json({ message: 'Image not found for this itinerary.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Read itinerary with tour guide id and itinerary id
// const getItineraries = async (req, res) => {
//     const { id } = req.params;  // Itinerary ID from the URL params
//     const { tourGuideId } = req.query;  // Tour Guide ID from query params

//     try {
//         // Find the itinerary by ID and ensure it belongs to the correct tour guide
//         const itinerary = await Itinerary.findOne({ _id: id, tourGuideId });  // Match both the itinerary ID and tourGuideId

//         if (!itinerary) {
//             return res.status(404).json({ message: 'Itinerary not found or you do not have permission to view this itinerary.' });
//         }

//         res.status(200).json(itinerary);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
const getItineraries = async (req, res) => {
    const { id } = req.params;  // Itinerary ID from the URL params

    try {
        // Find the itinerary by ID and ensure it belongs to the correct tour guide
        const itinerary = await Itinerary.findOne({ _id: id});  // Match both the itinerary ID and tourGuideId

        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found.' });
        }

        res.status(200).json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all without tour guide
const getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find();  // Fetch all itineraries
        res.status(200).json(itineraries);  // Return the array of itineraries
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
////////////get all Itineraries of the tourguide
const getItinerariesByTourGuide = async (req, res) => {
    const { tourGuideId } = req.params;

    try {
        const itineraries = await Itinerary.find({ tourGuideId });  // Fetch by tourGuideId
        if (!itineraries.length) {
            return res.status(404).json({ message: 'No itineraries found for this tour guide.' });
        }
        res.status(200).json(itineraries);  // Return the itineraries
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update itinerary
const updateItinerary = async (req, res) => {
    const { id } = req.params;  // Itinerary ID from URL
    const { tourGuideId } = req.query;  // Tour Guide ID from query

    try {
        // Find the itinerary by its ID and check if it belongs to the tour guide
        const itinerary = await Itinerary.findOne({ _id: id, tourGuideId });

        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found or you do not have permission to update this itinerary.' });
        }

        // Update the itinerary without geocoding
        Object.assign(itinerary, req.body);
        await itinerary.save();

        res.status(200).json({ message: 'Itinerary updated successfully', itinerary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Delete itinerary if no bookings exist
const deleteItinerary = async (req, res) => {
    const { id } = req.params;  // Itinerary ID from URL
    const { tourGuideId } = req.query;  // Tour Guide ID from query

    try {
        // Find the itinerary by ID and tourGuideId to ensure the guide is the owner
        const itinerary = await Itinerary.findOne({ _id: id, tourGuideId });

        // If the itinerary is not found or doesn't belong to the tour guide, return 404
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found or you do not have permission to delete this itinerary.' });
        }

        // Check if the itinerary has bookings (assuming bookings is a number)
        if (itinerary.bookings && itinerary.bookings > 0) {
            return res.status(400).json({ message: 'Cannot delete an itinerary with bookings.' });
        }

        // Delete the itinerary if it has no bookings
        await Itinerary.findByIdAndDelete(id);
        res.status(200).json({ message: 'Itinerary deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changeProfilePhoto = async (req, res) => {

    const { id } = req.params;  // Tour Guide ID from query

    try {

        // Find the tour guide by ID and check if it belongs to the tour guide
        const tourGuide = await TourGuide.findById(id);

        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found or you do not have permission to update this tour guide.' });
        }

        const photoUrl = req.file.location;

        tourGuide.photo = photoUrl;
        await tourGuide.save();
    

        res.status(200).json({ message: 'Profile updated successfully', tourGuide });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const acceptTerms = async (req, res) => {
    const tourGuideId = req.params.id;

    try {
        const tourGuide = await TourGuide.findByIdAndUpdate(tourGuideId, { termsAccepted: true }, { new: true });
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour Guide not found.' });
        }
        res.status(200).json({ message: 'Terms accepted successfully.', tourGuide });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting terms.', error });
    }
};


const deleteTourGuideAccount = async (req, res) => {
    const { id } = req.params;  // Tour Guide ID

    try {
        // Find the tour guide
        const tourGuide = await TourGuide.findById(id);
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }

        // Check each itinerary created by the tour guide
        const itineraries = await Itinerary.find({ tourGuideId: id });
        
        for (let itinerary of itineraries) {
            // Check if any upcoming bookings exist
            for (let booking of itinerary.touristIDs) {
                console.log('testing '+booking.bookingDate <= new Date());
                if (booking.bookingDate >= new Date()) { // If there's a future booking date
                    return res.status(400).json({
                        message: 'Cannot delete account: Upcoming itinerary bookings exist.'
                    });
                }
            }
        }

        // If no future bookings, delete itineraries and account
        await Itinerary.deleteMany({ tourGuideId: id }); // Delete all itineraries by this guide
        const tourguidedel =await TourGuide.findByIdAndDelete(id); 

        await LoginCredentials.findOneAndDelete({ userId: id, roleModel: 'TourGuide' });

        if (!tourguidedel) {
            return res.status(404).json({ message: "tour guide account not found." });
        }
     
        res.status(200).json({ message: 'Tour guide account and itineraries deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Method to activate or deactivate an itinerary
// we dont check if it belongs to the tourguide 3shan aslan msh hanedih el option ela lw bt belong to him
const activateOrDeactivateItinerary = async (req, res) => {
    const { id } = req.params;  // Itinerary ID from URL parameters
    const { deactivate } = req.body;  // Boolean value from request body

    try {
        // Find the itinerary by ID
        const itinerary = await Itinerary.findById(id);

        // Check if the itinerary exists and belongs to the tour guide
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        // Update the deactivated field based on the provided boolean value
        itinerary.deactivated = deactivate;
        await itinerary.save();

        res.status(200).json({
            message: `Itinerary has been ${deactivate ? 'deactivated' : 'activated'} successfully.`,
            itinerary,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const previewPhoto = async (req, res) => {
    const { id } = req.params;
    try {
        const tourguide = await TourGuide.findById(id);
        
        if (!tourguide) {
            return res.status(404).json({ message: 'TourGuide not found' });
        }

        if (tourguide.photo) {
            const key = tourguide.photo.split('/').slice(-1)[0];
            const preSignedUrl = await previewgeneratePreSignedUrl(key);
            
            // Instead of redirecting, send the pre-signed URL directly
            return res.json({ imageUrl: preSignedUrl });
        } else {
            return res.status(404).json({ message: 'Image not found for this advertiser.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSalesReport = async (req, res) => {
    const { tourGuideId } = req.params; // Extract Tour Guide ID from URL parameters

    try {
        // 1. Fetch itineraries for the specific tour guide
        const itineraries = await Itinerary.find({ tourGuideId }); // Fetch all itineraries for this tour guide
        const itineraryDetails = itineraries.map(itinerary => {
            // Calculate total sales (number of people) dynamically
            const sales = itinerary.touristIDs.reduce(
                (sum, entry) => sum + entry.numberOfPeople,
                0
            );

            // Calculate total revenue from the paidPrice field
            const revenue = itinerary.touristIDs.reduce(
                (sum, entry) => sum + entry.paidPrice,
                0
            );
            const soldDates = [...new Set(itinerary.touristIDs.map(entry => entry.bookingDate))];

            return {
                name: itinerary.title,
                sales, // Total number of people who booked
                revenue, // Total revenue from all bookings
                soldDates, // Include only the sold dates
            };
        });

        // Calculate totals
        const totalItinerarySales = itineraryDetails.reduce((sum, itinerary) => sum + itinerary.sales, 0);
        const totalItineraryRevenue = itineraryDetails.reduce((sum, itinerary) => sum + itinerary.revenue, 0);

        const netItineraryRevenue = totalItineraryRevenue - (totalItineraryRevenue * 0.10);

        // Response
        res.status(200).json({
            success: true,
            data: {
                itineraries: {
                    details: itineraryDetails,
                    totalSales: totalItinerarySales,
                    totalRevenue: netItineraryRevenue,
                },
                totals: {
                    totalSales: totalItinerarySales,
                    totalRevenue: netItineraryRevenue,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate sales report for tour guide.',
            error: error.message,
        });
    }
};

const getTouristReport = async (req, res) => {
    const { tourGuideId } = req.params; // Extract Tour Guide ID from URL parameters

    try {
        // 1. Fetch itineraries for the specific tour guide
        const itineraries = await Itinerary.find({ tourGuideId });

        // 2. Calculate the total number of tourists per itinerary (whose dates have passed)
        const itineraryDetails = itineraries
            .map(itinerary => {
                const pastTourists = itinerary.touristIDs.filter(tourist => {
                    return new Date(tourist.bookingDate) < new Date(); // Check if the booking date has passed
                });

                // Sum up the total number of people from pastTourists
                const totalTourists = pastTourists.reduce(
                    (sum, entry) => sum + entry.numberOfPeople,
                    0
                );

                return {
                    name: itinerary.title,
                    totalTourists, // Count only tourists with passed dates
                    details: pastTourists.map(tourist => ({
                        touristId: tourist.touristId,
                        bookingDate: tourist.bookingDate,
                        numberOfPeople: tourist.numberOfPeople,
                    })),
                };
            })
            .filter(itinerary => itinerary.totalTourists > 0); // Exclude itineraries with 0 tourists

        // 3. Calculate the total number of tourists across all itineraries
        const totalTourists = itineraryDetails.reduce((sum, itinerary) => sum + itinerary.totalTourists, 0);


        // 4. Response
        res.status(200).json({
            success: true,
            data: {
                itineraries: {
                    details: itineraryDetails,
                    totalTourists: totalTourists,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate tourist report for tour guide.',
            error: error.message,
        });
    }
};

const openBooking = async (req, res) => {
    const { id } = req.params;  // Itinerary ID from URL parameters
    const { bookingOpen } = req.body;  // Boolean value from request body

    try {
        // Ensure bookingOpen is a proper boolean
        const isBookingOpen = bookingOpen === true || bookingOpen === "true";

        // Find the itinerary by ID
        const itinerary = await Itinerary.findById(id);

        // Check if the itinerary exists
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        // Update the bookingOpen field
        itinerary.bookingOpen = isBookingOpen;
        await itinerary.save();

        if (isBookingOpen) {
            console.log("Booking is now open for itinerary:", itinerary.title);

            ////// This part is to be edited/added start
            // Find tourists who saved this itinerary and opted for notifications
            const tourists = await Tourist.find({
                savedItineraries: id,
                notifyOnInterest: true, // Notify only if they opted in
            });

            console.log("Notifying interested tourists who saved this itinerary:", tourists.length);

            // Prepare notifications
            const notifications = tourists.map(tourist => ({
                touristId: tourist._id,
                notification: {
                    type: 'eventBooking',
                    itineraryId: id,
                    message: `The itinerary "${itinerary.title}" is now open for booking!`,
                    date: new Date(),
                    metadata: { title: itinerary.title },
                },
            }));

            // Send notifications and emails
            for (const { touristId, notification } of notifications) {
                await Tourist.findByIdAndUpdate(touristId, {
                    $push: { notifications: notification },
                });

                // Send email notification
                const tourist = tourists.find(t => t._id.equals(touristId));
                await transporter.sendMail({
                    from: "winggo567@gmail.com",
                    to: tourist.email,
                    subject: 'Itinerary Now Open for Booking',
                    html: `<p>Dear ${tourist.username},</p>
                           <p>The itinerary "<strong>${itinerary.title}</strong>" you saved is now open for booking!</p>
                           <p>Don't miss out on this opportunity to join an amazing experience.</p>
                           <p>Best regards,</p>
                           <p>Your Team</p>`,
                });
            }
            ////// This part is to be edited/added end
        }

        res.status(200).json({
            message: `Itinerary booking has been ${isBookingOpen ? 'opened' : 'closed'} successfully.`,
            itinerary,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNotifications = async (req, res) => {
    const { tourguideId } = req.params; // Extract Tour Guide ID from request parameters

    try {
        // Find the tour guide by ID
        const tourGuide = await TourGuide.findById(tourguideId);

        // Check if the tour guide exists
        if (!tourGuide) {
            return res.status(404).json({ message: "Tour Guide not found." });
        }

        // Sort notifications by date in descending order (newest first)
        const notifications = tourGuide.notifications.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Return all notifications
        res.status(200).json({
            success: true,
            notifications: notifications,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error); // Debugging
        res.status(500).json({
            success: false,
            message: "Error fetching notifications.",
            error,
        });
    }
};



module.exports = {
    getTourGuide,
    updateTourGuideProfile,
    createItinerary, getItineraries,getAllItineraries, updateItinerary, deleteItinerary ,getItinerariesByTourGuide,createTourguideProfile,
    changeProfilePhoto,
    acceptTerms, changePassword,
    deleteTourGuideAccount,
    activateOrDeactivateItinerary,
    previewPhoto,
    getSalesReport,
    getTouristReport,
    openBooking,
    getItineraryPhoto,
    getNotifications
};

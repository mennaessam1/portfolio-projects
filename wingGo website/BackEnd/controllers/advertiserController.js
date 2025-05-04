const bcrypt = require('bcrypt');
const Advertiser = require('../models/advertiser');
const LoginCredentials = require('../models/LoginCredentials');
const Activity = require('../models/Activity');
const getCoordinates = require('../helpers/getCoordinates');
const Transport = require('../models/Transport');
const { uploadDocument } = require('../helpers/s3Helper');
const {generatePreSignedUrl}  = require('../downloadMiddleware');
const {previewgeneratePreSignedUrl}  = require('../downloadMiddleware');
const Tourist = require('../models/tourist');
const nodemailer = require('nodemailer');
// const Attraction = require('../models/attraction');

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "winggo567@gmail.com",
      pass: "smkg eghm yrzv yyir"
    }
  });

const advertiser_hello = (req, res) => {
    console.log('Advertiser route hit!'); // Add this log
    res.send('<h1>yayy Advertiser</h1>');
};

const createAdvertiserProfile = async (req, res) => {
   
    const id = req.params.id; // Use id as the unique identifier

      
     const advertiser = await Advertiser.findById(id);
     
    if (advertiser.isCreatedProfile !== 0) {
        return res.status(400).json({ message: 'Profile already created for this advertiser.' });
    }
    else{
     advertiser.isCreatedProfile = 1;
     await advertiser.save();
     return updateAdvertiserProfile(req, res);
    
    //  return res.status(201).json({ message: 'Profile created successfully.' });
    }
};

// Update advertiser profile
const updateAdvertiserProfile = async (req, res) => {
    try {
        const id = req.params.id; // Use id as the unique identifier

        // Find the advertiser by id
        const advertiser = await Advertiser.findById(id);

        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }

        

        // Now update the login credentials as well
        const loginUpdateFields = {};
        if (req.body.username) {
            const existingUsername = await LoginCredentials.findOne({ username: req.body.username });

            if (existingUsername) {
                return res.status(400).json({ message: 'Username is already taken' });
            }

            loginUpdateFields.username = req.body.username;  // Username update
        }

        if (req.body.email && req.body.email !== advertiser.email) {
            const existingEmail = await LoginCredentials.findOne
            ({ email: req.body.email });

            if (existingEmail) {
                return res.status(400).json({ message: 'Email is already taken' });
            }

            loginUpdateFields.email = req.body.email;  // Email update
        }
        

        // Update LoginCredentials if necessary
        if (Object.keys(loginUpdateFields).length > 0) {
            const updatedLoginCredentials = await LoginCredentials.findOneAndUpdate(
                { userId: id, roleModel: 'Advertiser' },  // Find by userId and roleModel for the advertiser
                { $set: loginUpdateFields },
                { new: true }  // Return the updated document
            );

            if (!updatedLoginCredentials) {
                return res.status(404).json({ message: 'Login credentials not found' });
            }
        }

        // Update the advertiser profile with the new data
        Object.assign(advertiser, req.body);
        await advertiser.save();

        res.status(200).json({ message: 'Profile and login credentials updated successfully', advertiser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// Read advertiser profile without sensitive data
const getAdvertiserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        // Exclude the password field
        const profile = await Advertiser.findById(id).select('-password');
        if (!profile) {
            return res.status(404).json({ message: 'Advertiser profile not found' });
        }

        // Return the non-sensitive profile information
        res.status(200).json({
            companyName: profile.companyName,
            website: profile.website,
            hotline: profile.hotline,
            companyProfile: profile.companyProfile,
            contactEmail: profile.contactEmail,
            contactPerson: profile.contactPerson,
            logoUrl: profile.logoUrl,
            socialMediaLinks: profile.socialMediaLinks
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const createActivity = async (req, res) => {
    const { 
        name, 
        date, 
        time, 
        location, 
        price, 
        category, 
        tags, 
        specialDiscounts, 
        isBookingOpen, 
        advertiser ,
        description 
    } = req.body;

    console.log("Advertiser ID received:", advertiser);
    
    try {
        const mongoose = require('mongoose');

        // Ensure `advertiser` is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(advertiser)) {
            console.log("1");
            return res.status(400).json({ error: "Invalid advertiser ID format." });
           
        }

        const advertiserObjectId = new mongoose.Types.ObjectId(advertiser);

        // Fetch advertiser record
        const advertiserRecord = await Advertiser.findById(advertiserObjectId);
        if (!advertiserRecord) {
            console.log("2");
            return res.status(404).json({ error: 'Advertiser not found.' });
        }

        // Check terms acceptance
        if (!advertiserRecord.termsAccepted) {
            console.log("3");
            return res.status(403).json({ error: 'Terms and conditions must be accepted to create an activity.' });
        }

        

        

        // Handle optional photo
        let photoUrl = null;
        if (req.file) {
            photoUrl = req.file.location;
        }

        console.log("Photo URL:", photoUrl);

        // Create and save activity
        const newActivity = new Activity({
            name,
            date,
            time,
            location,
            price,
            category,
            tags: tags || [], // Default to an empty array
            specialDiscounts,
            isBookingOpen: isBookingOpen === "true", // Convert string to boolean
            advertiser: advertiserObjectId,
            photo: photoUrl,
            description: description || "",
        });
        console.log(newActivity);

        await newActivity.save();
        res.status(201).json({ message: 'Activity created successfully!', activity: newActivity });
        console.log("Activity added");

    } catch (error) {
        console.error("Error creating activity:", error);
        console.log("Activity not added");
        res.status(400).json({ error: error.message });
    }
};




const updateActivity = async (req, res) => {
    try {
        const {id} = req.params; // Use id as the unique identifier
        const {advertiserId }= req.query;
        console.log(id);
        console.log(advertiserId);
         
        // Find the activity by id
        const activity = await Activity.findOne({ _id: id, advertiser: advertiserId });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        if (req.body.advertiser) {
            delete req.body.advertiser;
        }

        if (req.body.location) {
            req.body.location = req.body.location; // Treat location as a simple string
        }



        // Update the activity with the new data
        Object.assign(activity, req.body);
        await activity.save();

        res.status(200).json({ message: 'Activity updated successfully', activity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getActivity = async (req, res) => {
    const { id } = req.params;
    const {advertiserId} = req.query;
    
    
    try {
        const activity = await Activity.findOne({ _id: id, advertiser: advertiserId });
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json({ activity });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllActivities = async(req,res) => {

    const { advertiserId } = req.query;
    

    const activities = await Activity.find({advertiser: advertiserId}).sort({date: 'desc'});
    res.status(200).json({activities});

};

const deleteActivity = async (req, res) => {
    const { id } = req.params;
    const {advertiserId} = req.query;

    try {
        const activity = await Activity.findOneAndDelete({ _id: id, advertiser: advertiserId });
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const changeLogo = async (req, res) => {
    const { id } = req.params;
    
    try {
        const advertiser = await Advertiser.findById(id);

        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        
        const logoUrl = req.file.location;
        advertiser.logoUrl = logoUrl;
        
        await advertiser.save();

        res.status(200).json({ message: 'Logo updated successfully', advertiser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const changeActivityLogo = async (req, res) => {

    const { id } = req.params;

    try {
        const activity = await Activity.findById(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const photoUrl = req.file.location;
        activity.photo = photoUrl;
        await activity.save();

        res.status(200).json({ message: 'Photo updated successfully', activity });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const acceptTerms = async (req, res) => {
    const advertiserId = req.params.id;

    try {
        const advertiser = await Advertiser.findByIdAndUpdate(advertiserId, { termsAccepted: true }, { new: true });
        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found.' });
        }
        res.status(200).json({ message: 'Terms accepted successfully.', advertiser });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting terms.', error });
    }
};
const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { id } = req.params; // Extract user ID from the request params
    console.log(id);
    try {
        // 1. Find the user in LoginCredentials
        const userCredentials = await LoginCredentials.findOne({ userId: id });
        if (!userCredentials) {
            return res.status(404).json({ message: 'User credentials not found' });
        }

        // 2. Find the corresponding user in the TourGuide collection
        const advertiser = await Advertiser.findById(userCredentials.userId);
        if (!advertiser) {
            return res.status(404).json({ message: 'advertiser not found' });
        }

        console.log('Old Password (entered):', oldPassword);
        const hashedoldPassword = await bcrypt.hash(oldPassword, 10); // Hash new password
        console.log('Old Password (hashed):', hashedoldPassword);
        console.log('Stored Hashed Password:', advertiser.password);

        // 3. Compare the old password with the hashed password in TourGuide
        const isMatch = await bcrypt.compare(oldPassword, advertiser.password);
        //const isMatch2 = oldPassword === advertiser.password;
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
        advertiser.password = hashedNewPassword;
        await advertiser.save();

        res.status(200).json({ message: 'Password updated successfully in both collections' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
c=1;
const requestAccountDeletion = async (req, res) => {
    try {
        const { id } = req.params;  // Advertiser ID

        // Find all activities related to this advertiser
        const activities = await Activity.find({ advertiser: id });

        // Check for any upcoming activities with bookings
        const hasUpcomingActivitiesWithBookings = activities.some(activity => {
            const today = new Date();
            console.log(c+" "+activity.date >= today);
           console.log(c+" "+ activity.touristIDs && activity.touristIDs.length > 0);
           c++;
            return activity.date >= today && activity.touristIDs && activity.touristIDs.length > 0;
        });

        

        if (hasUpcomingActivitiesWithBookings) {
            return res.status(400).json({
                message: "Cannot delete account: there are upcoming activities with bookings."
            });
        }

        // Delete all activities associated with the advertiser
        await Activity.deleteMany({ advertiser: id });

        // Delete the advertiser profile and related login credentials
        const advertiser = await Advertiser.findByIdAndDelete(id);
        await LoginCredentials.findOneAndDelete({ userId: id, roleModel: 'Advertiser' });

        if (!advertiser) {
            return res.status(404).json({ message: "Advertiser account not found." });
        }

        res.status(200).json({ message: "Account and all associated data deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTransport = async (req, res) => {
    const { type, duration, city, price } = req.body;

    try {
        const newTransport = new Transport({ type, duration, city, price, touristID: null });
        await newTransport.save();
        res.status(201).json(newTransport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllTransports = async (req, res) => {
    try {
        const transports = await Transport.find();
        res.status(200).json(transports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTransportById = async (req, res) => {
    const { id } = req.params;

    try {
        const transport = await Transport.findById(id);
        if (!transport) {
            return res.status(404).json({ message: 'Transport not found' });
        }
        res.status(200).json(transport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read All Unbooked Transports
const getAllUnbookedTransports = async (req, res) => {
    try {
        const transports = await Transport.find({ touristID: null });
        res.status(200).json(transports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read Unbooked Transport by ID
const getUnbookedTransportById = async (req, res) => {
    const { id } = req.params;

    try {
        const transport = await Transport.findOne({ _id: id, touristID: null });
        if (!transport) {
            return res.status(404).json({ message: 'Transport not found or already booked' });
        }
        res.status(200).json(transport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTransport = async (req, res) => {
    const { id } = req.params;
    const { type, duration, price, city, touristID } = req.body;

    try {
        const updatedTransport = await Transport.findByIdAndUpdate(
            id,
            { type, duration, price, city, touristID },
            { new: true }
        );
        if (!updatedTransport) {
            return res.status(404).json({ message: 'Transport not found' });
        }
        res.status(200).json(updatedTransport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTransport = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTransport = await Transport.findByIdAndDelete(id);
        if (!deletedTransport) {
            return res.status(404).json({ message: 'Transport not found' });
        }
        res.status(200).json({ message: 'Transport deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const previewLogo = async (req, res) => {
    const { id } = req.params;
    try {
        const advertiser = await Advertiser.findById(id);
        
        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        console.log('tamam 1');

        if (advertiser.logoUrl) {
            const key = advertiser.logoUrl.split('/').slice(-1)[0];
            const preSignedUrl = await previewgeneratePreSignedUrl(key);
            
            // Instead of redirecting, send the pre-signed URL directly
            console.log('tamam before ret');
            return res.json({ imageUrl: preSignedUrl });
            
        } else {
            console.log('error');
            return res.status(404).json({ message: 'Image not found for this advertiser.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const previewActivityLogo = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await Activity.findById(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        if (activity.photo) {
            const key = activity.photo.split('/').slice(-1)[0];
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

const getSalesReport = async (req, res) => {
    const { advertiserId } = req.params; // Extract Advertiser ID from URL parameters

    try {
        // 1. Fetch activities created by the specific advertiser
        const activities = await Activity.find({ advertiser: advertiserId }); // Fetch all activities for this advertiser
        const activityDetails = activities.map(activity => {
            // Calculate total sales (number of people) dynamically
            const sales = activity.touristIDs.reduce(
                (sum, entry) => sum + entry.numberOfPeople,
                0
            );

            // Calculate total revenue from the paidPrice field
            const revenue = activity.touristIDs.reduce(
                (sum, entry) => sum + entry.paidPrice,
                0
            );

            return {
                name: activity.name,
                sales, // Total number of people who booked
                revenue, // Total revenue from all bookings
                soldDate: activity.date.toISOString().split('T')[0], // Use the activity date directly
            };
        });

        // Calculate totals
        const totalActivitySales = activityDetails.reduce((sum, activity) => sum + activity.sales, 0);
        const totalActivityRevenue = activityDetails.reduce((sum, activity) => sum + activity.revenue, 0);

        const netActivityRevenue = totalActivityRevenue - (totalActivityRevenue * 0.10);

        // Response
        res.status(200).json({
            success: true,
            data: {
                activities: {
                    details: activityDetails,
                    totalSales: totalActivitySales,
                    totalRevenue: netActivityRevenue,
                },
                totals: {
                    totalSales: totalActivitySales,
                    totalRevenue: netActivityRevenue,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate sales report for advertiser.',
            error: error.message,
        });
    }
};

const getTouristReport = async (req, res) => {
    const { advertiserId } = req.params; // Extract Advertiser ID from URL parameters

    try {
        // 1. Fetch activities created by the advertiser
        const activities = await Activity.find({ advertiser: advertiserId });

        // 2. Filter activities whose date has already passed
        const activityDetails = activities
            .filter(activity => new Date(activity.date) < new Date()) // Only include past activities
            .map(activity => {
                // Calculate total tourists using numberOfPeople
                const totalTourists = activity.touristIDs.reduce(
                    (sum, entry) => sum + entry.numberOfPeople,
                    0
                );

                return {
                    name: activity.name,
                    soldDate: activity.date.toISOString().split('T')[0], // Use the activity date directly
                    totalTourists, // Total tourists using numberOfPeople
                    details: activity.touristIDs.map(tourist => ({
                        touristId: tourist.touristId,
                        numberOfPeople: tourist.numberOfPeople, // Include number of people in details
                        paidPrice: tourist.paidPrice, // Include paid price if needed
                        soldDate: activity.date.toISOString().split('T')[0], // Use the activity date directly
                    })),
                };
            })
            .filter(activity => activity.totalTourists > 0); // Exclude activities with 0 tourists

        // 3. Calculate the total number of tourists across all activities
        const totalTourists = activityDetails.reduce((sum, activity) => sum + activity.totalTourists, 0);

        // 4. Response
        res.status(200).json({
            success: true,
            data: {
                activities: {
                    details: activityDetails,
                    totalTourists, // Grand total across all activities
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate tourist report for advertiser.',
            error: error.message,
        });
    }
};

const openBookingForActivity = async (req, res) => {
    const { id } = req.params;  // Activity ID from URL parameters
    const { bookingOpen } = req.body;  // Boolean value from request body

    try {
        // Ensure bookingOpen is a proper boolean
        const isBookingOpen = bookingOpen === true || bookingOpen === "true";

        // Find the activity by ID
        const activity = await Activity.findById(id);

        // Check if the activity exists
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        // Update the bookingOpen field
        activity.bookingOpen = isBookingOpen;
        await activity.save();

        if (isBookingOpen) {
            console.log("Booking is now open for activity:", activity.name);

            ////// This part is to be edited/added start
            // Find tourists who saved this activity and opted for notifications
            const tourists = await Tourist.find({
                savedActivities: id,
                notifyOnInterest: true, // Notify only if they opted in
            });

            console.log("Notifying interested tourists who saved this activity:", tourists.length);

            // Prepare notifications
            const notifications = tourists.map(tourist => ({
                touristId: tourist._id,
                notification: {
                    type: 'eventBooking',
                    eventId: id,
                    message: `The activity "${activity.name}" is now open for booking!`,
                    date: new Date(),
                    metadata: { name: activity.name },
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
                    subject: 'Activity Now Open for Booking',
                    html: `<p>Dear ${tourist.username},</p>
                           <p>The activity "<strong>${activity.name}</strong>" you saved is now open for booking!</p>
                           <p>Don't miss out on this opportunity to join an amazing experience.</p>
                           <p>Best regards,</p>
                           <p>Your Team</p>`,
                });
            }
            ////// This part is to be edited/added end
        }

        res.status(200).json({
            message: `Activity booking has been ${isBookingOpen ? 'opened' : 'closed'} successfully.`,
            activity,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNotifications = async (req, res) => {
    const { advertiserId } = req.params; // Extract advertiser ID from the request parameters

    try {
        // Find the advertiser by ID
        const advertiser = await Advertiser.findById(advertiserId);

        // Check if the advertiser exists
        if (!advertiser) {
            return res.status(404).json({ message: "Advertiser not found." });
        }

        // Sort notifications by date in descending order (latest first)
        const notifications = advertiser.notifications.sort(
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
    advertiser_hello,
    createAdvertiserProfile, //done
    updateAdvertiserProfile, 
    getAdvertiserProfile, //done
    createActivity,
    updateActivity,
    getActivity,
    getAllActivities,
    deleteActivity,
    changeLogo,
    acceptTerms,
    changePassword,
    requestAccountDeletion,
    createTransport,
    getAllTransports,
    getTransportById,
    updateTransport,
    deleteTransport,
    getAllUnbookedTransports,
    getUnbookedTransportById,
    previewLogo,
    getSalesReport,
    getTouristReport,
    openBookingForActivity,
    changeActivityLogo,
    previewActivityLogo,
    getNotifications
};
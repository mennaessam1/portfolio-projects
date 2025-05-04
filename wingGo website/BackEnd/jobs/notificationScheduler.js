const schedule = require('node-schedule');
const Tourist = require('../models/tourist'); // Adjust path as needed
const Activity = require('../models/Activity');
const Itinerary = require('../models/Itinerary');
const nodemailer = require('nodemailer'); // For email reminders

// Helper function to calculate the time left
const calculateTimeLeft = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    return 'less than an hour'; // Past or very close events
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  } else {
    return `${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`;
  }
};

// Helper function to send email reminders
const sendEmailNotification = async (toEmail, notifications) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "winggo567@gmail.com", // Replace with your email
        pass: "smkg eghm yrzv yyir" // Replace with your app password or environment variables
      }
    });

    const content = notifications.map(notification => `
      <p>${notification.message}</p>
    `).join('');

    const mailOptions = {
      from: "winggo567@gmail.com",
      to: toEmail,
      subject: 'Your Upcoming Activities & Itineraries',
      html: `<h3>Here are your upcoming activities and itineraries:</h3>${content}`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${toEmail}`);
  } catch (error) {
    console.error(`Error sending email to ${toEmail}:`, error);
  }
};


// Main scheduler function
const sendReminders = async () => {
  try {
    const currentDate = new Date();
    const targetStart = new Date(currentDate);
    targetStart.setHours(0, 0, 0, 0); // Start of the day (midnight)
    targetStart.setDate(targetStart.getDate() + 2); // Exactly 48 hours ahead

    const targetEnd = new Date(targetStart);
    targetEnd.setHours(23, 59, 59, 999); // End of the target day

    console.log(`Checking for events starting between ${targetStart} and ${targetEnd}`);

    // Find activities and itineraries starting exactly 48 hours ahead
    const upcomingActivities = await Activity.find({
      date: { $gte: targetStart, $lte: targetEnd },
    });

    const upcomingItineraries = await Itinerary.find();

    const tourists = await Tourist.find().populate('bookedActivities bookedItineraries');

    for (const tourist of tourists) {
      const appNotifications = [];
      const emailNotifications = [];

      // Check for booked activities starting exactly 48 hours ahead
      tourist.bookedActivities.forEach((activityId) => {
        const activityIdToCompare = activityId._id ? activityId._id.toString() : activityId.toString();
        const activity = upcomingActivities.find(a => a._id.toString() === activityIdToCompare);

        if (activity) {
          const timeLeft = calculateTimeLeft(activity.date);

          // App notification
          appNotifications.push({
            type: 'reminder',
            eventId: activity._id,
            message: `Reminder: Your upcoming activity '${activity.name}' is in less than 48 hours!`,
            date: new Date(),
            metadata: { eventName: activity.name, date: activity.date.toISOString() }
          });

          // Email notification
          emailNotifications.push({
            type: 'reminder',
            message: `Your upcoming activity '${activity.name}' is in less than 48 hours!`
          });
        }
      });

      // Check for booked itineraries starting exactly 48 hours ahead
      tourist.bookedItineraries.forEach((itineraryBooking) => {
        const bookingDate = new Date(itineraryBooking.bookingDate);

        if (bookingDate >= targetStart && bookingDate <= targetEnd) {
          const itinerary = upcomingItineraries.find(i => i._id.equals(itineraryBooking.itineraryId));

          if (itinerary) {
            const timeLeft = calculateTimeLeft(bookingDate);

            // App notification
            appNotifications.push({
              type: 'reminder',
              itineraryId: itinerary._id,
              message: `Reminder: Your itinerary '${itinerary.title}' is in less than 48 hours!`,
              date: new Date(),
              metadata: { itineraryTitle: itinerary.title, date: bookingDate.toISOString() }
            });

            // Email notification
            emailNotifications.push({
              type: 'reminder',
              message: `Your itinerary '${itinerary.title}' is in less than 48 hours!`
            });
          }
        }
      });

      // Push app notifications to the tourist's profile
      if (appNotifications.length > 0) {
        await Tourist.findByIdAndUpdate(tourist._id, { $push: { notifications: { $each: appNotifications } } });
      }

      // Send email notifications
      if (emailNotifications.length > 0) {
        await sendEmailNotification(tourist.email, emailNotifications);
      }
    }
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
};


// Schedule the task to run every minute for testing
const startScheduler = () => {
  // schedule.scheduleJob('*/1 * * * *', sendReminders); // Run every minute for testing
// schedule.scheduleJob('0 0 * * *', sendReminders); // Runs daily at midnight
schedule.scheduleJob('15 10 * * *', sendReminders); // Runs daily at 10:15 AM
};

module.exports = startScheduler;

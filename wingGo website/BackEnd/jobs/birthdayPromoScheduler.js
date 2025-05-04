const schedule = require('node-schedule');
const Tourist = require('../models/tourist'); // Adjust the path if necessary
const PromoCode = require('../models/PromoCode'); // Adjust the path if necessary
const nodemailer = require('nodemailer');

const sendBirthdayPromoCodes = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tourists = await Tourist.find();

    for (const tourist of tourists) {
        console.log(`Checking tourist: ${tourist.username} with DOB: ${tourist.DOB}`);

        const birthDate = new Date(tourist.DOB);
        birthDate.setFullYear(today.getFullYear());
        
        console.log(`Calculated birthday: ${birthDate} | Today: ${today}`);
        
        if (
            birthDate.getDate() === today.getDate() &&
            birthDate.getMonth() === today.getMonth() &&
            birthDate.getFullYear() === today.getFullYear()
          ) {
          console.log(`Sending promo code to: ${tourist.email}`);
        const promoCode = new PromoCode({
          code: `BIRTHDAY-${tourist._id}-${Date.now()}`,
          discount: 20,
          startDate: today,
          endDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
          isActive: true,
          description: 'Happy Birthday! Enjoy this exclusive discount.',
          touristId: tourist._id,
        });

        await promoCode.save();

        tourist.notifications.push({
          type: 'promoCode',
          message: `Happy Birthday! Your promo code: ${promoCode.code} gives you ${promoCode.discount}% off!`,
          date: new Date(),
          metadata: { code: promoCode.code, discount: promoCode.discount },
        });
        // Add promo code to the tourist's promoCodes array
        tourist.promoCodes.push(promoCode._id);
        await tourist.save();


        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'winggo567@gmail.com',
            pass: 'smkg eghm yrzv yyir',
          },
        });

        await transporter.sendMail({
          from: 'winggo567@gmail.com',
          to: tourist.email,
          subject: 'Happy Birthday! 🎉 Here’s Your Gift!',
          html: `
            <h3>Happy Birthday, ${tourist.username}!</h3>
            <p>We’re thrilled to celebrate your special day. Use your personalized promo code: <strong>${promoCode.code}</strong></p>
            <p>Enjoy ${promoCode.discount}% off on anything on our website. Valid until ${promoCode.endDate.toDateString()}.</p>
          `,
        });

        console.log(`Promo code sent to ${tourist.email} for their birthday.`);
      }
    }
  } catch (error) {
    console.error('Error sending birthday promo codes:', error);
  }
};

// Schedule this task to run daily at midnight
// schedule.scheduleJob('0 0 * * *', sendBirthdayPromoCodes);
// schedule.scheduleJob('*/2 * * * *', sendBirthdayPromoCodes);
schedule.scheduleJob('15 10 * * *', sendBirthdayPromoCodes); // Runs daily at 10:15 AM

module.exports = sendBirthdayPromoCodes;

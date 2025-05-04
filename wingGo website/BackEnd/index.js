//External variables
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const touristRoutes = require('./routes/touristRoutes'); // Ensure correct relative path
const touristController= require('./controllers/touristController');
const PendingUsersController= require('./controllers/PendingUserController');
const adminRoutes = require('./routes/AdminRoutes');
const tourGuideRoutes = require('./routes/TourGuideRoutes'); // Ensure correct path
const govornorRoutes = require('./routes/GovornorRoutes');
const advertiserRoutes = require('./routes/advertiserRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const guestRoutes = require('./routes/guestRoutes');
const prefreRoutes = require('./routes/preferenceTagRoutes');
const orderRoutes = require('./routes/orderRoutes');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');
const bodyParser = require('body-parser');
const { S3Client } = require('@aws-sdk/client-s3');
const notificationScheduler = require('./jobs/notificationScheduler');
const birthdayPromoScheduler = require('./jobs/birthdayPromoScheduler');
const jwt = require('jsonwebtoken');
const LoginCredentials = require('./models/LoginCredentials');
const Otp = require('./models/Otp');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.json());

const { fileURLToPath } = require('url');
//Connect to mongoDB (will be used later on to connect with our DB)
//put in env the port an dthe url
const dbURI = 'mongodb+srv://winggo567:Winggo123456@winggo.s9seh.mongodb.net/wingGo?retryWrites=true&w=majority&appName=WingGo';
// const dbURI = process.env.MONGODB_URI;


const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const BUCKET = process.env.AWS_BUCKET_NAME;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
});

// mongoose.connect(dbURI);
mongoose.connect(dbURI)
  .then(() => {console.log('Connected to MongoDB');
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
  })
  .catch((err) => console.log('MongoDB connection error:', err));



// Add this line to parse incoming JSON request bodies
app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send("Successfully uploaded "+ req.file.location + "  location");
});



app.get('/download/:filename', async (req, res) => {
  const filename = req.params.filename;
  let x = await s3.getObject({Bucket: BUCKET, Key: filename}).promise();
  res.send(x.Body);
}
);

app.delete('/delete/:filename', async (req, res) => {
  const filename = req.params.filename;
  let x = await s3.deleteObject({Bucket: BUCKET, Key: filename}).promise();
  res.send("File deleted successfully");
});

// Start the notification scheduler
notificationScheduler();
// birthdayPromoScheduler();

/// routes
// Route to serve the homepage
app.get("/", (req, res) => {
  res.send('<h1>hii</h1>');const itineraryController = require('../controllers/ItineraryController');

  // Create a new itinerary
  router.post('/Createitinerary', itineraryController.createItinerary);
  
  // Get all itineraries for a tour guide
  router.get('/getitinerary/:id', itineraryController.getItineraries);
  
  router.get('/getALLitineraries', itineraryController.getAllItineraries);
  
  router.get('/itineraries/tourGuide/:tourGuideId', itineraryController.getItinerariesByTourGuide);
  // Update an itinerary
  router.put('/Updateitinerary/:id', itineraryController.updateItinerary);
  
  // Delete an itinerary (only if no bookings exist)
  router.delete('/Deleteitinerary/:id', itineraryController.deleteItinerary);  
});

app.post("/register", (req, res) => {
  const { role } = req.body; // Get the role from request body

  if (role === 'tourist') {
    touristController.tourist_register(req, res); // Call the tourist registration handler
  }else {
    // Apply the file upload middleware for other roles
    upload.fields([{ name: 'IDdocument' }, { name: 'certificate' }])(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        // Call the pending user registration handler
        PendingUsersController.pendinguser_register(req, res);
    });
}
});

app.get("/getUsersinLogin", (req, res) => {

    PendingUsersController.getUserByUsername(req,res);

});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userCredentials = await LoginCredentials.findOne({ username: username });

  if (!userCredentials) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, userCredentials.password);
  
  console.log(isMatch);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const mustChangePassword = userCredentials.mustChangePassword;

  

  const token = jwt.sign(
    { username: username, id: userCredentials.userId, role: userCredentials.roleModel, mustChangePassword: mustChangePassword},
    process.env.TOKEN_SECRET,
    { expiresIn: '5h' }
  );

  // Set the JWT in a cookie
  res.cookie('token', token);

  if (mustChangePassword) {
    return res.status(200).json({ message: 'Please change your password' });
  }

  res.json({ message: 'Login successful', token: token });
});

app.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

app.post("/sendOtp", async (req, res) => { 

    const { email } = req.body;
    

    if (!email ) {
        return res.status(400).json({ message: 'Please provide email ' });
    }

    try {
        const user = await LoginCredentials.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

        const userOtp = await Otp.findOne({ email: email });
        if (userOtp) {
            await Otp.findOneAndDelete({ email: email });
        }

        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 5);

        await Otp.create({ email, otp, expiry });

        
        console.log(otp);
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
            subject: 'Forgot Password OTP',
            text: `Your OTP is ${otp}`, 
        });

        res.status(200).json({ message: 'OTP shared successfully', otp });
    } catch (error) {
        res.status(500).json({ message: '', error });
    }

  });

app.delete("/verifyOtp", async (req, res) => {

    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Please provide OTP' });
    }

    try {
        const userOtp = await Otp.findOne({ email: email });

        if (!userOtp) {
            return res.status(400).json({ message: 'OTP not found' });
        }

        
        
        if (userOtp.otp !== Number(otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const currentTime = new Date();

        if (currentTime > userOtp.expiry) {

            await Otp.findOneAndDelete({ email: email });

            return res.status(400).json({ message: 'OTP expired' });
        }

        const user = await LoginCredentials.findOne({ email: email });
        console.log(user);
        user.mustChangePassword = true;
        console.log(user);
        await user.save();
        
        await Otp.findOneAndDelete({email: email});

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: '', error });
    }
}
);

app.put("/changePasswordAfterOtp", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await LoginCredentials.findOne({ email: email});

        user.password = hashedPassword;
        user.mustChangePassword = false;

        await user.save();

        //modify the cookie
        const token = jwt.sign(
            { username: user.username, id: user.userId, role: user.roleModel, mustChangePassword: false},
            process.env.TOKEN_SECRET,
            { expiresIn: '5h' }
        );

        // Set the JWT in a cookie
        res.cookie('token', token);

        res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        res.status(500).json({ message: '', error });
    }
}
);






// Tourist routes
// app.use('/tourist',touristRoutes);

// Use the admin routes
app.use('/admin', adminRoutes);
app.use('/seller', sellerRoutes);

app.use('/tourguide', tourGuideRoutes);

// app.use('/tags', tagRoutes);



app.use('/govornor', govornorRoutes);
app.use('/advertiser', advertiserRoutes);

app.use('/tourist', touristRoutes);
app.use('/guest', guestRoutes);

app.use('/prefrences', prefreRoutes);


app.use('/order', orderRoutes);


// Serve static files from the "images" directory
// Set up static folder
// Serve static files from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));






// //Must be at the bottom so that it doesnt match right away
// app.use((req, res)=> {
//   //we could add status code bec it returns a req obj
//   res.status(404).sendFile('./views/404.html', {root: __dirname});
// });


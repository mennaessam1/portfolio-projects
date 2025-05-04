# WingGo Trip Planner

## Motivation
Planning vacations can feel overwhelming, especially when trying to balance preferences, budgets, and logistics. wingGo Trip Planner was created with the mission to simplify and enhance the vacation planning experience. Our goal is to offer a comprehensive platform where users can effortlessly plan their ideal getaways, perfectly customized to their individual preferences and budgets—all without the hassle of using multiple tools.

With cutting-edge technology and a user-friendly design, wingGo redefines the trip planning process, making travel seamless and enjoyable for everyone. Whether you're dreaming of exploring historic sites or unwinding at a beachside retreat, wingGo is crafted to meet the needs of every traveler with convenience and precision.

## Build Status

### Stable
The application is fully functional apart from the change currency, it bugged during code integration; as well as "adding promo codes as an admin" is not yet available on our website. 

### Purpose of Monitoring Build Status
1. **Keeping Users Informed:** Providing transparency about the project's build status ensures users are aware of any ongoing issues or bugs, preventing confusion about whether errors are on their end.

2. **Supporting Developer Collaboration:** The build status serves as a project health indicator, helping developers quickly identify and resolve issues while encouraging prompt suggestions for improvements.



## Code Style
- This project uses envato market as a source for its front end's template .
- This project adheres to a set of coding conventions and style guidelines to ensure consistency and maintainability. Please follow these guidelines when contributing to or maintaining the codebase.

### General Guidelines

- **Consistency:** Keep naming conventions consistent throughout the codebase.
- **Indentation:** Use one space for indentation.
- **Comments:** Include comments for complex sections or where additional clarity is needed.
- **Error Handling:** Always use try-catch blocks for asynchronous operations.

### Naming Conventions

- **Variables and Functions:** Use camelCase (e.g., `getPackage`, `deleteAdmin`).

### File Structure

- Group related files together in appropriate directories.
- Maintain a clean and organized directory structure.



## Screenshots
- ![Sign In Page](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Sign%20in.jpg)
- ![Tourism Governer Editing Place Info Page](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Editing%20placeInfo%20for%20tourismGoverner.jpg)
- ![Activities Page](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Activities%20Page.jpg)
- ![Tourist Profile](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Tourist%20profile.jpg)
- ![Guest Viewing Places](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/GuestViewingPlaces.png)
- ![Add Place](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Add%20Place.png)
- ![Cart](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Cart.png)
- ![Checkout](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Checkout.png)
- ![Help Me Button](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Help%20Me%20Button.png)
- ![Loyalty Program](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Loyalty%20Program.png)
- ![OTP](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/OTP.png)
- ![Searching Flights](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Searching%20Flights.png)
- ![Searching Hotels](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Searching%20Hotels.png)
- ![Wishlist](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Wishlist.png)
- ![Tourism Governer Saving Place](https://github.com/Advanced-computer-lab-2024/wingGo/blob/main/Assets/Tourism%20Governer%20Saving%20Place.png)



## Tech/Framework Used
- _JavaScript_: The main programming language used.
- _React_: A JavaScript library for building the user interface.
- _Node.js_: A JavaScript runtime used to run the server-side JavaScript code.
- _Express.js_: A web application framework for Node.js, used to build the API.
- _MongoDB_: A NoSQL database used to store the application data.
- _RapidAPI_: Connects developers with a vast array of public APIs, facilitating seamless integration and management.
- _Amadeus_: It offers services like flight reservations, hotel bookings, car rentals, and more through its Global Distribution System (GDS).
- _Amazon S3_: Is a scalable, high-performance, and secure cloud storage solution provided by Amazon Web Services (AWS)
- _NextJs_: React-based framework for building modern web applications. It provides features like server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR).
- _TypeScript_: programming language developed that builds on JavaScript by adding static typing. It helps with catching errors at compile time rather than runtime.


## Features

### Guest Registeration 
- Register (sign up) as a tourist using email, username, password, mobile number, nationality, DOB, job/student.
- Register (sign up) as a tour guide/ advertiser/ seller on the system with username, email and password.

### Authentication 
- Login using username and password.
- Log out.

### Password Management
- Change password.
- If user forgot password they can still sign in by an OTP sent by email.

### Profile Management 
- Set up or modify my profile as a tour guide, including personal details such as mobile number, years of experience, and any prior work (if applicable), once accepted into the system as a tour guide.
- Set up or modify my profile as a company (Advertiser), including details like a website link, hotline number, and company description, once accepted as an advertiser on the system.
- Set up or modify my profile as a Seller, including my name and description, once approved as a seller in the system.
- As a Tour Guide, Advertiser or Seller, upload a profile picture.
- As a tourist, update my profile with all my personal details, including wallet information.
- Request to have my account permanently removed from the system.

### Administrator Functions
- Review the documents submitted by tour guides, advertisers, or sellers attempting to register on the system.
- Approve or deny registration for tour guides, advertisers, and sellers based on the submitted documents.
- Remove an account from the system.
- Add a new admin to the system by creating a unique username and password.
- Add a Tourism Governor to the system by setting up a unique username and password.
- Create, view, update, or delete activity categories (e.g., food, stand-up comedy, concerts, parties, bazaars, exhibitions, sports events, parks, etc.).
- Create, view, update, or delete preference tags (e.g., historic sites, beaches, family-friendly, shopping, budget-friendly).
- View a sales report detailing revenue from various events, itineraries, and gift shop sales.
- Flag an event or itinerary if it is found to be inappropriate/irrelevant.
- Monitor the total number of users and track new user sign-ups each month.
- Review a list of all complaints along with their statuses (pending/resolved).
- View the details of a specific complaint.
- Change the status of a complaint to pending or resolved.
- Respond to any complaints submitted by users.
- Sort complaints by submission date.
- Filter complaints based on their current status.

### Tourist Functions
- Search for a specific museum, historical site, activity, or itinerary by name, category, or tag.
- Access a step-by-step guide detailing the actions needed to start my vacation.
- Set my vacation preferences, such as historic areas, beaches, family-friendly options, shopping, and budget.
- Book a flight through a third-party service.
- Reserve a hotel room via a third-party service.
- Arrange transportation through transportation providers.
- Choose an activity category.
- View all upcoming activities, itineraries, and historical sites or museums.
- Filter upcoming activities by budget, date, category, or ratings.
- Sort upcoming activities or itineraries based on price or ratings.
- Filter available and upcoming itineraries by budget, date, preferences (historic sites, beaches, family-friendly, shopping), and language.
- Filter historical sites and museums by tag.
- Share an activity, museum, historical site, or itinerary via a link or email.
- Rate a tour guide after completing a tour.
- Comment on a tour guide I have completed a tour with.
- Rate an itinerary made by a tour guide that I followed.
- Comment on an itinerary created by a tour guide that I followed.
- Rate an event or activity I attended.
- Comment on an event or activity I attended.
- Purchase a ticket for an event, activity, or itinerary.
- Pay for an event, activity, or itinerary online using a credit/debit card or wallet, if available.
- Receive an email with a payment receipt after paying for an event or itinerary.
- Cancel a booking for an event, activity, or itinerary at least 48 hours before its start time.
- View the refund from a cancelled event, activity, or itinerary in my wallet.
- See a list of all upcoming activities or itineraries I’ve paid for.
- View all past activities or itineraries I've paid for.
- Bookmark events for later viewing.
- View all the events I've saved.
- Request to be notified when an event I’m interested in starts accepting bookings.
- Receive notifications within the app for upcoming events I’ve booked/paid for.
- Receive email reminders for upcoming events I’ve booked/paid for.
- Earn loyalty points with payment for any event or itinerary.
- Receive a badge based on my loyalty level.
- Redeem loyalty points as cash in my wallet.
- File a complaint.
- Save a product to my wishlist.
- View my wishlist of products.
- Remove an item from my product wishlist.
- Add an item from my wishlist to my shopping cart.
- Add an item to my shopping cart.
- Remove an item from my shopping cart.
- Adjust the quantity of an item in my cart.
- Checkout my order.
- Add a new delivery address.
- Select a delivery address from the available options.
- Choose a payment method: wallet, credit card, or cash on delivery.
- View current and past orders.
- Rate a product I purchased.
- Review a product I purchased.
- Select the currency in which I want to view prices.
- View order details and status.
- Cancel an order.
- See the refund from a cancelled order in my wallet.
- Receive a promo code on my birthday via email and in the system that can be used on any item on the website.
- Use the promo code on any item on the website.

### Tour Guide Functions
- Create, view, edit, or delete an itinerary, including details such as activities, locations to be visited, timeline, duration of each activity, tour language, price, available dates and times, accessibility, and pickup/drop-off locations.
- Enable or disable an itinerary with bookings.
- View a list of all itineraries I have created.
- View a sales report that summarizes all my revenue.
- Filter the sales report by activity, itinerary, date, or month.
- View a report showing the total number of tourists who used my itinerary or attended my activity.
- Filter the tourist report by month to see the number of tourists who used my itinerary or attended my activity.
- Receive notifications when one of my events or itineraries is flagged as inappropriate by the system admin.
- Receive email notifications when one of my events or itineraries is flagged as inappropriate by the admin.
- Create, view, edit, or delete a tourist itinerary with all details of activities and locations to be visited for a specific date range, including relevant tags.

### Advertiser Functions 
- Create, view, edit, or delete an activity by specifying its date, time, location, price, category, tags, special discounts, and whether booking is open.
- View a list of all activities I have created.
- View a sales report that shows the total revenue generated.
- Filter the sales report by activity, itinerary, date, or month.
- View a report showing the total number of tourists who used my itinerary or participated in my activity.
- Filter the tourist report to see the total number of tourists who used my itinerary or attended my activity by month.
- Receive notifications within the system when an event or itinerary of mine is flagged as inappropriate by the admin.
- Receive email notifications when an event or itinerary of mine is flagged as inappropriate by the admin.

### Seller Functions
- View a sales report that shows the total revenue I have earned.
- View a list of all products available.
- Check the available quantity and sales figures for each product.
- Search for a product using its name.
- Filter products based on price.
- Sort products by their ratings.
- Add a new product with details, price, and available quantity.
- Upload an image for a product.
- Edit the details and price of a product.
- Archive or unarchive a product.
- Receive a notification when a product is out of stock in the system, both in-app and via email.

### Tourism Governer
- Create, Read, Update, or Delete museums and historical places along with it's details like description, pictures, location, opening hours, ticket prices.
- View a list of all my created museums and historical places.
- Create tags for different historical locations.


## Code Examples

### Tourist Controller
``` javascript
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

```

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository:**
   
````bash
   git clone https://github.com/Advanced-computer-lab-2024/wingGo
````

2. **Navigate to the project directory:**

   open 2 terminals

   ```bash
   cd frontend
   ```

   ```bash
   cd backend
   ```

3. **Install server/client dependencies in project folder (wingGo) then in Backend, Frontend, and inside Tourigo-Next:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**

   Create a `.env` file in the root of the `server` directory and add the necessary environment variables.
   Then updateit to include the following variables with your corresponding secret keys:
   ### AWS S3 Configuration
   - AWS_BUCKET_NAME
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION

   ### MongoDB Configuration
   - MONGODB_URI=mongodb+srv://winggo567:Winggo123456@winggo.s9seh.mongodb.net/wingGo?retryWrites=true w=majority&appName=WingGo

   ### Server Configuration
   - PORT=8000

   ### Amadeus Configuration
   - AMADEUS_API_KEY
   - AMADEUS_API_SECRET

5. **Run the development server:**

   in frontend terminal, you have two options:

   ```bash
   cd tourigo-next
   npm run dev
   ```
   ```bash
   cd tourigo-next
   npm run build
   npm start
   ```

   in backend terminal, you have two options:

   ```bash
   nodemon index.js
   ```
   ```bash
   node index.js
   ```

6. **Access the application:**

   Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

**Notes:**

- Make sure you have Node.js and npm installed on your machine.
- MongoDB should be installed and running locally or configured appropriately in your environment variables.


## API Reference

### Admin
- router.get('/getALLitineraries', adminController.getAllItineraries);
- router.get('/getALLactivities', adminController.getAllActivities);
- router.get('/getallproducts', adminController.getAllProducts);
- router.get('/getAttractions', adminController.getAttractions);
- router.put('/approve/:id', adminController.approvePendingUserById);
- router.get('/pending-users', adminController.getPendingUsers);
- router.delete('/pending-users/:id', adminController.deletePendingUserById);
- router.delete('/deleteAccount/:id', adminController.deleteAccount);
- router.put('/product/:productId',upload.single('picture'), adminController.editProduct);
- router.post('/addGovernor', adminController.addTourismGovernor);
- router.post('/categories', adminController.createCategory);
- router.post('/add-product',upload.single('file'), adminController.addProductAsAdmin);
- router.put('/attractions/:id/addTags', adminController.addTag);
- router.get('/attractions/:id/tags', adminController.getTags);
- router.put('/attractions/:id/updateTags', adminController.updateTag);
- router.put('/attractions/:id/deleteTag', adminController.deleteTag);
- router.post('/preferences', adminController.createPreferenceTag);
- router.get('/preferences', adminController.getAllPreferenceTags);
- router.put('/preferences/:id', adminController.updatePreferenceTag);
- router.delete('/preferences/:id', adminController.deletePreferenceTag);
- router.get('/getcategories', adminController.getCategories);
- router.get('/sortProducts', adminController.sortProductsByRatings);
- router.get('/getcategory/:id', adminController.getCategory);
- router.put('/updatecategory/:id', adminController.updateCategory);
- router.delete('/deletecategory/:id', adminController.deleteCategory);
- router.post('/add-admin', adminController.addAdmin);
- router.get('/filterProducts', adminController.filterProduct);
- router.get('/searchProductName', adminController.searchProductsByName);
- router.put('/flagActivity/:id', adminController.flagActivity);
- router.put('/flagItinerary/:id', adminController.flagItinerary);
- router.put('/flagPlace/:id', adminController.flagPlace);
- router.put('/changePassword/:id', adminController.changePassword); // Define route for password change
- router.get('/viewPendingUserID/:id', adminController.viewPendingUserID);
- router.get('downloadPendingUserCertificate/:id', adminController.downloadPendingUserCertificate);
- router.get('/viewPendingUserCertificate/:id', adminController.viewPendingUserCertificate);
- router.get('/downloadPendingUserID/:id', adminController.downloadPendingUserID);
- router.post('/changeProductImage/:id', upload.single('file'), adminController.changeProductImage);
- router.get('/getProductImage/:id', adminController.getProductImage);
- router.get('/downloadProductImage/:id', adminController.downloadProductImage);
- router.put('/updateComplaint/:id', adminController.updateComplaintState);
- router.get('/productQuantityAndSales/:productId', adminController.getProductQuantityAndSales);
- router.get('/productsQuantityAndSales', adminController.getAllProductsQuantityAndSales);
- router.get('/getcomplaints', adminController.getAllComplaints);
- router.get('/detailscomplaint/:id', adminController.getDetailsOfComplaint);
- router.post('/replytocomplaint/:id',adminController.replyComplaint);
- router.put('/changearchive/:id',adminController.ArchiveUnarchiveProduct);
- router.get('/filterComplaints', adminController.filterComplaintsByStatus);
- router.get('/sortComplaints', adminController.sortComplaintsByDate);
- router.get('/getUsername/:id', adminController.getUsernameById);
- router.get('/notifications/:adminId', adminController.getNotifications);
- router.post('/createPromoCode', adminController.createPromoCode);
- router.get('/sales-report', adminController.getSalesReport);
- router.get('/getAllUsers', adminController.getAllUsers);
- router.get('/searchUser', adminController.searchForUserByUsername);
- router.get('/admin/user-statistics', adminController.getUserStatistics);

### Advertiser 
- router.get('/hello', advertiserController.advertiser_hello);
- router.post('/createProfile/:id', advertiserController.createAdvertiserProfile);
- router.put('/updateProfile/:id', advertiserController.updateAdvertiserProfile);
- router.get('/viewProfile/:id', advertiserController.getAdvertiserProfile);
- router.get('/activities', advertiserController.getAllActivities);
- router.get('/activities/:id', advertiserController.getActivity);
- router.delete('/activities/:id', advertiserController.deleteActivity);
- router.put('/activities/:id', advertiserController.updateActivity);
- router.post('/activities', upload.single('file') ,advertiserController.createActivity);
- router.put('/activities/photo/:id', upload.single('file'), advertiserController.changeActivityLogo);
- router.get('/activities/photo/:id', advertiserController.previewActivityLogo);_
- router.post('/uploadLogo/:id', upload.single('file'), advertiserController.changeLogo);
- router.put('/acceptterms/:id', advertiserController.acceptTerms);
- router.put('/changePassword/:id', advertiserController.changePassword); // Define route for password change
- router.delete('/requestAccountDeletion/:id', advertiserController.requestAccountDeletion);
- router.post('/createTransport', advertiserController.createTransport);
- router.get('/transports', advertiserController.getAllTransports);
- router.get('/transports/:id', advertiserController.getTransportById);
- router.put('/updateTransport/:id', advertiserController.updateTransport);
- router.delete('/deleteTransport/:id', advertiserController.deleteTransport);
- router.get('/viewLogo/:id', advertiserController.previewLogo);
- router.get('/sales-report/:advertiserId', advertiserController.getSalesReport);
- router.get('/tourist-report/:advertiserId', advertiserController.getTouristReport);
- router.put('/openBookingForActivity/:id', advertiserController.openBookingForActivity);
- router.get("/notifications/:advertiserId", advertiserController.getNotifications);

### Governer 
- router.post('/createPlace', PlaceController.createPlace);
- router.get('/getAllPlaces', PlaceController.getAllPlaces);
- router.get('/getPlace/:id', PlaceController.getPlaceById);
- router.put('/updatePlace/:id', PlaceController.updatePlace);
- router.delete('/deletePlace/:id', PlaceController.deletePlace);
- router.put('/addTag/:id', PlaceController.addTagToPlace);
- router.put('/addTagUpdated/:id', PlaceController.addTagUpdated);
- router.get('/hello', PlaceController.hello);
- router.post('/preferences', PlaceController.createPreferenceTag);
- router.put('/changePassword/:id', PlaceController.changePassword); // Define route for password change
- router.get('/viewPreferences', PlaceController.getActivePreferenceTags);
- router.put('/addTagToPlace/:id', PlaceController.addTagToPlace2);

### Guest
- router.get('/filterPlacesByTag', guestController.filterPlacesByTag);
- router.get('/viewActivities', guestController.getAllUpcomingActivities);
- router.get('/viewItineraries', guestController.getAllUpcomingIteneries);
- router.get('/viewPlaces', guestController.getAllUpcomingPlaces);
- router.get('/filterActivities', guestController.filterUpcomingActivities);
- router.get('/filterItineraries', guestController.filterItineraries);
- router.get('/itineraries', guestController.filterItineraries);

### Order
- router.post('/add', orderController.createOrder);  // Create a new order
- router.get('/get/:id', orderController.getOrderDetails);

### Preferences and tags
- router.post('/preference-tags', preferenceTagController.createPreferenceTag);  
- router.get('/preference-tags', preferenceTagController.getAllPreferenceTags);  
- router.put('/preference-tags/:id', preferenceTagController.updatePreferenceTag);  
- router.delete('/preference-tags/:id', preferenceTagController.deletePreferenceTag);  

### Seller
- router.get('/hello', sellerController.seller_hello);
- router.get('/getallproducts', sellerController.getAllProducts);
- router.put('/update/:id', sellerController.updateSellerProfile);
- router.get('/viewProfile/get/:id', sellerController.getSeller);
- router.post('/addProduct', upload.single('file'), sellerController.addProduct);  // Use multer middleware for file upload
- router.put('/product/:productId', upload.single('file'), sellerController.editProduct);
- router.get('/sortProducts', sellerController.sortProductsByRatings);
- router.get('/filterProducts', sellerController.filterProduct);
- router.post('/createProfile/:id', sellerController.createSellerProfile);
- router.get('/searchProductName', sellerController.searchProductsByName);
- router.get('/productImage/:id', sellerController.getProductImage);
- router.post('/changeLogo/:id', upload.single('file'), sellerController.changeLogo);
- router.put('/acceptterms/:id', sellerController.acceptTerms);
- router.put('/changePassword/:id', sellerController.changePassword); // Define route for password change
- router.get('/downloadProductImage/:id', sellerController.downloadProductImage);
- router.delete('/deleteSeller/:id', sellerController.deleteSellerAccount);
- router.get('/:id', sellerController.getSellerById);
- router.get('/productQuantityAndSales/:productId', sellerController.getProductQuantityAndSales);
- router.get('/productsQuantityAndSales', sellerController.getAllProductsQuantityAndSales);
- router.put('/changearchive/:id',sellerController.ArchiveUnarchiveProduct);
- router.get('/viewLogo/:id', sellerController.previewLogo);
- router.get('/notifications/:userId', sellerController.getNotifications);
- router.get('/sales-report/:sellerId', sellerController.getSalesReport);

### Tour Guide
- router.post('/Createitinerary', upload.single('file'),itineraryController.createItinerary);
- router.get('/getitinerary/:id', itineraryController.getItineraries);
- router.get('/itinerary/photo/:id', itineraryController.getItineraryPhoto);
- router.get('/getALLitineraries', itineraryController.getAllItineraries);
- router.get('/itineraries/:tourGuideId', itineraryController.getItinerariesByTourGuide);
- router.put('/Updateitinerary/:id', itineraryController.updateItinerary);
- router.delete('/Deleteitinerary/:id', itineraryController.deleteItinerary);
- router.post('/createTourguideProfile/:id', tourGuideController.createTourguideProfile);
- router.get('/fetch/:id', tourGuideController.getTourGuide);
- router.put('/update/:id', tourGuideController.updateTourGuideProfile);
- router.post('/changeProfilePhoto/:id', upload.single('file'),tourGuideController.changeProfilePhoto);
- router.get('/viewProfilePhoto/:id', tourGuideController.previewPhoto);
- router.put('/acceptterms/:id', tourGuideController.acceptTerms);
- router.put('/changePassword/:id', tourGuideController.changePassword); // Define route for password change
- router.delete('/deleteAccount/:id', tourGuideController.deleteTourGuideAccount);
- router.put('/activateOrDeactivateItinerary/:id', tourGuideController.activateOrDeactivateItinerary);
- router.get('/sales-report/:tourGuideId', tourGuideController.getSalesReport);
- router.get('/tourist-report/:tourGuideId', tourGuideController.getTouristReport);
- router.put('/openBooking/:id', tourGuideController.openBooking);
- router.get('/notifications/:tourguideId', tourGuideController.getNotifications);

### Tourist 
- router.get('/register', touristController.tourist_hello);
- router.get('/getallproducts', touristController.getAllProducts);
- router.get('/viewProfile/:id', touristController.getTourist);
- router.put('/update/:id',touristController.updateTouristProfile);
- router.get('/sort-upcoming', touristController.sortUpcomingActivityOrItineraries); ////
- router.get('/sortProducts', touristController.sortProductsByRatings);
- router.get('/filterProducts', touristController.filterProduct);
- router.get('/searchProductName', touristController.searchProductsByName);
- router.get('/filterPlacesByTag', touristController.filterPlacesByTag);
- router.get('/viewActivities', touristController.getAllUpcomingActivities);
- router.get('/viewItineraries', touristController.getAllUpcomingIteneries); ////////
- router.get('/viewPlaces',touristController.getAllUpcomingPlaces);
- router.get('/viewUpcoming',touristController.getAllUpcomingEvents);
- router.get('/filterActivities',touristController.filterUpcomingActivities);
- router.get('/filterItineraries',touristController.filterItineraries); ////////
- router.get('/sort', touristController.sortUpcomingActivityOrItineraries);
- router.get('/search', touristController.searchAllModels);  /////////
- router.get('/itineraries', touristController.filterItineraries);
- router.post('/complaints/:id', touristController.addComplaint);
- router.get('/viewmycomplaints/:id', touristController.viewComplaints);
- router.put('/:id/preferences', touristController.addPreferencesToTourist);
- router.delete('/:id/preferences', touristController.removePreferencesFromTourist);
- router.put('/changePassword/:id', touristController.changePassword); // Define route for password change
- router.post('/bookItinerary/:touristId/:itineraryId', touristController.bookItinerary);
- router.delete('/cancelItinerary/:touristId/:itineraryId', touristController.cancelItinerary);
- router.put('/redeemPoints/:touristId', touristController.redeemPoints);
- router.post('/bookActivity/:touristId/:activityId', touristController.bookActivity);
- router.delete('/cancelActivity/:touristId/:activityId', touristController.cancelActivity);
- router.post('/purchaseProduct/:touristId/:productId', touristController.purchaseProduct);
- router.post('/rateProduct/:touristId/:productId', touristController.rateProduct);
- router.post('/reviewProduct/:touristId/:productId', touristController.reviewProduct);
- router.post('/rateActivity/:touristId/:activityId', touristController.rateActivity);
- router.post('/commentOnActivity/:touristId/:activityId', touristController.commentOnActivity);
- router.delete('/delete/:id', touristController.deleteTouristIfEligible);
- router.get('/completedItineraries/:touristId', touristController.getCompletedItineraries);
- router.post('/rateItinerary/:touristId/:itineraryId', touristController.rateItinerary);
- router.post('/commentItinerary/:touristId/:itineraryId', touristController.commentOnItinerary);
- router.post('/ratetourguide/:touristId/:tourGuideId', touristController.rateTourGuide);
- router.post('/commenttourguide/:touristId/:tourGuideId', touristController.commentOnTourGuide);
- router.get('/searchFlights', touristController.getFlightPrices);
- router.post('/bookFlight/:touristId', touristController.bookFlight);
- router.post('/shareActivityViaEmail/:id', touristController.shareActivityViaEmail);
- router.post('/shareItineraryViaEmail/:id', touristController.shareItineraryViaEmail);
- router.post('/sharePlaceViaEmail/:id', touristController.sharePlaceViaEmail);
- router.post('/shareProductViaEmail/:id', touristController.shareProductViaEmail);
- router.get('/searchHotelsByCity', touristController.getHotelOffersByCity);
- router.get('/searchHotelsByLocation', touristController.getHotelOffersByLocation);
- router.post('/bookHotel/:touristId', touristController.bookHotel);
- router.get('/transports', advertiserController.getAllUnbookedTransports);
- router.put('/bookTransport/:touristId/:transportId', touristController.bookTransport);
- router.get('/:id', touristController.getTouristById);
- router.get('/booked-itineraries/:touristId', touristController.getBookedItineraries);
- router.get('/booked-activities/:touristId', touristController.getBookedActivities);
- router.get('/getUsername/:id', touristController.getTouristUsername);
- router.get('/orderDetails/:id', touristController.orderDetails);
- router.get('/pastandcurrentorders/:touristId',touristController.viewAllorders);
- router.put('/cancelOrder/:touristId/:orderId', touristController.cancelOrder);
- router.get('/getallproducts2/:touristId', touristController.getAllProducts2);
- router.get('/purchasedProducts/:touristId', touristController.getPurchasedProducts);
- router.get('/booked-status/:touristId/booked-status/:itineraryId', touristController.isItineraryBooked);
- router.get('/booked-status/:touristId/activity-status/:activityId', touristController.isActivityBooked);
- router.get('/getActivity/:id', touristController.getActivity);
- router.get('/searchFlights/:userId', touristController.searchFlightsByUserId);
- router.get('/searchHotels/:userId', touristController.searchHotelsByUserId);
- router.post('/cart/:touristId/:productId', touristController.addToCart);
- router.delete('/cart/:touristId/:productId',touristController.removeFromCart);
- router.put('/updateAmountInCart/:cartItemId', touristController.updateCartItemAmount);
- router.post('/addDeliveryAddress/:touristId', touristController.addDeliveryAddress);
- router.post('/chooseAddress/:touristId', touristController.chooseAddress);
- router.get('/notifications/:userId', touristController.getNotifications);
- router.post('/payForProducts/:touristId/:productId', touristController.payForProducts);
- router.put('/pay/:orderId', touristController.payForOrder); // Endpoint to pay for an order
- router.get('/cartItems/:touristId',touristController. getItemsInCart);
- router.post('/wishlist/:touristId/:productId', touristController.addWishlist);
- router.get('/viewWishlist/:touristId', touristController.viewWishlist);
- router.delete('/deleteWishlist/:touristId/:productId', touristController.removeWishlistItem);
- router.post('/wishlisttoCart/:touristId/:productId', touristController.addWishlistItemToCart);
- router.get('/promoCodes/:touristId', touristController.getPromoCodesForTourist);
- router.post('/saveActivity/:touristId/:activityId', touristController.saveActivity);
- router.post('/saveItinerary/:touristId/:itineraryId', touristController.saveItinerary);
- router.get('/viewAllSavedEvents/:touristId', touristController.viewAllSavedEvents);
- router.put('/toggleNotificationPreference/:touristId', touristController.toggleNotificationPreference);
- router.get('/filteractivitiesdate/:touristId', touristController.getFilteredActivities);
- router.get('/itineraryPrice/:itineraryId', touristController.getPrice);
- router.get('/cartItemsPrice/:touristId', touristController.getCartTotalPrice);
- router.get('/product/:id', touristController.getProductById);
- router.get('/getDiscount/:code', touristController.getDiscountByCode);
- router.get("/deliveryAddresses/:touristId", touristController.getDeliveryAddresses);
- router.get('/places/tags', touristController.getPlacesTags);
- router.get('/activityPrice/:activityId', touristController.calculateActivityPrice);

## Tests
The system was tested using Postman to ensure the validation of the APIs. Using the routes provided above just add the required input such as (Username or Name) using (body or query) to access the required method and fetch the results needed. Testing was done on all routes and methods (get, put, post, delete). A sample collection of tested endpoints can be downloaded [here](https://raw.githubusercontent.com/Advanced-computer-lab-2024/wingGo/refs/heads/main/Assets/WingGo%20Test%20Collection.postman_collection.json)

1. Right click on the opened file then press save as.
2. Open postman.
3. navigate to Collections.
4. click import.
5. select the downloaded file.
6. browse throught the tests and their saved results.



## How To Use

### As a Guest:
- Firstly press the help icon and follow the on screen guide.
- A blue like hued circle will appear on the screen below the "places" tab in the navbar.
- Press the circle and a message will appear guiding you on what each tab on the navbar does and how it functions.
- press "Next" to navigate the entire on screen guide until finishing the guide when it prompts you to login.

### As a Tourist:

#### You also get an on screen guide to help you navigate the website but with additional features like:
- You get to book iteniraries, flights.
- Purchase products through the website.

### As an Advertiser:
- Firstly you need to upload documents and photos to prove your credibility.
- you get to add and upload your activities.

### As a Tour Guide:
- Firstly you need to upload documents and photos to prove your credibility.
- You get to add and update your itineraries.

### As an Admin or a Tourism Governer:
- To be approved to join wingGo adminstration team, you need to send an email to "wingGo567@gmail.com".
- That email should include the neccessary documents to be approved by the WingGo team.
- If approved the WingGo team will contact you providing you with the neccessary information to be part of the adminstration team.


## Contribute
If you're interested in contributing to WingGo, follow the established code style and guidelines. Contribute to the project and be part of the WingGo community.
You can contribute in so many ways to enhance our website to be as perfect as possible.

### How to Contribute

1. **Fork the Repository:**

   - Fork the [WingGo Repo](https://github.com/Advanced-computer-lab-2024/wingGo) on GitHub.

2. **Clone the Repository:**

   - Clone the forked repository to your local machine.

   ```bash
   git clone https://github.com/Advanced-computer-lab-2024/wingGo
   ```

3. **Create a New Branch:**

   - Create a new branch for the feature/bug fix you're working on.

   ```bash
   git checkout -b feature/your-feature
   ```

4. **Make Changes:**

   - Make your changes to the codebase. Ensure your changes adhere to the coding standards and style guide.

5. **Commit Changes:**

   - Commit your changes with a descriptive commit message.

   ```bash
   git commit -m "Add your descriptive commit message here"
   ```

6. **Push Changes:**

   - Push your changes to the branch on your forked repository.

   ```bash
   git push origin feature/your-feature
   ```

7. **Create a Pull Request (PR):**

   - Create a Pull Request from your forked repository to the original WingGo repository.

8. **Review and Merge:**
   - Participate in the discussion if any feedback is given.
   - Once approved, your changes will be merged into the main branch.

Thank you for contributing to WingGo! Your help is greatly appreciated.

## Credits
The WingGo webpage is the result of a collaborative effort by our team, supported by various tools and resources that enabled us to achieve our goals efficiently. Here's an overview of the technologies we utilized:

- **Create React App:** Used to bootstrap the frontend, offering a strong foundation for developing React applications.
- **MongoDB:** A powerful NoSQL database that handles data storage and retrieval for WingGo effectively.
- **Express.js:** The backend is developed using Express.js, a lightweight and flexible web framework for Node.js.
- **Node.js:** Serves as the server-side runtime environment, enabling the execution of JavaScript code outside the browser.
- **React Router:** Facilitates navigation within the application, ensuring a smooth and intuitive user experience.
- **Axios:** Used to handle asynchronous HTTP requests, enabling seamless communication between the frontend and backend of WingGo.
- **NextJs:** React-based framework for building modern web applications. It provides features like server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR).
- **typeScript:** programming language developed that builds on JavaScript by adding static typing. It helps us catch errors at compile time rather than runtime.

**We used some youtube videos as well to help understand how to write our code, and how to use our framework better:**

 1- https://www.youtube.com/watch?v=2QQGWYe7IDU

 2- https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE

 3- https://www.youtube.com/watch?v=j942wKiXFu8&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=2

**Chat GPT 4o as well as other AI assistants were also utilized.**

**And of course our team:**

 - Malak Hesham
 - Maria Ashraf
 - Marina Samir
 - Seif Diea
 - Sylvia Faris
 - Menna Essam
 - Omar Nasr
 - Tasneem Khalil
 - Amr Nour
 - Ali Khalid

## License

### Amazon S3 license 
- For more details, please go back to [S3 License](https://aws.amazon.com/asl/)

### Amadeus License closed under the "Amadeus Hospitality Developer Portal Terms of Use outline" as well as the "Amadeus Selling Platform Connect"
- For more details, please go back to [Amadeus License](https://www.lawinsider.com/clause/amadeus-agreement)

### RapidAPI
- For more details, please go back to [RapidAPI License](https://rapidapi.com/terms/)


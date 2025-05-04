const bcrypt = require('bcrypt');
const PendingUser = require('../models/PendingUsers');
const TourGuide = require('../models/TourGuide');
const LoginCredentials = require('../models/LoginCredentials');
const Tourist = require('../models/tourist');
const Seller = require('../models/Seller');
const TourismGovernor = require('../models/TourismGovernor');
const ActivityCategory = require('../models/ActivityCategory');
const nodemailer = require('nodemailer');
const Advertiser = require('../models/advertiser');
const Product = require('../models/product');
const mongoose = require('mongoose');
const Itinerary = require('../models/Itinerary');
const Place = require('../models/Places');  // Adjust the path based on your project structure
const Activity = require('../models/Activity');  // Adjust the path based on your project structure
const PreferenceTag = require('../models/PreferenceTag');
const Admin = require('../models/Admin');
const Complaint=require('../models/Complaints');
const {generatePreSignedUrl}  = require('../downloadMiddleware');
const {previewgeneratePreSignedUrl}  = require('../downloadMiddleware');
const PromoCode = require('../models/PromoCode');

//Create activity category
const createCategory= async(req,res)=>{
    const {name}=req.body;
    try{
        const notnew= await ActivityCategory.findOne({name});
        if(notnew){
            return res.status(400).json({message:'Category already exists'});
        }
        const newCategory= new ActivityCategory({name});
        await newCategory.save();
        res.status(200).json({message:'Category added successfully',newCategory});
    } catch(error){
        res.status(500).json({error:error.message});
    }
}

//get all categories
const getCategories=async(req,res)=>{
    try{
        const categories=await ActivityCategory.find();
        res.status(200).json(categories);
    } catch(error){
        res.status(500).json({error:error.message});
    }
}; 


//update category
const updateCategory= async(req,res)=>{
    const {id} = req.params;
    const {name}=req.body;
    try{
        const UpdatedCategory = await ActivityCategory.findByIdAndUpdate(id, {name},{new:true});
        if(!UpdatedCategory){
            return res.status(400).json({message:'Category not found'});
        }
        res.status(200).json(UpdatedCategory);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
//delete a category
const deleteCategory= async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedCategory= await ActivityCategory.findByIdAndDelete(id);
        if(!deletedCategory){
            return res.status(400).json({message:'Category not found'});
        }
        res.status(200).json(deletedCategory);
    } catch(error){
        res.status(400).json({error:error.message});
    }
}
//view one category 
const getCategory=async(req,res)=>{
    const {id}=req.params;
    try{
        const category= await ActivityCategory.findById(id);
        if(!category){
            return res.status(400).json({message:'Category not found'});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//add TourismGovernor to DB by username and password
const addTourismGovernor = async (req, res) => {
    const { username, password, email } = req.body;  // Get username and password from request body

    try {

        console.log('Username:', username);
        console.log('Password', password);
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

        // Check if the username already exists in LoginCredentials
        const existingUser = await LoginCredentials.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists in Login Credentials' });
        }

        // Create a new Tourism Governor
        const newTG = new TourismGovernor({
            username,
            password: hashedPassword,
            email
        });

        // Save the new Tourism Governor in the database
        await newTG.save();
        console.log('New Tourism Governor:', newTG._id);
        // Create login credentials for the Tourism Governor
        const loginCredentials = new LoginCredentials({
            username: newTG.username,
            password: newTG.password,  // Use the hashed password
            email: newTG.email,
            role: 'tourism governor',
            userId: newTG._id,  // Reference to the newly created Tourism Governor
            roleModel: 'TourismGovernor'  // Set the role model to 'TourismGovernor'
        });

        console.log('Login Credentials:', loginCredentials);
        // Save the login credentials in the database
        await loginCredentials.save();

        res.status(201).json({ message: 'Tourism Governor and Login Credentials added successfully', governor: newTG });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Admin function to add a product
const addProductAsAdmin = async (req, res) => {
    const { name, price, quantity, description} = req.body;
    let { sellerId } = req.body;  // Optional seller ID provided by the admin


    const picture = req.file ? req.file.location : null;
    try {
        // If sellerId is provided, check if the seller exists
        if (sellerId) {
            const sellerExist = await Seller.findById(sellerId);
            if (!sellerExist) {
                return res.status(404).json({ message: 'Seller not found. Cannot associate this product with a seller.' });
            }
        } else {
            sellerId = null;  // If no seller is provided, set it to null
        }

        // Create the product
        const newProduct = new Product({
            name,
            price,
            quantity,
            description,
            seller: sellerId,  // Could be null if no seller
            picture: picture  // only if a picture is uploaded
        });

        // Save the product to the database
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully by Admin', newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const changeProductImage = async (req, res) => {
    const { id } = req.params;

    const picture = req.file ? req.file.location : null;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.picture = picture;
        await product.save();
        res.status(200).json({ message: 'Product image updated successfully', product });
    

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductImage = async (req, res) => {
    const productId = req.params.id;
    
    try {
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.picture) {
            const key = product.picture.split('/').slice(-1)[0];
            const preSignedUrl = await previewgeneratePreSignedUrl(key);
            
            // Instead of redirecting, send the pre-signed URL directly
            return res.json({ imageUrl: preSignedUrl });
        } else {
            return res.status(404).json({ message: 'Image not found for this product.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const downloadProductImage = async (req, res) => {

    const { id } = req.params;

    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const pictureUrl = product.picture;
        if (!pictureUrl) {
            return res.status(404).json({ message: 'Picture not found' });
        }

        const key = pictureUrl.split('/').slice(-1)[0];
        // Generate a pre-signed URL for the picture
        const preSignedUrl = await generatePreSignedUrl(key);

      
        res.status(200).json({ preSignedUrl });

    } catch (err) {
        console.error('Error in downloadProductImage:', err);
        if (!res.headersSent) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }

}
    

// Function to edit a product
const editProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, price, quantity, description } = req.body;
    const picture = req.file ? req.file.location : null;  // Get picture location if uploaded

    try {
        // console.log('Product ID:', productId); // Log the product ID
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update only the fields provided in the request
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (quantity !== undefined) product.quantity = quantity;
        if (description !== undefined) product.description = description;
        if (picture) product.picture = picture;  // Update picture only if a new one is uploaded
        

        // Save the updated product
        await product.save();
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
        console.error('Error updating product:', err.message);
        res.status(500).json({ error: err.message });
    }
};




const filterProduct = async (req, res) => {
    try {
        const { budget } = req.query; // Extract price from query parameters

        // Initialize an empty filter
        let filter = {};

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
const deleteAccount = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    // console.log(id);

    try {
        // Ensure that the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // No need to convert to ObjectId, Mongoose will handle it
        const account = await LoginCredentials.findOne({ userId: id });

        if (!account) {
            return res.status(404).json({ message: 'Account not found in login credentials' });
        }

        // Delete the corresponding user from the correct collection based on the roleModel
        const UserModel = mongoose.model(account.roleModel);
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: `${account.roleModel} not found` });
        }

        // Finally, delete the account from LoginCredentials
        await LoginCredentials.findOneAndDelete({ userId: id });

        res.status(200).json({ message: `Account with id '${id}' has been deleted successfully.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};







// // Controller function to delete an account using id
// const deleteAccount = async (req, res) => {
//     const { id } = req.params; // Use id as a unique identifier

//     try {
//         // Find the account in loginCredentials by id
//         const account = await LoginCredentials.findById(id);

//         if (!account) {
//             return res.status(404).json({ message: 'Account not found in login credentials' });
//         }

//         // Check the role of the account
//         const { role } = account;

//         // Delete from TourGuide collection if role is 'tour guide'
//         if (role === 'tour guide') {
//             const tourGuide = await TourGuide.findOneAndDelete({ _id: id });

//             if (!tourGuide) {
//                 return res.status(404).json({ message: 'Tour guide not found' });
//             }
//         }
//         // Delete from Tourist collection if role is 'tourist'
//         else if (role === 'tourist') {
//             const tourist = await Tourist.findOneAndDelete({ _id: id });

//             if (!tourist) {
//                 return res.status(404).json({ message: 'Tourist not found' });
//             }
//         } 
//         else if (role === 'seller') {
//             const seller = await Seller.findOneAndDelete({ _id: id });

//             if (!seller) {
//                 return res.status(404).json({ message: 'Seller not found' });
//             }
//         } else if (role === 'advertiser') {
//             const advertiser = await Advertiser.findOneAndDelete({ _id: id });

//             if (!advertiser) {
//                 return res.status(404).json({ message: 'Advertiser not found' });
//             }
//         }  
//         else {
//             return res.status(400).json({ message: 'Invalid role. Cannot delete account' });
//         }

//         // Delete the login credentials
//         await LoginCredentials.findByIdAndDelete(id);

//         res.status(200).json({ message: `Account with id '${id}' has been deleted successfully.` });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
const getPendingUsers = async (req, res) => {
    try {
        const pendingUsers = await PendingUser.find();
        res.status(200).json(pendingUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deletePendingUserById = async (req, res) => {
    try {
        const { id } = req.params;
        await PendingUser.findByIdAndDelete(id);
        res.status(200).json({ message: 'User was declined successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller function to approve a pending user by id
const approvePendingUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the pending user by id
        const pendingUser = await PendingUser.findById(id);
       
        if (!pendingUser) {
            return res.status(404).json({ message: 'Pending user not found' });
        }

        let userCollection;
        let userDocument;
       
        // Check the role and create the user document in the correct collection
        if (pendingUser.role === 'tour guide') {
            console.log("here");
            userCollection = TourGuide;
            userDocument = new TourGuide({
                _id: pendingUser._id,
                email: pendingUser.email,
                username: pendingUser.username,
                password:  pendingUser.password
            });
        } else if (pendingUser.role === 'seller') {
            userCollection = Seller;
            userDocument = new Seller({
                _id: pendingUser._id,
                email: pendingUser.email,
                username: pendingUser.username,
                password: pendingUser.password
            });
        } else if (pendingUser.role === 'advertiser') {
            userCollection = Advertiser;
            userDocument = new Advertiser({
                _id: pendingUser._id,
                email: pendingUser.email,
                username: pendingUser.username,
                password: pendingUser.password
            });
         } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Save the user to the corresponding collection
        await userDocument.save();

        // Create login credentials
        const loginCredentials = new LoginCredentials({
            username: pendingUser.username,
            password: userDocument.password,  // Hashed password
            email: pendingUser.email,
            role: pendingUser.role,
            userId: pendingUser._id,  // Reference to the created user document
            roleModel: userDocument.constructor.modelName  // Dynamically set the role model
        });

        await loginCredentials.save();

        // Remove the user from PendingUser collection after approval
        await PendingUser.findByIdAndDelete(id);

        res.status(200).json({ message: 'User approved, added to respective collection, and login credentials saved', userDocument });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const viewPendingUserID = async (req, res) => {

    const { id } = req.params;

    try {
        const pendingUser = await PendingUser.findById(id);
        if (!pendingUser) {
            return res.status(404).json({ message: 'Pending user not found' });
        }

        const IDdocumentUrl = pendingUser.IDdocument;
        if (!IDdocumentUrl) {
            return res.status(404).json({ message: 'ID document not found' });
        }

        const key = IDdocumentUrl.split('/').slice(-1)[0];
        // Generate a pre-signed URL for the ID document
        const preSignedUrl = await previewgeneratePreSignedUrl(key);

      
        res.status(200).json({ preSignedUrl });

    } catch (err) {
        console.error('Error in viewPendingUserID:', err);
        if (!res.headersSent) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }


}


const downloadPendingUserID = async (req, res) => {

    const { id } = req.params;

    try {
        const pendingUser = await PendingUser.findById(id);
        if (!pendingUser) {
            return res.status(404).json({ message: 'Pending user not found' });
        }

        const IDdocumentUrl = pendingUser.IDdocument;
        if (!IDdocumentUrl) {
            return res.status(404).json({ message: 'ID document not found' });
        }

        const key = IDdocumentUrl.split('/').slice(-1)[0];
        // Generate a pre-signed URL for the ID document
        const preSignedUrl = await generatePreSignedUrl(key);
        
        res.redirect(preSignedUrl);

    } catch (err) {
        console.error('Error in viewPendingUserID:', err);
        if (!res.headersSent) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }

}

const viewPendingUserCertificate = async (req, res) => {

    const { id } = req.params;

    try {
        const pendingUser = await PendingUser.findById(id);
        if (!pendingUser) {
            return res.status(404).json({ message: 'Pending user not found' });
        }

        const certificateUrl = pendingUser.certificate;
        if (!certificateUrl) {
            return res.status(404).json({ message: 'certificate document not found' });
        }

        const key = certificateUrl.split('/').slice(-1)[0];
        const preSignedUrl = await previewgeneratePreSignedUrl(key);

        res.status(200).json({ preSignedUrl });

       

    } catch (err) {
        console.error('Error in viewPendingUserCertificate:', err);
        if (!res.headersSent) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
}

const downloadPendingUserCertificate = async (req, res) => {

    const { id } = req.params;

    try {
        const pendingUser = await PendingUser.findById(id);
        if (!pendingUser) {
            return res.status(404).json({ message: 'Pending user not found' });
        }

        const certificateUrl = pendingUser.certificate;
        if (!certificateUrl) {
            return res.status(404).json({ message: 'certificate document not found' });
        }

        const key = certificateUrl.split('/').slice(-1)[0];
        
        const preSignedUrl = await generatePreSignedUrl(key);

      
        res.status(200).json({ preSignedUrl });

    } catch (err) {
        console.error('Error in viewPendingUserCertificate:', err);
        if (!res.headersSent) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
}


const allowedTags = ['historic areas', 'beaches', 'family-friendly', 'shopping', 'budget-friendly'];

const addTag = async (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;

    if (!allowedTags.includes(tag)) {
        return res.status(400).json({ error: 'Invalid tag' });
    }

    try {
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: 'itinerary not found' });
        }

        // Check if the tag already exists
        if (itinerary.tags.includes(tag)) {
            return res.status(400).json({ error: 'Tag already exists' });
        }

        itinerary.tags.push(tag);
        await itinerary.save();
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTags = async (req, res) => {
    const { id } = req.params;

    try {
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: 'itinerary not found' });
        }

        res.status(200).json(itinerary.tags);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTag = async (req, res) => {
    const { id } = req.params;
    const { oldTag, newTag } = req.body;

    if (!allowedTags.includes(newTag)) {
        return res.status(400).json({ error: 'Invalid tag' });
    }

    try {
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: 'itinerary not found' });
        }

        const tagIndex = itinerary.tags.indexOf(oldTag);
        if (tagIndex === -1) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        itinerary.tags[tagIndex] = newTag;
        await itinerary.save();
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTag = async (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;

    try {
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: 'itinerary not found' });
        }

        itinerary.tags = itinerary.tags.filter(existingTag => existingTag !== tag);
        await itinerary.save();
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const sortProductsByRatings = async (req, res) => {
    try {
        const products = await Product.find().sort({ ratings: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
// Controller function to add a new admin
const addAdmin = async (req, res) => {
    const { username, password, email } = req.body;  // Get username and password from request body

    try {
        // Check if the username already exists in LoginCredentials
        const existingUser = await LoginCredentials.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

        // Create a new admin in the Admin collection
        const newAdmin = new Admin({
            username,
            password: hashedPassword,  // Save the hashed password
            email
        });

        // Save the admin to the Admin collection
        await newAdmin.save();

        // Also create login credentials for the admin
        const loginCredentials = new LoginCredentials({
            username: newAdmin.username,
            password: newAdmin.password,  // Use the hashed password
            email,
            role: 'admin',
            userId: newAdmin._id,  // Reference to the newly created Admin
            roleModel: 'Admin'  // Set the role model to 'Admin'
        });

        // Save the login credentials in the database
        await loginCredentials.save();

        res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'username');  // Populate seller username if available

        // If you need to send a public path for pictures stored locally
        const productData = products.map(product => ({
            _id: product._id,
            name: product.name,
            picture: product.picture, // Build image URL dynamically
            // picture: `${req.protocol}://${req.get('host')}/images/${product.picture}`,  // Build image URL dynamically
            price: product.price,
            sales: product.sales,
            description: product.description,
            quantity: product.quantity,
            seller: product.seller ? product.seller.username : 'Admin',  // Handle null seller field
            sellerID: product.seller ? product.seller._id : 'Admin',  // Handle null seller field
            ratings: product.ratings,
            reviews: product.reviews,
            archive: product.archive
        }));

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const searchProductsByName = async (req, res) => {
    try {
        const query = req.query.name;  
        if (!query) {
            return res.status(400).json({ message: "Please provide a product name to search." });
        }

        // Perform a case-insensitive search for products with names that match the search query
        const products = await Product.find({ name: { $regex: query, $options: 'i' } });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching your search." });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { id } = req.params; // Extract user ID from the request params

    try {
        // 1. Find the user in LoginCredentials
        const userCredentials = await LoginCredentials.findById(id);
        if (!userCredentials) {
            return res.status(404).json({ message: 'User credentials not found' });
        }

        // 2. Compare the old password with the hashed password in LoginCredentials
        const isMatch = await bcrypt.compare(oldPassword, userCredentials.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // 3. Check if the new password matches the confirm password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }

        // 4. Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // 5. Update the password in LoginCredentials
        userCredentials.password = hashedNewPassword;
        await userCredentials.save();

        // 6. Update the password in the Admin collection if the user is an admin
        if (userCredentials.role === 'admin') {
            const admin = await Admin.findById(userCredentials.userId);
            if (admin) {
                admin.password = hashedNewPassword;
                await admin.save();
            }
        }

        res.status(200).json({ message: 'Password updated successfully in both collections' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getAttractions = async (req, res) => {
    try {
        const itinerary = await Itinerary.find().populate('tags');
        res.status(200).json(itinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// const flagActivity = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const activity = await Activity.findByIdAndUpdate(id, { flagged: true }, { new: true });
//       if (!activity) return res.status(404).json({ message: 'Activity not found' });
//       res.status(200).json({ message: 'Activity flagged successfully', activity });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   const flagItinerary = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const itinerary = await Itinerary.findByIdAndUpdate(id, { flagged: true }, { new: true });
//       if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
//       res.status(200).json({ message: 'Itinerary flagged successfully', itinerary });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

/*

*/

// const flagActivity = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { flagged } = req.body;  // Get the flagged status from the request body
  
//       // Update the itinerary's flagged status based on the provided flagged value
//       const activity = await Activity.findByIdAndUpdate(id, { flagged }, { new: true });
  
//       if (!activity) return res.status(404).json({ message: 'Activity not found' });

      
  
//       const message = flagged ? 'Activity flagged successfully' : 'Activity unflagged successfully';
//       res.status(200).json({ message, activity });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

// const flagItinerary = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { flagged } = req.body;  // Get the flagged status from the request body
  
//       // Update the itinerary's flagged status based on the provided flagged value
//       const itinerary = await Itinerary.findByIdAndUpdate(id, { flagged }, { new: true });
  
//       if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
  
//       const message = flagged ? 'Itinerary flagged successfully' : 'Itinerary unflagged successfully';
//       res.status(200).json({ message, itinerary });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
const flagActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { flagged } = req.body; // Get the flagged status from the request body

        // Update the activity's flagged status
        const activity = await Activity.findByIdAndUpdate(id, { flagged }, { new: true }).populate('advertiser');

        if (!activity) return res.status(404).json({ message: 'Activity not found' });

        // Notify the advertiser in-app
        const advertiser = activity.advertiser;
        if (advertiser && flagged) {
            await Advertiser.findByIdAndUpdate(advertiser._id, {
                $push: {
                    notifications: {
                        type: 'event-flagged',
                        eventId: activity._id,
                        message: `Your activity "${activity.name}" has been flagged by the admin.`,
                        date: new Date(),
                    }
                }
            });

            // Send email notification
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'winggo567@gmail.com',
                    pass: 'smkg eghm yrzv yyir', // Ensure this is secure
                }
            });

            await transporter.sendMail({
                from: 'winggo567@gmail.com',
                to: advertiser.email,
                subject: 'Activity Flagged Notification',
                html: `<p>Your activity <strong>${activity.name}</strong> has been flagged as inappropriate by the admin. Please review it.</p>`
            });
        }

        const message = flagged ? 'Activity flagged successfully' : 'Activity unflagged successfully';
        res.status(200).json({ message, activity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const flagItinerary = async (req, res) => {
    try {
        const { id } = req.params;
        const { flagged } = req.body;

        // Update the itinerary's flagged status
        const itinerary = await Itinerary.findByIdAndUpdate(
            id,
            { flagged },
            { new: true }
        ).populate('tourGuideId'); // Populate the tourGuideId field

        if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });

        // Notify the tour guide in-app
        const tourGuide = itinerary.tourGuideId;
        if (tourGuide && flagged) {
            await TourGuide.findByIdAndUpdate(tourGuide._id, {
                $push: {
                    notifications: {
                        type: 'itinerary-flagged',
                        itineraryId: itinerary._id,
                        message: `Your itinerary "${itinerary.title}" has been flagged by the admin.`,
                        date: new Date()
                    }
                }
            });

            // Send email notification
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'winggo567@gmail.com',
                    pass: 'smkg eghm yrzv yyir'
                }
            });

            await transporter.sendMail({
                from: 'winggo567@gmail.com',
                to: tourGuide.email,
                subject: 'Itinerary Flagged Notification',
                html: `<p>Your itinerary <strong>${itinerary.title}</strong> has been flagged as inappropriate by the admin. Please review it.</p>`
            });
        }

        const message = flagged ? 'Itinerary flagged successfully' : 'Itinerary unflagged successfully';
        res.status(200).json({ message, itinerary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  
  
  const flagPlace = async (req, res) => {
    try {
        console.log("in flag");
      const { id } = req.params;
      console.log(id);
      const place = await Place.findOneAndUpdate(
        { _id: id},  // Find by userId and roleModel for the advertiser
        { flagged: true },
        { new: true }  // Return the updated document
    );

      
      if (!place) return res.status(404).json({ message: 'Place not found' });
      res.status(200).json({ message: 'Place flagged successfully', place });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Tags after modification

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

// Get all preference tags
const getAllPreferenceTags = async (req, res) => {
    try {
        const tags = await PreferenceTag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a preference tag by ID
const updatePreferenceTag = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedTag = await PreferenceTag.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedTag) {
            return res.status(404).json({ message: 'Preference tag not found' });
        }
        res.status(200).json({ message: 'Preference tag updated successfully', tag: updatedTag });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a preference tag by ID
const deletePreferenceTag = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTag = await PreferenceTag.findByIdAndDelete(id);
        if (!deletedTag) {
            return res.status(404).json({ message: 'Preference tag not found' });
        }
        res.status(200).json({ message: 'Preference tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//view list of complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//view details of complaint
const getDetailsOfComplaint=async(req,res)=>{
    const { id } = req.params;
    try{
        const details=await Complaint.findById(id);
        res.status(200).json(details);
    } catch(error){
        res.status(500).json({error:error.message});
    }
};
//reply to complaint
const replyComplaint=async(req,res)=>{
    const { id } = req.params;
    const{reply}=req.body;
    try{
        const complaint=await Complaint.findById(id);
        complaint.reply.push(reply);
        await complaint.save();
        res.status(200).json(complaint);
    } catch(error){
        res.status(500).json({erorr:error.message})
    }

}
  

const updateComplaintState = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    // Validate the state value
    if (!['pending', 'resolved'].includes(state)) {
        return res.status(400).json({ message: "Invalid state value. Must be 'pending' or 'resolved'." });
    }

    try {
        // Find the complaint by ID
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Update the complaint's state
        complaint.state = state;
        await complaint.save();

        // Send a success response with updated complaint
        res.status(200).json({ message: 'Complaint status updated successfully', complaint });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ error: error.message });
    }
};

const getProductQuantityAndSales = async (req, res) => {
    const { productId } = req.params; // Assuming productId is passed as a route parameter
    try {
        // Fetch the product by ID and select only quantity and sales fields
        const product = await Product.findById(productId).select('quantity sales');
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product data retrieved successfully',
            product: {
                quantity: product.quantity,
                sales: product.sales
            }
        });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: 'Error fetching product data', error: error.message });
    }
};
const getAllProductsQuantityAndSales = async (req, res) => {
    try {
        // Fetch only the name, quantity, and sales fields of each product
        const products = await Product.find({}, "name quantity sales");
        // Check if products exist
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found.' });
        }
        // Send success response with product data
        res.status(200).json({ message: 'Product data retrieved successfully', products });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: 'Error fetching product data', error: error.message });
    }
};

// Archive/Unarchive a product by toggling the current archive state
const ArchiveUnarchiveProduct = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body; // Retain value in the request body but don't use it

    try {
        // Find the product to check the current archive value
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Toggle the archive value regardless of the provided value in req.body
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { archive: !product.archive }, // Toggle the archive field
            { new: true, runValidators: true } // Options: return the updated document, run validation
        );

        console.log("item archive state: ", updatedProduct.archive);

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sort complaints by date
const sortComplaintsByDate = async (req, res) => {
    const { order } = req.query; // Use 'asc' for ascending or 'desc' for descending

    try {
        // Sort complaints based on date, default to descending if not specified
        const sortOrder = order === 'asc' ? 1 : -1;
        const complaints = await Complaint.find().sort({ date: sortOrder });

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// // Filter complaints by status
// const filterComplaintsByStatus = async (req, res) => {
//     console.log("hi");
//     const { status } = req.query; // 'pending' or 'resolved'

//     try {
//         // Ensure the status provided is valid
//         if (!['pending', 'resolved'].includes(status)) {
//             return res.status(400).json({ message: "Invalid status value. Must be 'pending' or 'resolved'." });
//         }

//         // Find complaints by the given status
//         const complaints = await Complaint.find({ state: status });
//         if (complaints.length === 0) {
//             return res.status(404).json({ message: 'No complaints found with the specified status' });
//         }

//         res.status(200).json(complaints);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const filterComplaintsByStatus = async (req, res) => {
    // console.log("hi");
    const { status } = req.query; // 'pending' or 'resolved'

    try {
        // Ensure the status provided is valid
        if (!['pending', 'resolved'].includes(status)) {
            return res.status(400).json({ message: "Invalid status value. Must be 'pending' or 'resolved'." });
        }

        // Find complaints by the given status
        const complaints = await Complaint.find({ state: status });
        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No complaints found with the specified status' });
        }

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find();  // Fetch all itineraries
        res.status(200).json(itineraries);  // Return the array of itineraries
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllActivities = async (req, res) => {
    try {
        const itineraries = await Activity.find();  // Fetch all itineraries
        res.status(200).json(itineraries);  // Return the array of itineraries
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getUsernameById = async  (req, res) => {
    const {id} = req.params;
    try {
        const admin = await Admin.findById(id, 'username'); // Only fetches the username field
        res.status(200).json(admin);
        if (admin) {
            return admin.username;
        } else {
            throw new Error('Admin not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get notifications for an admin
const getNotifications = async (req, res) => {
    try {
      const { adminId } = req.params;
  
      // Fetch the admin
      const admin = await Admin.findById(adminId);
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Return the notifications
      res.status(200).json({ notifications: admin.notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  };
// Add a Promo Code
const createPromoCode = async (req, res) => {
    const { code, discount, startDate, endDate, isActive, description } = req.body;

    try {
        // Check if a promo code with the same code already exists
        const existingPromoCode = await PromoCode.findOne({ code });
        if (existingPromoCode) {
            return res.status(400).json({ message: 'Promo code already exists' });
        }

        // Validate start and end dates
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ message: 'Start date must be earlier than end date' });
        }

        // Create the promo code
        const promoCode = new PromoCode({
            code,
            discount,
            startDate,
            endDate,
            isActive,
            description,
        });

        // Save to the database
        await promoCode.save();

        res.status(201).json({ message: 'Promo code created successfully', promoCode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getSalesReport = async (req, res) => {
    try {
         // 1. Activities
         const activities = await Activity.find();
         const activityDetails = activities.map(activity => {
             // Calculate total sales (number of people) dynamically
             const sales = activity.touristIDs.reduce(
                 (sum, entry) => sum + entry.numberOfPeople,
                 0
             ); // Sum up numberOfPeople from touristIDs
 
             // Calculate total revenue from the paidPrice field
             const revenue = activity.touristIDs.reduce(
                 (sum, entry) => sum + entry.paidPrice,
                 0
             );
 
             return {
                 name: activity.name,
                 sales, // Total number of people who booked
                 revenue, // Total revenue from all bookings
                 appRevenue: revenue * 0.10, // 10% of total revenue
                 soldDate: activity.date.toISOString().split('T')[0], // Use the activity date directly
             };
         });
 
         const totalActivitySales = activityDetails.reduce((sum, activity) => sum + activity.sales, 0);
         const totalActivityRevenue = activityDetails.reduce((sum, activity) => sum + activity.revenue, 0);
         const totalActivityAppRevenue = activityDetails.reduce((sum, activity) => sum + activity.appRevenue, 0);
 
        

         // 2. Itineraries
         const itineraries = await Itinerary.find();
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
                 appRevenue: revenue * 0.10, // 10% of total revenue
                 soldDates, // Include only the sold dates
             };
         });
 
         const totalItinerarySales = itineraryDetails.reduce((sum, itinerary) => sum + itinerary.sales, 0);
         const totalItineraryRevenue = itineraryDetails.reduce((sum, itinerary) => sum + itinerary.revenue, 0);
         const totalItineraryAppRevenue = itineraryDetails.reduce((sum, itinerary) => sum + itinerary.appRevenue, 0);
 

        // 3. Products
        const products = await Product.find();

        // Map over the products to calculate sales and revenue dynamically
        const productDetails = products.map(product => {
            // Calculate the total quantity from the discountedPrices array
            const discountedQuantities = product.discountedPrices.reduce(
                (sum, entry) => sum + entry.quantity,
                0
            );

            // Calculate the total discounted revenue from the discountedPrices array
            const discountedRevenue = product.discountedPrices.reduce(
                (sum, entry) => sum + entry.totalDiscountedPrice,
                0
            );

            // Combine sales from the sales field and quantities from the discountedPrices array
            const totalSales = product.sales + discountedQuantities;

            // Combine revenue from sales (non-discounted) and discountedRevenue
            const revenue = product.sales * product.price + discountedRevenue;

            // Determine app revenue based on whether the seller ID is null
            const appRevenue = product.seller
            ? revenue * 0.10 // 10% of total revenue for seller-added products
            : revenue; // Full revenue for admin-added products

            return {
                name: product.name,
                sales: totalSales, // Total sales combining sales field and discounted quantities
                revenue, // Total revenue combining both non-discounted and discounted sales
                appRevenue, // 10% of total revenue
                sellingDates: product.sellingDates,
                
            };
        });

        // Calculate totals for products
        const totalProductSales = productDetails.reduce((sum, product) => sum + product.sales, 0);
        const totalProductRevenue = productDetails.reduce((sum, product) => sum + product.revenue, 0);
        const totalProductAppRevenue = productDetails.reduce((sum, product) => sum + product.appRevenue, 0);

       
        // 4. Grand Total
        const grandTotalSales = totalActivitySales + totalItinerarySales + totalProductSales;
        const grandTotalRevenue = totalActivityRevenue + totalItineraryRevenue + totalProductRevenue;
        const grandTotalAppRevenue = totalActivityAppRevenue + totalItineraryAppRevenue + totalProductAppRevenue ;

        // 5. Response
        res.status(200).json({
            success: true,
            data: {
                activities: {
                    details: activityDetails,
                    totalSales: totalActivitySales,
                    totalRevenue: totalActivityRevenue,
                    totalAppRevenue: totalActivityAppRevenue, // App revenue for activities
                },
                itineraries: {
                    details: itineraryDetails,
                    totalSales: totalItinerarySales,
                    totalRevenue: totalItineraryRevenue,
                    totalAppRevenue: totalItineraryAppRevenue, // App revenue for itineraries
                },
                products: {
                    details: productDetails,
                    totalSales: totalProductSales,
                    totalRevenue: totalProductRevenue,
                   
                },
                totals: {
                    totalSales: grandTotalSales,
                    totalRevenue: grandTotalRevenue,
                    totalAppRevenue: grandTotalAppRevenue, // Grand total app revenue
                },
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to generate sales report.', error: error.message });
    }
};

const getAllUsers = async (req, res) => {

    const { username } = req.query;

    try {
        let users = await LoginCredentials.find();
        //filter my username out
        users = users.filter(user => user.username !== username);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const searchForUserByUsername = async (req, res) => {
    const { username } = req.query;
    const {LoggedInUsername} = req.query;
  
    try {
      let users = await LoginCredentials.find({
        username: { $regex: username, $options: 'i' } // Case-insensitive partial match
      });
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

        //filter my username out
        users = users.filter(user => user.username !== LoggedInUsername);
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  const getUserStatistics = async (req, res) => {
    try {
        // Fetch the total number of users
        const totalUsers = await LoginCredentials.countDocuments();

        // Aggregate new users per month
        const newUsersByMonth = await LoginCredentials.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    newUsers: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }, // Sort by date ascending
        ]);

        // Format the response
        res.status(200).json({
            totalUsers,
            newUsersByMonth,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategoryNames = async (req, res) => {
    try {
      // Fetch only the 'name' field from the database
      const categories = await ActivityCategory.find({}, "name");
  
      // Extract names into an array of strings
      const categoryNames = categories.map((category) => category.name);
  
      // Return the array of names
      res.status(200).json(categoryNames);
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
  };

  

module.exports = {
    approvePendingUserById, // done in frontEnd
    deleteAccount, // done in frontEnd
    addTourismGovernor, // done in frontEnd
    createCategory, // done in frontEnd
    getCategories, // done in frontEnd
   ////////// will remove these///////////
    addTag, // done in frontEnd
    getTags, // done in frontEnd
    updateTag, // done in frontEnd
    deleteTag, // done in frontEnd
    ////////////////
    addProductAsAdmin, // done in frontEnd
    editProduct, // done in frontEnd
    updateCategory, // done in frontEnd
    deleteCategory, // done in frontEnd
    getCategory, // done in frontEnd
    addAdmin, // done in frontEnd
    sortProductsByRatings, // done in frontEnd
    getAllProducts, // done in frontEnd
    filterProduct, // done in frontEnd
    searchProductsByName, // done in frontEnd
    getPendingUsers, // done in frontEnd
    deletePendingUserById, // done in frontEnd
    getAttractions, // done in frontEnd
    getProductImage,
    flagActivity,
    flagItinerary,
    flagPlace,
    createPreferenceTag,
    getAllPreferenceTags,
    updatePreferenceTag,
    deletePreferenceTag,
    changePassword,
    viewPendingUserID,
    downloadPendingUserID,
    viewPendingUserCertificate,
    downloadPendingUserCertificate,
    changeProductImage,
    downloadProductImage,
    getAllComplaints,
    updateComplaintState,
    getProductQuantityAndSales,
    getAllProductsQuantityAndSales,
    getDetailsOfComplaint,
    replyComplaint,
    ArchiveUnarchiveProduct,
    sortComplaintsByDate,
    filterComplaintsByStatus,
    getAllItineraries,
    getAllActivities,
    getUsernameById,
    getNotifications,
    createPromoCode,
    getSalesReport,
    getAllUsers,
    searchForUserByUsername,
    getUserStatistics,
    getCategoryNames
};

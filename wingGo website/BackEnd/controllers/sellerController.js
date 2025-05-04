const bcrypt = require('bcrypt');
const Seller = require('../models/Seller');
const LoginCredentials = require('../models/LoginCredentials'); 
const Product = require('../models/product');
const { uploadDocument } = require('../helpers/s3Helper');
const { default: mongoose } = require('mongoose');
const {generatePreSignedUrl}  = require('../downloadMiddleware');
const {previewgeneratePreSignedUrl}  = require('../downloadMiddleware');


const seller_hello = (req, res) => {
    console.log('Seller route hit!'); // Add this log
    res.send('<h1>yayy Seller</h1>');
};

const updateSellerProfile = async (req, res) => {
    console.log(req.body);
    try {
        const id = req.params.id; // Use id as the unique identifier
        const sellerExist = await Seller.findById(id);
        

        if (!sellerExist) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Create a copy of the request body
        const updateData = { ...req.body };

        // If the password is being updated, hash it before saving
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        // Update the seller's profile with the hashed password and other updated fields
        const updatedSeller = await Seller.findByIdAndUpdate(id, updateData, {
            new: true,  // Return the updated document
        });
        const loginUpdateFields = {};
        if (req.body.username && req.body.username !== sellerExist.username) {
            const existingUsername = await LoginCredentials.findOne({ username: req.body.username });

            if (existingUsername) {
                return res.status(400).json({ message: 'Username is already taken' });
            }

            loginUpdateFields.username = req.body.username;  // Username update
        }

        if(req.body.email && req.body.email !== sellerExist.email){
            const existingEmail = await LoginCredentials.findOne
            ({ email: req.body.email });

            if (existingEmail) {
                return res.status(400).json({ message: 'Email is already taken' });

            }
            loginUpdateFields.email = req.body.email;  // Email update
        }
        

        if (req.body.password) {
            loginUpdateFields.password =  updateData.password;  // Use the hashed password
        }
        console.log("login update: ",loginUpdateFields);

        if (Object.keys(loginUpdateFields).length > 0) {
            console.log('login fields>0');
            // Find login credentials by tour guide id (assuming id is stored in both TourGuide and LoginCredentials models)
            // const updatedLoginCredentials = await LoginCredentials.findByIdAndUpdate(
            //     id, // Match by id
            //     { $set: loginUpdateFields },
            //     { new: true }  // Return the updated document
            // );

            const updatedLoginCredentials = await LoginCredentials.findOneAndUpdate(
                { userId: sellerExist._id },  // Find by userId
                { $set: loginUpdateFields },   // Update fields
                { new: true }                  // Return the updated document
            );
                      
            //////

            if (!updatedLoginCredentials) {
                return res.status(404).json({ message: 'Login credentials not found' });
            }
        }

        res.status(200).json({message:'Profile and login credentials updated successfully',updatedSeller});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





const getSeller = async(req,res) => {
    try{
       
        const id = req.params.id; // Use id as the unique identifier
        const sellerExist = await Seller.findById(id);
        if (!sellerExist) {
            return res.status(404).json({ message: 'Seller not found' });
        }
       res.status(200).json(sellerExist)
    }catch(error){
       res.status(400).json({error:error.message})
    }
 }

 const sortProductsByRatings = async (req, res) => {
    try {
        const products = await Product.find().sort({ ratings: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const createSellerProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const seller = await Seller.findById(id);

        if (seller.isCreatedProfile !== 0) {
            return res.status(400).json({ message: 'Profile already created for this seller.' });
        } else {
            seller.isCreatedProfile = 1;
            await seller.save(); // Save the isCreatedProfile update
            
            // Instead of calling updateSellerProfile with res, return the updated seller profile here
            const updateData = { ...req.body };
            if (req.body.password) {
                updateData.password = await bcrypt.hash(req.body.password, 10);
            }
            
            // Update seller details
            const updatedSeller = await Seller.findByIdAndUpdate(id, updateData, {
                new: true, // Return the updated document
            });

            // Send a success response after updating everything
            return res.status(201).json({
                message: 'Seller profile created and updated successfully',
                updatedSeller
            });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error creating seller profile: ' + err.message });
    }
};







// Function to add a product
const addProduct = async (req, res) => {
    const { name, price, quantity, description, sellerId } = req.body;

    
    console.log('Received request to add product:', req.body);
    
    // Check if an image was uploaded, otherwise set picture to null
    const picture = req.file ? req.file.location : null;

    try {
        // Check if the seller exists
        const sellerExist = await Seller.findById(sellerId);
        if (!sellerExist) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        if(!sellerExist.termsAccepted){
            return res.status(403).json({error: 'Terms and conditions must be accepted to create a product.' });
        }

        // Create a new product, conditionally including the image if available
        const newProduct = new Product({
            name,
            price,
            quantity,
            description,
            seller: sellerId,
            picture:picture // Only include picture if it was uploaded
        });

        // Save the product to the database
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'username');

        const productData = products.map(product => ({
            name: product.name,
            picture: product.picture ? `/images/${product.picture}` : null,  // Correct path to the image
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            seller: product.seller ? product.seller.username : 'Admin',
            ratings: product.ratings,
            reviews: product.reviews
        }));

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getSellerById = async (req, res) => {
    const { id } = req.params;
    try {
      const seller = await Seller.findById(id);
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
      res.status(200).json(seller);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching seller data', error });
    }
  };

const getProductImage = async (req, res) => {
    const productId = req.params.id;
    
    try {
        // Find the product by its ID
        const product = await Product.findById(productId);
        
        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If the product has an image
        if (product.picture) {
            const key = product.picture.split('/').slice(-1)[0];
        
            const preSignedUrl = await previewgeneratePreSignedUrl(key);

            return res.redirect( preSignedUrl );

        } else {
            // If no image is found, return a placeholder or 404
            return res.status(404).json({ message: 'Image not found for this product.' });
        }
    } catch (error) {
        // Handle any errors
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
    
    
};


// Function to edit a product
const editProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, price, quantity, description, sellerId } = req.body;

    // Check if an image was uploaded, otherwise leave the existing one
    const picture = req.file ? req.file.location : null;

    console.log('Received request to edit product with ID:', productId);
    console.log('Request body:', req.body);

    try {
        // Check if the seller exists
        const sellerExist = await Seller.findById(sellerId);
        if (!sellerExist) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Check if the product exists and belongs to the seller
        const product = await Product.findOne({ _id: productId, seller: sellerId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found or you do not have permission to edit this product' });
        }

        // Update product details conditionally, only updating fields provided in the request
        if (name) product.name = name;
        if (price) product.price = price;
        if (quantity) product.quantity = quantity;
        if (description) product.description = description;
        if (picture) product.picture = picture; // Update the image only if a new one is uploaded

        // Save the updated product to the database
        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const filterProduct = async (req, res) => {
    try {
        const { budget } = req.query;
        const { sellerId } = req.params;  // Extract sellerId from route parameters

        // Initialize an empty filter
        let filter = {
            $or: [
                { archive: false }, // Include non-archived products
                { seller: sellerId } // Include archived products only if they belong to the specified seller
            ]
        };

        // Apply budget filter if provided
        if (budget) {
            filter.price = { $lte: parseFloat(budget) }; // Price less than or equal to the specified budget
        }

        // Fetch products based on the constructed filter
        const result = await Product.find(filter);

        console.log("Filtered Products: ", result);
        
        // Return the filtered results
        res.status(200).json(result);
    } catch (error) {
        // Handle errors and return a 500 status with the error message
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
        const products = await Product.find({ name: { $regex: query, $options: 'i' } });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching your search." });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const changeLogo = async (req, res) => {
    const { id } = req.params;
    

    try {
        const seller = await Seller.findById(id);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const logo = req.file.location;
        seller.logo = logo;
        await seller.save();
        res.status(200).json({ message: 'Logo updated successfully', seller });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const acceptTerms = async (req, res) => {
    const sellerId = req.params.id;

    try {
        const seller = await Seller.findByIdAndUpdate(sellerId, { termsAccepted: true }, { new: true });
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found.' });
        }
        res.status(200).json({ message: 'Terms accepted successfully.', seller });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting terms.', error });
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
        const seller = await Seller.findById(userCredentials.userId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        console.log('Old Password (entered):', oldPassword);
        const hashedoldPassword = await bcrypt.hash(oldPassword, 10); // Hash new password
        console.log('Old Password (hashed):', hashedoldPassword);
        console.log('Stored Hashed Password:', seller.password);

        // 3. Compare the old password with the hashed password in TourGuide
        const isMatch = await bcrypt.compare(oldPassword, seller.password);
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
        seller.password = hashedNewPassword;
        await seller.save();

        res.status(200).json({ message: 'Password updated successfully in both collections' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const requestAccountDeletion = async (req, res) => {
    try {
        const { id } = req.params;  // Advertiser ID

        // Find all activities related to this advertiser
    
        // Delete the advertiser profile and related login credentials
        const seller = await Seller.findByIdAndDelete(id);
        await LoginCredentials.findOneAndDelete({ userId: id, roleModel: 'Seller' });

        if (!seller) {
            return res.status(404).json({ message: "Seller account not found." });
        }

        res.status(200).json({ message: "Account and all associated data deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSellerAccount = async (req, res) => {
    const { id } = req.params; // Seller ID
    console.log("in delete ");

    try {
        // Find the seller account
        const sellerAccount = await Seller.findById(id);
        if (!sellerAccount) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        console.log("before");


        // Delete all products associated with this seller
        await Product.deleteMany({ seller: id });

        // Delete the seller account
        await Seller.findByIdAndDelete(id);
        console.log("after");

        // Delete the seller's login credentials
        await LoginCredentials.findOneAndDelete({ userId: id, roleModel: 'Seller' });

        res.status(200).json({ message: 'Seller account and login credentials deleted successfully' });
    } catch (error) {
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


const ArchiveUnarchiveProduct = async (req, res) => {
    const { id } = req.params;
    const { sellerId, value } = req.body; // Retain sellerId and value in the request body, but ignore value for toggling

    try {
        // Fetch the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the seller ID matches
        if (product.seller.toString() !== sellerId) {
            return res.status(403).json({ message: "You're not allowed to archive/unarchive this product" });
        }

        // Toggle the archive status, ignoring the provided value
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { archive: !product.archive }, // Toggle the archive field
            { new: true, runValidators: true } // Return the updated document, run validation
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const previewLogo = async (req, res) => {
    const { id } = req.params;
    try {
        const seller = await Seller.findById(id);
        
        if (!seller) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }

        if (seller.logo) {
            const key = seller.logo.split('/').slice(-1)[0];
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



const getNotifications = async (req, res) => {
  try {
    // Extract seller ID from the route parameter
    const { userId } = req.params;

    // Find the seller by ID
    const seller = await Seller.findById(userId).select('notifications');

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Return the notifications
    res.status(200).json({ notifications: seller.notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

const getSalesReport = async (req, res) => {
    const { sellerId } = req.params; // Extract Seller ID from URL parameters

    try {
        // Fetch products associated with the seller
        const products = await Product.find({ seller: sellerId });

        // Map over products to calculate sales and revenue dynamically
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

            // Combine revenue from sales (non-discounted) and discounted revenue
            const revenue = product.sales * product.price + discountedRevenue;

            return {
                name: product.name,
                sales: totalSales, // Total sales combining sales field and discounted quantities
                revenue, // Total revenue combining both non-discounted and discounted sales
                sellingDates: product.sellingDates, // Include sellingDates directly
            };
        });

        // Calculate totals for the seller's products
        const totalProductSales = productDetails.reduce((sum, product) => sum + product.sales, 0);
        const totalProductRevenue = productDetails.reduce((sum, product) => sum + product.revenue, 0);

        // 2. Net Total Revenue
        const netTotalRevenue = totalProductRevenue - (totalProductRevenue * 0.10);

        // Response
        res.status(200).json({
            success: true,
            data: {
                products: {
                    details: productDetails,
                    totalSales: totalProductSales,
                    totalRevenue: netTotalRevenue,
                },
                totals: {
                    totalSales: totalProductSales,
                    totalRevenue: netTotalRevenue,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate sales report for seller.',
            error: error.message,
        });
    }
};



 module.exports = {
    updateSellerProfile,
    createSellerProfile,
    updateSellerProfile,
    getSeller,
    addProduct,
    editProduct,
    sortProductsByRatings,
    getAllProducts,
    filterProduct,
    searchProductsByName,
    getProductImage,
    changeLogo,
    acceptTerms,
    changePassword,
    downloadProductImage,
    deleteSellerAccount,
    seller_hello,
    requestAccountDeletion,
    getProductQuantityAndSales,
    getAllProductsQuantityAndSales,
    ArchiveUnarchiveProduct,
    getSellerById,
    previewLogo,
    getNotifications,
    getSalesReport
};
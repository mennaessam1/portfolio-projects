const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema with refPath for dynamic referencing
const loginCredentialsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['tour guide', 'tourist', 'seller', 'advertiser', 'admin', 'tourism governor'], // Include 'admin' in the roles
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        refPath: 'roleModel',  // Dynamically reference the correct model based on role
        required: true  // Ensure userId is required for all roles, including admin
    },
    roleModel: {
        type: String,
        required: true, // Ensure roleModel is required for all roles, including admin
        enum: ['TourGuide', 'Tourist', 'Seller', 'Advertiser', 'TourismGovernor', 'Admin'], // Ensure these match your model names
        default: function () {
            return {
                'tour guide': 'TourGuide',
                'tourist': 'Tourist',
                'seller': 'Seller',
                'advertiser': 'Advertiser',
                'tourism governor': 'TourismGovernor',
                'admin': 'Admin'
            }[this.role];  // Dynamically set the role model based on the role
        }
    },
    mustChangePassword: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const LoginCredentials = mongoose.model('LoginCredentials', loginCredentialsSchema);

module.exports = LoginCredentials;

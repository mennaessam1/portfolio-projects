const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const tourismGovSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true  // Add unique constraint to username
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

// Define the model
const TourismGovernor = mongoose.model('TourismGovernor', tourismGovSchema);

// Export the model, not the schema
module.exports = TourismGovernor;

const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const touristSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    IDdocument: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true
    },

    
}, {timestamps: true});


const PendingUser = mongoose.model('PendingUser', touristSchema);

//export module so tahy you can use it somewhere else in the proj
module.exports= PendingUser;